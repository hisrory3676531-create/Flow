import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import type { Player, Asset, GameSettings } from '../types/game.types';
import type { RatColor } from './ProfileSetupScreen';
import { GameBoard, type BoardPlayer } from './GameBoard';
import { FinancialStatementPanel } from './FinancialStatementPanel';
import { BOARD_TILES } from '../data/board.data';
import { FAST_TRACK_TILES, FastTrackTile } from '../data/fastTrack.data';
import { DealModal } from './DealModal';
import { DoodadModal } from './DoodadModal';
import { MarketModal } from './MarketModal';
import { CharityModal } from './CharityModal';
import { DownturnModal } from './DownturnModal';
import { BankModal } from './BankModal';
import { VictoryModal } from './VictoryModal';
import { BabyModal } from './BabyModal';
import { BankruptcyModal } from './BankruptcyModal';
import { SpectatorCardModal } from './SpectatorCardModal';
import { FastTrackTransitionModal } from './FastTrackTransitionModal';
import { FastTrackDealModal } from './FastTrackDealModal';
import { FastTrackEventModal } from './FastTrackEventModal';
import { DealCard, DoodadCard, MarketCard, DOODADS, MARKET_CARDS } from '../data/cards.data';
import { socket } from '../services/socket';
import { soundManager } from '../services/sound.service';
import { DealTradeIncomingModal } from './DealTradeIncomingModal';
import { TurnNotification } from './TurnNotification';

interface GameScreenProps {
  player: Player;
  playerColor: RatColor;
  settings: GameSettings;
  onRestart: () => void;
}

const TURN_DURATION_SECONDS = 60;

