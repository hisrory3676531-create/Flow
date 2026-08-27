import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());

// Хранилище комнат и таймеров
const rooms = new Map();
const disconnectTimeouts = new Map();

const getPublicRooms = () => {
  const list = [];
  for (const [id, r] of rooms.entries()) {
    list.push({
      roomId: id,
      name: r.name,
      hostName: r.hostName,
      playersCount: r.players ? r.players.length : 0,
      maxPlayers: r.maxPlayers || 4,
      autoPayday: r.autoPayday ?? true,
      gameStarted: r.gameStarted || false
    });
  }
  return list;
};

app.get('/', (req, res) => {
  res.json({ status: 'online', service: 'Cashflow Multiplayer Backend', activeRooms: rooms.size });
});

app.get('/api/rooms', (req, res) => {
  res.json(getPublicRooms());
});

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS']
  },
  transports: ['polling', 'websocket'],
  allowEIO3: true
});

const advanceTurn = (room) => {
  if (!room || !room.players || room.players.length === 0) return;
  room.activeCardData = null;
  room.currentTurnIndex = (room.currentTurnIndex + 1) % room.players.length;
  room.players.forEach((p, idx) => {
    p.isCurrentTurn = idx === room.currentTurnIndex;
  });
  const nextPlayer = room.players[room.currentTurnIndex];
  room.logs.unshift(`⏳ Ход перешел к: ${nextPlayer.name}`);
  io.to(room.roomId).emit('sync_game_state', room);
};