export const GameScreen: FC<GameScreenProps> = ({
  player: initialPlayer,
  playerColor,
  settings,
  onRestart
}) => {
  const roomId = settings?.roomId || 'GAME-77';

  const [player, setPlayer] = useState<Player>({
    ...initialPlayer,
    currentTrack: initialPlayer.currentTrack || 'RAT_RACE',
    fastTrackPosition: initialPlayer.fastTrackPosition ?? 0,
    fastTrackCashflow: initialPlayer.fastTrackCashflow ?? 0,
    fastTrackInitialCashflow: initialPlayer.fastTrackInitialCashflow ?? 0
  });

  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [hasRolledThisTurn, setHasRolledThisTurn] = useState<boolean>(false);
  const [pendingPayday, setPendingPayday] = useState<number>(0);
  const [charityTurnsLeft, setCharityTurnsLeft] = useState<number>(0);
  const [skipTurnsLeft, setSkipTurnsLeft] = useState<number>(0);
  const [incomingTradeOffer, setIncomingTradeOffer] = useState<any>(null);
  const [tradeWaitingMessage, setTradeWaitingMessage] = useState<string>('');
  const [isMarketDismissed, setIsMarketDismissed] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getMutedState());

  const [timeLeft, setTimeLeft] = useState<number>(TURN_DURATION_SECONDS);

  const [roomPlayers, setRoomPlayers] = useState<BoardPlayer[]>([
    {
      id: initialPlayer.id,
      name: initialPlayer.name,
      position: initialPlayer.boardPosition ?? 0,
      color: playerColor,
      isCurrentTurn: true,
      isOnFastTrack: initialPlayer.currentTrack === 'FAST_TRACK',
      fastTrackPosition: initialPlayer.fastTrackPosition ?? 0
    }
  ]);

  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const [networkActiveCard, setNetworkActiveCard] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([
    `[Сессия] Комната #${roomId}`,
    `[Режим ЗП] ${settings?.autoPayday ? 'Автоматическое начисление' : 'Ручное получение (кнопка)'}`
  ]);

  // Модальные окна Малого круга
  const [activeDealModal, setActiveDealModal] = useState<boolean>(false);
  const [activeDoodadCard, setActiveDoodadCard] = useState<DoodadCard | null>(null);
  const [activeMarketCard, setActiveMarketCard] = useState<MarketCard | null>(null);
  const [showCharityModal, setShowCharityModal] = useState<boolean>(false);
  const [showDownturnModal, setShowDownturnModal] = useState<boolean>(false);
  const [showBankModal, setShowBankModal] = useState<boolean>(false);
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);
  const [showBabyModal, setShowBabyModal] = useState<boolean>(false);

  // Модальные окна Fast Track
  const [showFastTrackTransition, setShowFastTrackTransition] = useState<boolean>(false);
  const [activeFastTrackDeal, setActiveFastTrackDeal] = useState<FastTrackTile | null>(null);
  const [activeFastTrackEvent, setActiveFastTrackEvent] = useState<FastTrackTile | null>(null);

  const activeCurrentPlayer = roomPlayers[currentTurnIndex] || roomPlayers[0];
  const isMyTurn = activeCurrentPlayer?.id === player.id;
  const isOnFastTrack = player.currentTrack === 'FAST_TRACK';

  const addLog = (msg: string) => {
    setLogs((prev) => [msg, ...prev]);
  };

  const handleToggleMute = () => {
    const nextMute = soundManager.toggleMute();
    setIsMuted(nextMute);
  };

  const finishTurnAction = () => {
    setActiveDealModal(false);
    setActiveDoodadCard(null);
    setActiveMarketCard(null);
    setShowCharityModal(false);
    setShowDownturnModal(false);
    setShowBabyModal(false);
    setActiveFastTrackDeal(null);
    setActiveFastTrackEvent(null);
    setHasRolledThisTurn(false);
    setDiceValue(null);
    setPendingPayday(0);

    socket.emit('player_close_card', { roomId, autoEndTurn: true });
  };

  const finishTurnActionRef = useRef(finishTurnAction);
  finishTurnActionRef.current = finishTurnAction;

  useEffect(() => {
    if (isMyTurn) {
      soundManager.playYourTurn();
    }
  }, [currentTurnIndex, isMyTurn]);

  // Таймер хода: не сбрасывает карточки, пока игрок принимает решение
  useEffect(() => {
    setTimeLeft(TURN_DURATION_SECONDS);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const hasActiveModal = activeDealModal || activeMarketCard || activeDoodadCard || activeFastTrackDeal || activeFastTrackEvent;
          if (isMyTurn && !hasActiveModal) {
            addLog(`⏱️ Время на ход истекло. Ход передан.`);
            finishTurnActionRef.current();
          }
          return TURN_DURATION_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTurnIndex, isMyTurn, activeDealModal, activeMarketCard, activeDoodadCard, activeFastTrackDeal, activeFastTrackEvent]);

  useEffect(() => {
    socket.emit('join_room', {
      roomId,
      playerProfile: {
        id: player.id,
        userId: player.userId,
        name: player.name,
        color: playerColor,
        boardPosition: player.boardPosition ?? 0,
        currentTrack: player.currentTrack,
        fastTrackPosition: player.fastTrackPosition ?? 0,
        fastTrackCashflow: player.fastTrackCashflow ?? 0,
        fastTrackInitialCashflow: player.fastTrackInitialCashflow ?? 0,
        cash: player.cash,
        financials: player.financials,
        assets: player.assets,
        profession: player.profession,
        dream: player.dream
      }
    });

    socket.on('deal_trade_offered', (offer) => {
      soundManager.playYourTurn();
      if (offer.toUserId === player.userId) {
        setIncomingTradeOffer(offer);
      } else if (offer.fromUserId === player.userId) {
        setTradeWaitingMessage(`Ожидание ответа от игрока...`);
      }
    });

    socket.on('deal_trade_closed', () => {
      setIncomingTradeOffer(null);
      setTradeWaitingMessage('');
    });

    socket.on('sync_game_state', (roomData) => {
      if (roomData.players) {
        setRoomPlayers(
          roomData.players.map((p: any) => {
            const isFT = p.currentTrack === 'FAST_TRACK' || p.isOnFastTrack;
            const ftPos = typeof p.fastTrackPosition === 'number'
              ? p.fastTrackPosition
              : (isFT ? (p.position ?? p.boardPosition ?? 0) : 0);

            return {
              id: p.id,
              name: p.name,
              position: p.position ?? p.boardPosition ?? 0,
              color: p.color,
              isCurrentTurn: p.isCurrentTurn,
              isOnFastTrack: isFT,
              fastTrackPosition: ftPos
            };
          })
        );

        const me = roomData.players.find((p: any) => p.userId === player.userId);
        if (me) {
          const isMeFT = me.currentTrack === 'FAST_TRACK' || me.isOnFastTrack;
          const myFtPos = typeof me.fastTrackPosition === 'number'
            ? me.fastTrackPosition
            : (isMeFT ? (me.position ?? me.boardPosition ?? 0) : 0);

          setPlayer((prev) => ({
            ...prev,
            cash: me.cash,
            bankDebt: me.bankDebt ?? prev.bankDebt ?? 0,
            boardPosition: isMeFT ? prev.boardPosition : (me.position ?? prev.boardPosition),
            currentTrack: isMeFT ? 'FAST_TRACK' : (me.currentTrack ?? prev.currentTrack),
            fastTrackPosition: isMeFT ? myFtPos : prev.fastTrackPosition,
            fastTrackCashflow: me.fastTrackCashflow ?? prev.fastTrackCashflow ?? 0,
            fastTrackInitialCashflow: me.fastTrackInitialCashflow ?? prev.fastTrackInitialCashflow ?? 0,
            financials: me.financials ?? prev.financials,
            assets: me.assets ?? prev.assets
          }));
        }
      }

      if (typeof roomData.currentTurnIndex === 'number') {
        setCurrentTurnIndex(roomData.currentTurnIndex);
      }

      if (roomData.logs) {
        setLogs(roomData.logs);
      }

      if (!roomData.activeCardData) {
        setIsMarketDismissed(false);
      }

      setNetworkActiveCard(roomData.activeCardData || null);
    });

    return () => {
      socket.off('sync_game_state');
      socket.off('deal_trade_offered');
      socket.off('deal_trade_closed');
    };
  }, [roomId, player.userId]);

  const checkRatRaceEscape = (passive: number, expenses: number) => {
    if (player.currentTrack === 'RAT_RACE' && passive > expenses && !showFastTrackTransition) {
      soundManager.playVictory();
      setShowFastTrackTransition(true);
      addLog(`🚀 ${player.name} ВЫХОДИТ ИЗ КРЫСИНЫХ БЕГОВ НА СКОРОСТНУЮ ДОРОЖКУ!`);
    }
  };

  const handleEnterFastTrack = () => {
    const fastIncome = player.financials.passiveIncome * 10;
    const updatedFin = {
      ...player.financials,
      salary: 0,
      bankLoanPayment: 0,
      taxes: 0,
      otherExpenses: 0,
      homeMortgagePayment: 0,
      carLoanPayment: 0,
      creditCardPayment: 0,
      childCount: 0,
      totalExpenses: 0,
      monthlyCashflow: fastIncome
    };

    setPlayer((prev) => ({
      ...prev,
      currentTrack: 'FAST_TRACK',
      fastTrackPosition: 0,
      fastTrackCashflow: fastIncome,
      fastTrackInitialCashflow: fastIncome,
      bankDebt: 0,
      financials: updatedFin
    }));

    setRoomPlayers((prev) =>
      prev.map((p) =>
        p.id === player.id
          ? { ...p, isOnFastTrack: true, fastTrackPosition: 0 }
          : p
      )
    );

    setShowFastTrackTransition(false);

    socket.emit('player_update_financials', {
      roomId,
      updatedPlayer: {
        userId: player.userId,
        currentTrack: 'FAST_TRACK',
        isOnFastTrack: true,
        position: 0,
        fastTrackPosition: 0,
        fastTrackCashflow: fastIncome,
        fastTrackInitialCashflow: fastIncome,
        bankDebt: 0,
        financials: updatedFin
      },
      logMessage: `🌟 ${player.name} вступил на Fast Track со стартовым доходом $${fastIncome.toLocaleString()}/ход!`
    });
  };

  const handleClaimManualPayday = () => {
    if (pendingPayday > 0) {
      const claimedAmount = pendingPayday;
      setPendingPayday(0);

      socket.emit('player_update_financials', {
        roomId,
        updatedPlayer: {
          userId: player.userId,
          cash: player.cash + claimedAmount
        },
        logMessage: `💰 ${player.name} забрал чек Payday (+${claimedAmount.toLocaleString()}$)`
      });
    }
  };

  const handleEndTurn = () => {
    if (pendingPayday > 0) {
      addLog(`❌ Вы забыли забрать ЗП! Неполученные +${pendingPayday.toLocaleString()}$ сгорели.`);
      setPendingPayday(0);
    }

    setHasRolledThisTurn(false);
    setDiceValue(null);
    socket.emit('player_end_turn', { roomId });
  };

  const handleRollDice = () => {
    if (!isMyTurn || hasRolledThisTurn) return;

    if (skipTurnsLeft > 0) {
      setSkipTurnsLeft((prev) => prev - 1);
      addLog(`🛑 Вы отбываете штраф. Пропущен ход (Осталось: ${skipTurnsLeft - 1})`);
      handleEndTurn();
      return;
    }

    soundManager.playDiceRoll();
    setIsRolling(true);

    setTimeout(() => {
      let dice1 = Math.floor(Math.random() * 6) + 1;
      let dice2 = 0;
      let dice3 = 0;

      if (isOnFastTrack) {
        dice2 = Math.floor(Math.random() * 6) + 1;
        if (charityTurnsLeft > 0) {
          dice3 = Math.floor(Math.random() * 6) + 1;
          setCharityTurnsLeft((prev) => prev - 1);
        }
      } else {
        if (charityTurnsLeft > 0) {
          dice2 = Math.floor(Math.random() * 6) + 1;
          setCharityTurnsLeft((prev) => prev - 1);
        }
      }

      const totalDice = dice1 + dice2 + dice3;
      setDiceValue(totalDice);
      setIsRolling(false);
      setHasRolledThisTurn(true);

      // 1. ХОД НА СКОРОСТНОЙ ДОРОЖКЕ (FAST TRACK - 30 КЛЕТОК)
      if (isOnFastTrack) {
        const oldPos = player.fastTrackPosition ?? 0;
        const newPos = (oldPos + totalDice) % 30;
        const currentTile = FAST_TRACK_TILES[newPos];

        setPlayer((prev) => ({
          ...prev,
          fastTrackPosition: newPos
        }));

        setRoomPlayers((prev) =>
          prev.map((p) =>
            p.id === player.id
              ? { ...p, fastTrackPosition: newPos, isOnFastTrack: true }
              : p
          )
        );

        let passedPaydayCount = 0;
        for (let step = 1; step <= totalDice; step++) {
          const stepPos = (oldPos + step) % 30;
          if (FAST_TRACK_TILES[stepPos]?.type === 'PAYDAY') {
            passedPaydayCount++;
          }
        }

        let paydayEarned = 0;
        if (passedPaydayCount > 0) {
          paydayEarned = (player.fastTrackCashflow || 0) * passedPaydayCount;
          setPlayer((prev) => ({ ...prev, cash: prev.cash + paydayEarned }));
          addLog(`💰 Пройден сектор Дня Инвестора! Получено +$${paydayEarned.toLocaleString()}`);
        }

        let openedCardData: any = { cardType: currentTile.title };

        if (currentTile.type === 'BUSINESS') {
          setActiveFastTrackDeal(currentTile);
          openedCardData = currentTile;
        } else if (currentTile.type === 'DREAM') {
          setActiveFastTrackEvent(currentTile);
          openedCardData = {
            ...currentTile,
            description: currentTile.dreamId === player.dream?.id ? 'Сектор личной мечты игрока!' : 'Сектор чужой мечты.'
          };
        } else if (currentTile.type === 'TAX_AUDIT') {
          setActiveFastTrackEvent(currentTile);
          openedCardData = {
            ...currentTile,
            description: 'Налоговый аудит: списание 20% от наличных средств.'
          };
        } else if (currentTile.type === 'LAWSUIT') {
          setActiveFastTrackEvent(currentTile);
          openedCardData = {
            ...currentTile,
            description: 'Судебный иск против бизнеса. Штраф: $50,000.'
          };
        } else if (currentTile.type === 'DONATION') {
          setActiveFastTrackEvent(currentTile);
          openedCardData = {
            ...currentTile,
            description: 'Пожертвование $50,000 дает право бросать 3 кубика на 3 хода.'
          };
        } else if (currentTile.type === 'PAYDAY') {
          setTimeout(handleEndTurn, 1000);
        }

        socket.emit('player_roll_dice', {
          roomId,
          diceValue: totalDice,
          newPosition: newPos,
          position: newPos,
          fastTrackPosition: newPos,
          currentTrack: 'FAST_TRACK',
          isOnFastTrack: true,
          paydayAmount: paydayEarned,
          currentTile,
          cardData: openedCardData
        });

        return;
      }

      // 2. ХОД НА МАЛОМ КРУГЕ (RAT RACE - 24 КЛЕТКИ)
      const oldPos = player.boardPosition ?? 0;
      const newPos = (oldPos + totalDice) % 24;
      const currentTile = BOARD_TILES[newPos];

      let passedPaydayCount = 0;
      for (let step = 1; step <= totalDice; step++) {
        const stepPos = (oldPos + step) % 24;
        if (BOARD_TILES[stepPos]?.type === 'PAYDAY') {
          passedPaydayCount++;
        }
      }

      let paydayEarned = 0;
      if (passedPaydayCount > 0) {
        const totalCashflowEarned = player.financials.monthlyCashflow * passedPaydayCount;
        if (settings?.autoPayday) {
          paydayEarned = totalCashflowEarned;
        } else {
          setPendingPayday(totalCashflowEarned);
          addLog(`⚠️ Пройдена клетка «День получки»! Нажмите «ЗАБРАТЬ ЗАРПЛАТУ», пока не завершен ход.`);
        }
      }

      let openedCardData: any = { cardType: currentTile.title };

      if (currentTile.type === 'DEAL') {
        setActiveDealModal(true);
        openedCardData = { title: 'Выбирает вариант сделки', description: 'Игрок просматривает список сделок и оценивает доходность.' };
      } else if (currentTile.type === 'DOODAD') {
        const randomDoodad = DOODADS[Math.floor(Math.random() * DOODADS.length)];
        setActiveDoodadCard(randomDoodad);
        openedCardData = randomDoodad;
      } else if (currentTile.type === 'MARKET') {
        const randomMarket = MARKET_CARDS[Math.floor(Math.random() * MARKET_CARDS.length)];
        setActiveMarketCard(randomMarket);
        setIsMarketDismissed(false);
        openedCardData = randomMarket;
      } else if (currentTile.type === 'CHARITY') {
        setShowCharityModal(true);
        openedCardData = { title: 'Благотворительность', description: 'Игрок решает, пожертвовать ли 10% дохода.' };
      } else if (currentTile.type === 'DOWNTURN') {
        soundManager.playExpenseSound();
        setShowDownturnModal(true);
        openedCardData = { title: 'Увольнение с работы', description: 'Игрок попал под сокращение и пропускает 2 хода.' };
      } else if (currentTile.type === 'BABY') {
        setShowBabyModal(true);
        openedCardData = { title: 'Рождение ребенка', description: 'У игрока пополнение в семье!' };
      } else if (currentTile.type === 'PAYDAY') {
        setTimeout(() => {
          handleEndTurn();
        }, 1200);
      }

      socket.emit('player_roll_dice', {
        roomId,
        diceValue: totalDice,
        newPosition: newPos,
        currentTrack: 'RAT_RACE',
        paydayAmount: paydayEarned,
        currentTile,
        cardData: openedCardData
      });
    }, 400);
  };

  const handleBuyFastTrackDeal = (tile: FastTrackTile) => {
    soundManager.playCoinSound();
    const cost = tile.cost || 0;
    const addedCashflow = tile.cashflow || 0;

    const newAsset: Asset = {
      id: 'ft_ast_' + Date.now(),
      title: tile.title,
      type: 'FAST_TRACK_BIZ',
      cost,
      cashflow: addedCashflow,
      downPayment: cost
    };

    const updatedCash = player.cash - cost;
    const updatedFastCashflow = (player.fastTrackCashflow || 0) + addedCashflow;

    const updatedFinancials = {
      ...player.financials,
      passiveIncome: (player.financials.passiveIncome || 0) + addedCashflow,
      totalIncome: (player.financials.totalIncome || 0) + addedCashflow,
      monthlyCashflow: (player.financials.monthlyCashflow || 0) + addedCashflow
    };

    setPlayer((prev) => ({
      ...prev,
      cash: updatedCash,
      fastTrackCashflow: updatedFastCashflow,
      financials: updatedFinancials,
      assets: [...prev.assets, newAsset]
    }));

    socket.emit('player_update_financials', {
      roomId,
      updatedPlayer: {
        userId: player.userId,
        cash: updatedCash,
        fastTrackCashflow: updatedFastCashflow,
        financials: updatedFinancials,
        assets: [...player.assets, newAsset]
      },
      logMessage: `🏢 ${player.name} приобрел бизнес «${tile.title}» (+${addedCashflow.toLocaleString()}$/ход к Payday)!`
    });

    const flowGain = updatedFastCashflow - (player.fastTrackInitialCashflow || 0);
    if (flowGain >= 50000) {
      soundManager.playVictory();
      setShowVictoryModal(true);
      addLog(`🏆 АБСОЛЮТНАЯ ПОБЕДА! ${player.name} увеличил Fast Track поток на +$${flowGain.toLocaleString()}!`);
    }

    finishTurnAction();
  };

  const handleBuyDeal = (deal: DealCard, stockCount?: number, borrowedAmount: number = 0) => {
    const isStock = deal.type === 'STOCK';
    const payment = isStock ? deal.cost * (stockCount || 100) : deal.downPayment;
    const addedCashflow = deal.cashflow;

    const newAsset: Asset = {
      id: 'ast_' + Date.now(),
      title: isStock ? `${deal.symbol} (${stockCount} шт)` : deal.title,
      type: deal.type,
      cost: isStock ? payment : deal.cost,
      cashflow: addedCashflow,
      downPayment: payment,
      sharesCount: isStock ? stockCount : undefined,
      mortgage: deal.mortgage
    };

    const addedLoanPayment = Math.round(borrowedAmount * 0.1);
    const newDebt = (player.bankDebt || 0) + borrowedAmount;
    const newBankPayment = player.financials.bankLoanPayment + addedLoanPayment;
    const newTotalExpenses = player.financials.totalExpenses + addedLoanPayment;

    const updatedCash = player.cash + borrowedAmount - payment;
    const updatedPassive = player.financials.passiveIncome + addedCashflow;
    const updatedTotalIncome = player.financials.salary + updatedPassive;
    const updatedMonthlyCashflow = updatedTotalIncome - newTotalExpenses;

    socket.emit('player_update_financials', {
      roomId,
      updatedPlayer: {
        userId: player.userId,
        cash: updatedCash,
        bankDebt: newDebt,
        assets: [...player.assets, newAsset],
        financials: {
          ...player.financials,
          passiveIncome: updatedPassive,
          totalIncome: updatedTotalIncome,
          bankLoanPayment: newBankPayment,
          totalExpenses: newTotalExpenses,
          monthlyCashflow: updatedMonthlyCashflow
        }
      },
      logMessage: `✅ ${player.name} купил: «${deal.title}» (+${addedCashflow}$/мес)`
    });

    checkRatRaceEscape(updatedPassive, newTotalExpenses);
    finishTurnAction();
  };

  const handleSellDealToPlayer = (deal: DealCard, buyer: BoardPlayer, fee: number) => {
    socket.emit('propose_deal_to_player', {
      roomId,
      fromPlayer: player,
      toUserId: buyer.id.replace('p_', ''),
      deal,
      fee
    });
    finishTurnAction();
  };

  const handleAcceptTrade = () => {
    socket.emit('respond_deal_trade', {
      roomId,
      accepted: true,
      tradeOffer: incomingTradeOffer
    });
    setIncomingTradeOffer(null);
  };

  const handleDeclineTrade = () => {
    socket.emit('respond_deal_trade', {
      roomId,
      accepted: false,
      tradeOffer: incomingTradeOffer
    });
    setIncomingTradeOffer(null);
  };

  const handleSellAsset = (asset: Asset, offerPrice: number) => {
    const isStock = asset.type === 'STOCK';
    const mortgage = asset.mortgage || 0;
    const netPayout = isStock ? offerPrice * (asset.sharesCount || 1) : offerPrice - mortgage;

    const updatedPassive = player.financials.passiveIncome - asset.cashflow;
    const updatedTotalIncome = player.financials.salary + updatedPassive;
    const updatedMonthlyCashflow = updatedTotalIncome - player.financials.totalExpenses;

    socket.emit('player_update_financials', {
      roomId,
      updatedPlayer: {
        userId: player.userId,
        cash: player.cash + netPayout,
        assets: player.assets.filter((a) => a.id !== asset.id),
        financials: {
          ...player.financials,
          passiveIncome: updatedPassive,
          totalIncome: updatedTotalIncome,
          monthlyCashflow: updatedMonthlyCashflow
        }
      },
      logMessage: `🏦 ${player.name} продал «${asset.title}» (+${netPayout.toLocaleString()}$)`
    });

    setIsMarketDismissed(true);
    setActiveMarketCard(null);
    if (isMyTurn) finishTurnAction();
  };

  const handleExecuteSplit = (symbol: string, ratio: number) => {
    const newAssets = player.assets.map((a) => {
      if (a.type === 'STOCK' && a.title.includes(symbol)) {
        const newCount = (a.sharesCount || 0) * ratio;
        return { ...a, sharesCount: newCount, title: `${symbol} (${newCount} шт)` };
      }
      return a;
    });

    socket.emit('player_update_financials', {
      roomId,
      updatedPlayer: {
        userId: player.userId,
        assets: newAssets
      },
      logMessage: `✂️ ${player.name}: Сплит акций ${symbol} (x${ratio})!`
    });

    setIsMarketDismissed(true);
    setActiveMarketCard(null);
    if (isMyTurn) finishTurnAction();
  };

  const handleConfirmBaby = () => {
    soundManager.playCoinSound();
    if (player.financials.childCount < 3) {
      const expensePerChild = player.profession.childExpensePerCount;
      const newChildCount = player.financials.childCount + 1;
      const newTotalExpenses = player.financials.totalExpenses + expensePerChild;
      const newMonthlyCashflow = player.financials.totalIncome - newTotalExpenses;

      socket.emit('player_update_financials', {
        roomId,
        updatedPlayer: {
          userId: player.userId,
          financials: {
            ...player.financials,
            childCount: newChildCount,
            totalExpenses: newTotalExpenses,
            monthlyCashflow: newMonthlyCashflow
          }
        },
        logMessage: `👶 У ${player.name} родился ребенок (#${newChildCount}/3).`
      });
    }
    finishTurnAction();
  };

  const handleDonateCharity = (amount: number) => {
    soundManager.playCoinSound();
    socket.emit('player_update_financials', {
      roomId,
      updatedPlayer: {
        userId: player.userId,
        cash: player.cash - amount
      },
      logMessage: `🤝 ${player.name} пожертвовал ${amount.toLocaleString()}$ на благотворительность!`
    });
    setCharityTurnsLeft(3);
    finishTurnAction();
  };

  const handleDownturnConfirm = () => {
    soundManager.playExpenseSound();
    const cost = player.financials.totalExpenses;
    socket.emit('player_update_financials', {
      roomId,
      updatedPlayer: {
        userId: player.userId,
        cash: player.cash - cost
      },
      logMessage: `🛑 ${player.name} уволен (-${cost.toLocaleString()}$) и пропускает 2 хода.`
    });
    setSkipTurnsLeft(2);
    finishTurnAction();
  };

  const handleTakeLoan = (amount: number) => {
    const addedPayment = Math.round(amount * 0.1);
    const newDebt = (player.bankDebt || 0) + amount;
    const newBankPayment = player.financials.bankLoanPayment + addedPayment;
    const newTotalExpenses = player.financials.totalExpenses + addedPayment;
    const newMonthlyCashflow = player.financials.totalIncome - newTotalExpenses;

    socket.emit('player_update_financials', {
      roomId,
      updatedPlayer: {
        userId: player.userId,
        cash: player.cash + amount,
        bankDebt: newDebt,
        financials: {
          ...player.financials,
          bankLoanPayment: newBankPayment,
          totalExpenses: newTotalExpenses,
          monthlyCashflow: newMonthlyCashflow
        }
      },
      logMessage: `🏦 ${player.name} взял кредит: +${amount.toLocaleString()}$`
    });
  };

  const handlePayLoan = (amount: number) => {
    const reducedPayment = Math.round(amount * 0.1);
    const newDebt = Math.max(0, (player.bankDebt || 0) - amount);
    const newBankPayment = Math.max(0, player.financials.bankLoanPayment - reducedPayment);
    const newTotalExpenses = player.financials.totalExpenses - reducedPayment;
    const newMonthlyCashflow = player.financials.totalIncome - newTotalExpenses;

    socket.emit('player_update_financials', {
      roomId,
      updatedPlayer: {
        userId: player.userId,
        cash: player.cash - amount,
        bankDebt: newDebt,
        financials: {
          ...player.financials,
          bankLoanPayment: newBankPayment,
          totalExpenses: newTotalExpenses,
          monthlyCashflow: newMonthlyCashflow
        }
      },
      logMessage: `✂️ ${player.name} погасил займ: -${amount.toLocaleString()}$`
    });
  };

  const handlePayOffLiability = (
    type: 'CREDIT_CARD' | 'CAR_LOAN' | 'HOME_MORTGAGE',
    cost: number,
    paymentReduction: number
  ) => {
    const newExpenses = player.financials.totalExpenses - paymentReduction;
    const newCashflow = player.financials.totalIncome - newExpenses;
    const updatedProfession = { ...player.profession };
    const updatedFinancials = {
      ...player.financials,
      totalExpenses: newExpenses,
      monthlyCashflow: newCashflow
    };

    if (type === 'CREDIT_CARD') {
      updatedProfession.creditCardDebt = 0;
      updatedFinancials.creditCardPayment = 0;
    } else if (type === 'CAR_LOAN') {
      updatedProfession.carDebt = 0;
      updatedFinancials.carLoanPayment = 0;
    } else if (type === 'HOME_MORTGAGE') {
      updatedProfession.homeDebt = 0;
      updatedFinancials.homeMortgagePayment = 0;
    }

    socket.emit('player_update_financials', {
      roomId,
      updatedPlayer: {
        userId: player.userId,
        cash: player.cash - cost,
        profession: updatedProfession,
        financials: updatedFinancials
      },
      logMessage: `🎉 ${player.name} погасил стартовый пассив (-${cost.toLocaleString()}$)`
    });
  };

  const handleLiquidateAsset = (asset: Asset) => {
    soundManager.playExpenseSound();
    const liquidationValue = Math.round(asset.downPayment * 0.5);
    const updatedPassive = Math.max(0, player.financials.passiveIncome - asset.cashflow);
    const updatedTotalIncome = player.financials.salary + updatedPassive;
    const updatedMonthlyCashflow = updatedTotalIncome - player.financials.totalExpenses;

    socket.emit('player_update_financials', {
      roomId,
      updatedPlayer: {
        userId: player.userId,
        cash: player.cash + liquidationValue,
        assets: player.assets.filter((a) => a.id !== asset.id),
        financials: {
          ...player.financials,
          passiveIncome: updatedPassive,
          totalIncome: updatedTotalIncome,
          monthlyCashflow: updatedMonthlyCashflow
        }
      },
      logMessage: `🚨 ${player.name} ликвидировал актив «${asset.title}» за +${liquidationValue}$`
    });
  };

  const handleDeclareBankruptcy = () => {
    soundManager.playExpenseSound();
    const reducedDebt = Math.round((player.bankDebt || 0) * 0.5);
    const reducedBankPayment = Math.round(player.financials.bankLoanPayment * 0.5);
    const newTotalExpenses = player.financials.totalExpenses - reducedBankPayment;
    const newMonthlyCashflow = player.financials.salary - newTotalExpenses;

    socket.emit('player_update_financials', {
      roomId,
      updatedPlayer: {
        userId: player.userId,
        cash: 500,
        bankDebt: reducedDebt,
        assets: [],
        financials: {
          ...player.financials,
          passiveIncome: 0,
          totalIncome: player.financials.salary,
          bankLoanPayment: player.financials.bankLoanPayment - reducedBankPayment,
          totalExpenses: newTotalExpenses,
          monthlyCashflow: newMonthlyCashflow
        }
      },
      logMessage: `🛑 ${player.name} ОБЪЯВИЛ БАНКРОТСТВО: списание 50%, пропуск 3 ходов.`
    });

    setSkipTurnsLeft(3);
    finishTurnAction();
  };

  return (
    <div className="h-[100dvh] bg-[#130620] text-slate-100 flex flex-col overflow-hidden select-none">
      <TurnNotification
        playerName={activeCurrentPlayer?.name || ''}
        isMyTurn={isMyTurn}
      />

      <header className="bg-[#1f0a33] border-b border-purple-900/50 px-2.5 sm:px-6 py-1.5 flex items-center justify-between shadow-lg shrink-0">
        <div className="flex items-center space-x-1.5">
          <div className="w-5 h-5 rounded bg-amber-400 flex items-center justify-center font-black text-slate-950 text-[10px]">
            $
          </div>
          <span className="text-[10px] font-mono bg-purple-950 border border-purple-700/60 px-1.5 py-0.5 rounded text-purple-300">
            #{roomId}
          </span>
          {isOnFastTrack && (
            <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950">
              FAST TRACK
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* Кнопка ручного перехода на Fast Track, если условия выполнены */}
          {!isOnFastTrack && player.financials.passiveIncome > player.financials.totalExpenses && (
            <button
              onClick={() => setShowFastTrackTransition(true)}
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-2.5 py-0.5 rounded-lg text-[10px] transition cursor-pointer flex items-center space-x-1 animate-pulse shadow-md"
            >
              <span>🚀</span>
              <span>Выйти на Fast Track</span>
            </button>
          )}

          <button
            onClick={() => {
              const hugePassive = (player.financials?.totalExpenses || 1500) + 15000;
              const updatedFin = {
                ...player.financials,
                passiveIncome: hugePassive,
                totalIncome: player.financials.salary + hugePassive,
                monthlyCashflow: player.financials.salary + hugePassive - player.financials.totalExpenses
              };

              setPlayer((prev) => ({
                ...prev,
                financials: updatedFin
              }));

              socket.emit('player_update_financials', {
                roomId,
                updatedPlayer: {
                  userId: player.userId,
                  financials: updatedFin
                },
                logMessage: `⚡ [ЧИТ] ${player.name} получил пассивный доход $${hugePassive.toLocaleString()}`
              });

              setShowFastTrackTransition(true);
            }}
            className="bg-amber-500/30 border border-amber-400 hover:bg-amber-500/50 text-amber-300 font-black px-2 py-0.5 rounded-lg text-[10px] transition cursor-pointer flex items-center space-x-1 animate-pulse"
          >
            <span>⚡</span>
            <span>Fast Track Чит</span>
          </button>

          <button
            onClick={handleToggleMute}
            className="text-[11px] bg-slate-900 border border-slate-700 hover:border-slate-500 px-2 py-0.5 rounded-lg transition cursor-pointer"
            title={isMuted ? 'Включить звук' : 'Выключить звук'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>

          <div
            className={`text-[11px] font-mono font-black px-2 py-0.5 rounded-lg flex items-center space-x-1 border transition-all ${
              timeLeft <= 15
                ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse'
                : 'bg-slate-900 border-slate-700 text-amber-300'
            }`}
          >
            <span>⏱️</span>
            <span>{timeLeft}s</span>
          </div>

          <div className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-700 flex items-center space-x-1">
            <span className="text-slate-400">Ходит:</span>
            <span className="font-mono text-amber-400 truncate max-w-[65px] sm:max-w-none">
              {activeCurrentPlayer?.name || '...'}
            </span>
          </div>

          {!isOnFastTrack && (
            <button
              onClick={() => setShowBankModal(true)}
              className="bg-emerald-500/20 border border-emerald-500/40 hover:bg-emerald-500/30 text-emerald-400 font-bold px-2 py-0.5 rounded-lg text-[10px] transition cursor-pointer flex items-center space-x-1"
            >
              <span>🏦</span>
              <span>Банк</span>
            </button>
          )}

          <button
            onClick={onRestart}
            className="text-[10px] text-slate-400 hover:text-rose-400 transition cursor-pointer px-1"
          >
            ✕
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-2 p-1.5 sm:p-3 w-full overflow-hidden relative">
        <section className="flex-1 lg:col-span-8 xl:col-span-9 flex items-center justify-center min-h-0 w-full h-full pb-14 lg:pb-0">
          <GameBoard
            players={roomPlayers}
            activePlayerId={activeCurrentPlayer?.id}
          />
        </section>

        <section className="hidden lg:flex lg:col-span-4 xl:col-span-3 h-full">
          <FinancialStatementPanel
            player={player}
            playerColor={playerColor}
            logs={logs}
            diceValue={diceValue}
            isRolling={isRolling}
            onRollDice={handleRollDice}
            isMyTurn={isMyTurn}
            hasRolledThisTurn={hasRolledThisTurn}
            onEndTurn={handleEndTurn}
          />
        </section>

        <div className="lg:hidden">
          <FinancialStatementPanel
            player={player}
            playerColor={playerColor}
            logs={logs}
            diceValue={diceValue}
            isRolling={isRolling}
            onRollDice={handleRollDice}
            isMyTurn={isMyTurn}
            hasRolledThisTurn={hasRolledThisTurn}
            onEndTurn={handleEndTurn}
          />
        </div>

        {pendingPayday > 0 && isMyTurn && !isOnFastTrack && (
          <div className="absolute bottom-20 lg:bottom-8 left-1/2 -translate-x-1/2 z-40 animate-bounce">
            <button
              onClick={handleClaimManualPayday}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3.5 rounded-2xl shadow-2xl border-2 border-white flex items-center space-x-1.5 cursor-pointer transition transform active:scale-95"
            >
              <span className="text-base sm:text-lg">💰</span>
              <span>ПОЛУЧИТЬ ЗАРПЛАТУ (+{pendingPayday.toLocaleString()} $)</span>
            </button>
          </div>
        )}
      </main>

      {/* Модальное окно перехода на Скоростную дорожку */}
      {showFastTrackTransition && (
        <FastTrackTransitionModal
          player={player}
          onEnterFastTrack={handleEnterFastTrack}
          onStayInRatRace={() => {
            setShowFastTrackTransition(false);
            addLog(`⏳ ${player.name} решил остаться на малом круге и продолжить накопление капитала.`);
          }}
        />
      )}

      {/* Модальное окно покупки бизнеса на Fast Track */}
      {isMyTurn && activeFastTrackDeal && (
        <FastTrackDealModal
          tile={activeFastTrackDeal}
          playerCash={player.cash}
          onBuy={handleBuyFastTrackDeal}
          onPass={finishTurnAction}
        />
      )}

      {/* Модальное окно событий Fast Track (Мечта, Налоги, Иск, Фонд) */}
      {isMyTurn && activeFastTrackEvent && (
        <FastTrackEventModal
          tile={activeFastTrackEvent}
          playerCash={player.cash}
          isMyDream={player.dream && (activeFastTrackEvent.dreamId === player.dream.id || activeFastTrackEvent.title === player.dream.title)}
          onBuyDream={() => {
            soundManager.playVictory();
            setShowVictoryModal(true);
            setActiveFastTrackEvent(null);
            addLog(`🏆 АБСОЛЮТНАЯ ПОБЕДА! ${player.name} выкупил свою Мечту «${activeFastTrackEvent.title}»!`);
          }}
          onConfirm={() => {
            if (activeFastTrackEvent.type === 'TAX_AUDIT') {
              soundManager.playExpenseSound();
              const taxAmt = Math.round(player.cash * 0.2);
              const newCash = Math.max(0, player.cash - taxAmt);
              setPlayer((prev) => ({ ...prev, cash: newCash }));
              socket.emit('player_update_financials', {
                roomId,
                updatedPlayer: { userId: player.userId, cash: newCash },
                logMessage: `⚖️ ${player.name} оплатил налоговый аудит: -$${taxAmt.toLocaleString()}`
              });
            } else if (activeFastTrackEvent.type === 'LAWSUIT') {
              soundManager.playExpenseSound();
              const lawsuitCost = 50000;
              const newCash = Math.max(0, player.cash - lawsuitCost);
              setPlayer((prev) => ({ ...prev, cash: newCash }));
              socket.emit('player_update_financials', {
                roomId,
                updatedPlayer: { userId: player.userId, cash: newCash },
                logMessage: `🏛️ ${player.name} выплатил судебный иск: -$${lawsuitCost.toLocaleString()}`
              });
            } else if (activeFastTrackEvent.type === 'DONATION') {
              soundManager.playCoinSound();
              const donationAmt = 50000;
              const newCash = Math.max(0, player.cash - donationAmt);
              setPlayer((prev) => ({ ...prev, cash: newCash }));
              setCharityTurnsLeft(3);
              socket.emit('player_update_financials', {
                roomId,
                updatedPlayer: { userId: player.userId, cash: newCash },
                logMessage: `🤝 ${player.name} пожертвовал в фонд $50,000!`
              });
            }
            finishTurnAction();
          }}
        />
      )}

      {!isMarketDismissed && (activeMarketCard || (networkActiveCard && (networkActiveCard.cardType === 'Рынок' || networkActiveCard.targetType === 'SPLIT' || networkActiveCard.offerPrice || networkActiveCard.targetType === 'STOCK' || networkActiveCard.targetType === 'REAL_ESTATE'))) && (
        <MarketModal
          card={activeMarketCard || networkActiveCard}
          playerAssets={player.assets}
          onSellAsset={handleSellAsset}
          onExecuteSplit={handleExecuteSplit}
          onPass={() => {
            setActiveMarketCard(null);
            setIsMarketDismissed(true);
            if (isMyTurn) finishTurnAction();
          }}
        />
      )}

      {/* Синхронное отображение открытой карточки для наблюдателей */}
      {!isMyTurn && networkActiveCard && (
        <SpectatorCardModal cardData={networkActiveCard} />
      )}

      {isMyTurn && activeDealModal && (
        <DealModal
          roomId={roomId}
          playerCash={player.cash}
          monthlyCashflow={player.financials.monthlyCashflow}
          otherPlayers={roomPlayers.filter((p) => p.id !== player.id)}
          onBuy={handleBuyDeal}
          onSellToPlayer={handleSellDealToPlayer}
          onPass={finishTurnAction}
        />
      )}

      {isMyTurn && activeDoodadCard && (
        <DoodadModal
          card={activeDoodadCard}
          playerCash={player.cash}
          onPay={(amt) => {
            soundManager.playCoinSound();
            socket.emit('player_update_financials', {
              roomId,
              updatedPlayer: {
                userId: player.userId,
                cash: player.cash - amt
              },
              logMessage: `💸 ${player.name} оплатил расход: -${amt.toLocaleString()}$`
            });
            finishTurnAction();
          }}
        />
      )}

      {isMyTurn && showCharityModal && (
        <CharityModal
          totalIncome={player.financials.totalIncome}
          playerCash={player.cash}
          onDonate={handleDonateCharity}
          onPass={finishTurnAction}
        />
      )}

      {isMyTurn && showDownturnModal && (
        <DownturnModal
          totalExpenses={player.financials.totalExpenses}
          onConfirm={handleDownturnConfirm}
        />
      )}

      {showBankModal && (
        <BankModal
          player={player}
          onTakeLoan={handleTakeLoan}
          onPayLoan={handlePayLoan}
          onPayOffLiability={handlePayOffLiability}
          onClose={() => setShowBankModal(false)}
        />
      )}

      {isMyTurn && showBabyModal && (
        <BabyModal
          childCount={player.financials.childCount}
          childExpense={player.profession.childExpensePerCount}
          onConfirm={handleConfirmBaby}
        />
      )}

      {showVictoryModal && (
        <VictoryModal
          player={player}
          onContinue={() => setShowVictoryModal(false)}
        />
      )}

      {player.cash < 0 && (
        <BankruptcyModal
          player={player}
          deficit={Math.abs(player.cash)}
          onLiquidateAsset={handleLiquidateAsset}
          onDeclareBankruptcy={handleDeclareBankruptcy}
        />
      )}

      {incomingTradeOffer && (
        <DealTradeIncomingModal
          tradeOffer={incomingTradeOffer}
          playerCash={player.cash}
          onAccept={handleAcceptTrade}
          onDecline={handleDeclineTrade}
        />
      )}

      {tradeWaitingMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-amber-400 text-slate-950 font-black px-4 py-2 rounded-2xl shadow-xl animate-pulse text-xs">
          ⏳ {tradeWaitingMessage}
        </div>
      )}

      {/* Dev Cheats панель */}
      <div className="fixed top-12 right-2 z-50 flex flex-col gap-1 bg-slate-950/90 border border-amber-400/60 p-1.5 rounded-xl shadow-2xl backdrop-blur-md">
        <span className="text-[8px] font-black text-amber-400 uppercase text-center tracking-wider">
          🛠️ Dev Cheats
        </span>

        <button
          onClick={() => {
            const hugePassive = (player.financials?.totalExpenses || 1500) + 20000;
            const updatedFin = {
              ...player.financials,
              passiveIncome: hugePassive,
              totalIncome: (player.financials?.salary || 3000) + hugePassive,
              monthlyCashflow: (player.financials?.salary || 3000) + hugePassive - (player.financials?.totalExpenses || 1500)
            };

            setPlayer((prev) => ({
              ...prev,
              financials: updatedFin
            }));

            socket.emit('player_update_financials', {
              roomId,
              updatedPlayer: {
                userId: player.userId,
                financials: updatedFin
              },
              logMessage: `⚡ [ЧИТ] ${player.name} активировал выход на Fast Track!`
            });

            setShowFastTrackTransition(true);
          }}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[9px] px-2 py-1 rounded-lg transition active:scale-95 cursor-pointer shadow"
        >
          🚀 На Fast Track
        </button>

        <button
          onClick={() => {
            const addedCash = player.cash + 500000;
            setPlayer((prev) => ({ ...prev, cash: addedCash }));
            socket.emit('player_update_financials', {
              roomId,
              updatedPlayer: {
                userId: player.userId,
                cash: addedCash
              },
              logMessage: `💰 [ЧИТ] ${player.name} начислил +$500,000 кэша!`
            });
          }}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[9px] px-2 py-1 rounded-lg transition active:scale-95 cursor-pointer shadow"
        >
          +$500k Кэш
        </button>
      </div>
    </div>
  );
};