io.on('connection', (socket) => {
  socket.emit('rooms_list', getPublicRooms());

  socket.on('get_rooms', () => {
    socket.emit('rooms_list', getPublicRooms());
  });

  // Запрос актуального состояния конкретного лобби (устраняет бесконечную загрузку)
  socket.on('get_room_lobby_state', ({ roomId }) => {
    const room = rooms.get(roomId);
    if (room) {
      socket.join(roomId);
      socket.emit('sync_room_lobby', room);
    } else {
      socket.emit('error_message', 'Комната не найдена');
    }
  });

  socket.on('reconnect_session', ({ roomId, userId }) => {
    const room = rooms.get(roomId);
    if (!room) {
      socket.emit('session_restore_failed');
      return;
    }

    const player = room.players.find((p) => p.userId === userId);
    if (!player) {
      socket.emit('session_restore_failed');
      return;
    }

    if (disconnectTimeouts.has(userId)) {
      clearTimeout(disconnectTimeouts.get(userId));
      disconnectTimeouts.delete(userId);
    }

    socket.join(roomId);
    player.socketId = socket.id;
    player.isDisconnected = false;

    room.logs.unshift(`🔄 ${player.name} вернулся в игру!`);

    socket.emit('session_restored', {
      roomData: room,
      gameStarted: room.gameStarted,
      player
    });

    io.to(roomId).emit('sync_game_state', room);
    io.to(roomId).emit('sync_room_lobby', room);
  });

  socket.on('create_room', ({ roomId, roomName, hostPlayer, maxPlayers, autoPayday }) => {
    socket.join(roomId);

    rooms.set(roomId, {
      roomId,
      name: roomName || `Комната #${roomId}`,
      hostId: hostPlayer.userId,
      hostName: hostPlayer.name,
      maxPlayers: Number(maxPlayers) || 4,
      autoPayday: autoPayday ?? true,
      gameStarted: false,
      currentTurnIndex: 0,
      activeCardData: null,
      pendingDealTrade: null,
      players: [{
        ...hostPlayer,
        socketId: socket.id,
        boardPosition: 0,
        isHost: true,
        isReady: false,
        isDisconnected: false
      }],
      logs: [`[Лобби] Создана комната «${roomName || roomId}»`]
    });

    io.emit('rooms_list', getPublicRooms());
    io.to(roomId).emit('sync_room_lobby', rooms.get(roomId));
  });

  socket.on('join_room', ({ roomId, playerProfile }) => {
    const room = rooms.get(roomId);
    if (!room) {
      socket.emit('error_message', 'Комната не найдена');
      return;
    }

    const existingIdx = room.players.findIndex((p) => p.userId === playerProfile.userId);

    if (existingIdx !== -1) {
      if (disconnectTimeouts.has(playerProfile.userId)) {
        clearTimeout(disconnectTimeouts.get(playerProfile.userId));
        disconnectTimeouts.delete(playerProfile.userId);
      }
      room.players[existingIdx].socketId = socket.id;
      room.players[existingIdx].isDisconnected = false;
      socket.join(roomId);
    } else {
      if (room.players.length >= room.maxPlayers) {
        socket.emit('error_message', 'В комнате нет свободных мест');
        return;
      }
      socket.join(roomId);
      room.players.push({
        ...playerProfile,
        socketId: socket.id,
        boardPosition: 0,
        isHost: false,
        isReady: false,
        isDisconnected: false
      });
      room.logs.unshift(`👋 ${playerProfile.name} присоединился к комнате.`);
    }

    io.emit('rooms_list', getPublicRooms());
    io.to(roomId).emit('sync_room_lobby', room);
    io.to(roomId).emit('sync_game_state', room);
  });

  socket.on('player_close_card', ({ roomId, autoEndTurn }) => {
    const room = rooms.get(roomId);
    if (!room) return;
    room.activeCardData = null;

    if (autoEndTurn) {
      advanceTurn(room);
    } else {
      io.to(roomId).emit('sync_game_state', room);
    }
  });

  socket.on('player_end_turn', ({ roomId }) => {
    const room = rooms.get(roomId);
    if (!room) return;
    advanceTurn(room);
  });

  socket.on('select_color', ({ roomId, userId, color }) => {
    const room = rooms.get(roomId);
    if (!room) return;

    const isColorTaken = room.players.some((p) => p.userId !== userId && p.color?.id === color.id);
    if (isColorTaken) {
      socket.emit('error_message', 'Этот цвет уже занят другим игроком!');
      return;
    }

    const player = room.players.find((p) => p.userId === userId);
    if (player) {
      player.color = color;
    }

    io.to(roomId).emit('sync_room_lobby', room);
  });

  socket.on('select_profession', ({ roomId, userId, profession }) => {
    const room = rooms.get(roomId);
    if (!room) return;

    const isProfTaken = room.players.some((p) => p.userId !== userId && p.profession?.id === profession.id);
    if (isProfTaken) {
      socket.emit('error_message', 'Эта профессия уже выбрана другим игроком!');
      return;
    }

    const player = room.players.find((p) => p.userId === userId);
    if (player) {
      player.profession = profession;
      player.cash = profession.savings;
      player.financials = {
        salary: profession.salary,
        passiveIncome: 0,
        totalIncome: profession.salary,
        taxes: profession.taxes,
        homeMortgagePayment: profession.homeMortgagePayment,
        carLoanPayment: profession.carLoanPayment,
        creditCardPayment: profession.creditCardPayment,
        otherExpenses: profession.otherExpenses,
        childExpensePerCount: profession.childExpensePerCount,
        childCount: 0,
        bankLoanPayment: 0,
        totalExpenses:
          profession.taxes +
          profession.homeMortgagePayment +
          profession.carLoanPayment +
          profession.creditCardPayment +
          profession.otherExpenses,
        monthlyCashflow:
          profession.salary -
          (profession.taxes +
            profession.homeMortgagePayment +
            profession.carLoanPayment +
            profession.creditCardPayment +
            profession.otherExpenses)
      };
      player.isReady = true;
    }

    io.to(roomId).emit('sync_room_lobby', room);
  });

  socket.on('start_game', ({ roomId }) => {
    const room = rooms.get(roomId);
    if (!room) return;

    room.gameStarted = true;
    room.currentTurnIndex = 0;
    room.players.forEach((p, idx) => {
      p.isCurrentTurn = idx === 0;
    });

    room.logs.unshift(`🚀 Партия началась! Первым ходит: ${room.players[0].name}`);

    io.emit('rooms_list', getPublicRooms());
    io.to(roomId).emit('game_started', room);
  });

 socket.on('player_roll_dice', ({ roomId, diceValue, newPosition, fastTrackPosition, currentTrack, paydayAmount, currentTile, cardData }) => {
    const room = rooms.get(roomId);
    if (!room) return;

    const player = room.players[room.currentTurnIndex];
    if (player) {
      const finalPos = typeof newPosition === 'number'
        ? newPosition
        : (typeof fastTrackPosition === 'number' ? fastTrackPosition : ((Number(player.boardPosition) || 0) + Number(diceValue)) % 24);

      player.boardPosition = finalPos;
      player.position = finalPos;

      // Если игрок на Fast Track — синхронизируем fastTrackPosition
      if (player.currentTrack === 'FAST_TRACK' || currentTrack === 'FAST_TRACK') {
        player.currentTrack = 'FAST_TRACK';
        player.isOnFastTrack = true;
        player.fastTrackPosition = finalPos;
      }

      if (paydayAmount > 0) {
        player.cash = (player.cash || 0) + paydayAmount;
        room.logs.unshift(`💰 ${player.name}: Получен чек Payday (+${paydayAmount.toLocaleString()}$)`);
      }
      
      room.logs.unshift(`🎲 ${player.name} выбросил ${diceValue} ➔ «${currentTile?.title || 'Клетка'}» (#${finalPos})`);
    }

    room.activeCardData = cardData ? { ...cardData, ownerName: player?.name, ownerId: player?.id } : null;
    io.to(roomId).emit('sync_game_state', room);
  });

  socket.on('broadcast_active_card', ({ roomId, cardData }) => {
    const room = rooms.get(roomId);
    if (!room) return;

    const player = room.players[room.currentTurnIndex];
    room.activeCardData = cardData ? { ...cardData, ownerName: player?.name, ownerId: player?.id } : null;
    io.to(roomId).emit('sync_game_state', room);
  });

  socket.on('propose_deal_to_player', ({ roomId, fromPlayer, toUserId, deal, fee }) => {
    const room = rooms.get(roomId);
    if (!room) return;

    room.pendingDealTrade = {
      fromUserId: fromPlayer.userId,
      fromName: fromPlayer.name,
      toUserId,
      deal,
      fee: Number(fee)
    };

    room.logs.unshift(`🤝 ${fromPlayer.name} предложил переуступить «${deal.title}» за ${fee}$`);
    io.to(roomId).emit('sync_game_state', room);
    io.to(roomId).emit('deal_trade_offered', room.pendingDealTrade);
  });

  socket.on('respond_deal_trade', ({ roomId, accepted, tradeOffer }) => {
    const room = rooms.get(roomId);
    if (!room) return;

    const seller = room.players.find((p) => p.userId === tradeOffer.fromUserId);
    const buyer = room.players.find((p) => p.userId === tradeOffer.toUserId);

    if (accepted && seller && buyer) {
      const deal = tradeOffer.deal;
      const fee = tradeOffer.fee;
      const downPayment = deal.downPayment || deal.cost;
      const totalCost = downPayment + fee;

      if (buyer.cash >= totalCost) {
        buyer.cash -= totalCost;
        seller.cash += fee;

        const newAsset = {
          id: 'ast_' + Date.now(),
          title: deal.title,
          type: deal.type,
          cost: deal.cost,
          cashflow: deal.cashflow,
          downPayment: downPayment,
          mortgage: deal.mortgage
        };

        buyer.assets = [...(buyer.assets || []), newAsset];
        buyer.financials.passiveIncome += deal.cashflow;
        buyer.financials.totalIncome += deal.cashflow;
        buyer.financials.monthlyCashflow += deal.cashflow;

        room.logs.unshift(`✅ ${buyer.name} купил сделку «${deal.title}» у ${seller.name} (+${deal.cashflow}$/мес к Payday)`);
      } else {
        room.logs.unshift(`⚠️ У ${buyer.name} не хватило денег для завершения сделки.`);
      }
    } else if (!accepted && seller && buyer) {
      room.logs.unshift(`❌ ${buyer.name} отклонил покупку карточки «${tradeOffer.deal.title}»`);
    }

    room.pendingDealTrade = null;
    room.activeCardData = null;

    io.to(roomId).emit('sync_game_state', room);
    io.to(roomId).emit('deal_trade_closed', { accepted });
  });

  socket.on('player_update_financials', ({ roomId, updatedPlayer, logMessage }) => {
    const room = rooms.get(roomId);
    if (!room) return;

    const idx = room.players.findIndex((p) => p.userId === updatedPlayer.userId);
    if (idx !== -1) {
      room.players[idx] = { ...room.players[idx], ...updatedPlayer };
    }

    if (logMessage) {
      room.logs.unshift(logMessage);
    }

    room.activeCardData = null;
    io.to(roomId).emit('sync_game_state', room);
  });

  socket.on('disconnect', () => {
    for (const [roomId, room] of rooms.entries()) {
      const disconnectedPlayer = room.players.find((p) => p.socketId === socket.id);
      if (disconnectedPlayer) {
        disconnectedPlayer.isDisconnected = true;
        room.logs.unshift(`⚠️ ${disconnectedPlayer.name} потерял связь. Ожидание 120 сек...`);
        io.to(roomId).emit('sync_game_state', room);

        const timeoutId = setTimeout(() => {
          const currentRoom = rooms.get(roomId);
          if (currentRoom) {
            currentRoom.players = currentRoom.players.filter((p) => p.userId !== disconnectedPlayer.userId);
            currentRoom.logs.unshift(`🚪 ${disconnectedPlayer.name} исключен из-за таймаута.`);

            if (currentRoom.players.length === 0) {
              rooms.delete(roomId);
            } else {
              io.to(roomId).emit('sync_game_state', currentRoom);
              io.to(roomId).emit('sync_room_lobby', currentRoom);
            }
            io.emit('rooms_list', getPublicRooms());
          }
          disconnectTimeouts.delete(disconnectedPlayer.userId);
        }, 120 * 1000);

        disconnectTimeouts.set(disconnectedPlayer.userId, timeoutId);
        break;
      }
    }
  });
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Cashflow Server запущен на порту ${PORT}`);
});