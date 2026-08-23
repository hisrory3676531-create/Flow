import { useState, useEffect } from 'react';
import type { Player, GameSettings } from './types/game.types';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ProfileSetupScreen, RatColor } from './components/ProfileSetupScreen';
import { LobbyBrowserScreen } from './components/LobbyBrowserScreen';
import { RoomLobbyScreen } from './components/RoomLobbyScreen';
import { GameScreen } from './components/GameScreen';
import { socket } from './services/socket';

type AppStep = 'WELCOME' | 'PROFILE' | 'LOBBY_BROWSER' | 'ROOM_LOBBY' | 'GAME';

export const App = () => {
  const [step, setStep] = useState<AppStep>('WELCOME');
  
  // Инициализируем постоянный userId или берем сохраненный
  const [userId] = useState<string>(() => {
    const saved = localStorage.getItem('cashflow_userId');
    if (saved) return saved;
    const newId = 'usr_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem('cashflow_userId', newId);
    return newId;
  });

  const [playerName, setPlayerName] = useState<string>(() => {
    return localStorage.getItem('cashflow_userName') || '';
  });

  const [activeRoomId, setActiveRoomId] = useState<string>('');
  const [player, setPlayer] = useState<Player | null>(null);
  const [playerColor, setPlayerColor] = useState<RatColor | null>(null);
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    roomId: '',
    maxPlayers: 4,
    autoPayday: true
  });

  // Проверка сохраненной активной сессии при перезагрузке страницы
  useEffect(() => {
    const savedSession = localStorage.getItem('cashflow_active_session');
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        if (parsed.roomId && parsed.userId) {
          setActiveRoomId(parsed.roomId);
          if (parsed.userName) setPlayerName(parsed.userName);
          
          // Отправляем запрос на восстановление сессии
          socket.emit('reconnect_session', {
            roomId: parsed.roomId,
            userId: parsed.userId
          });
        }
      } catch (e) {
        localStorage.removeItem('cashflow_active_session');
      }
    }

    // Обработчик успешного восстановления сессии
    socket.on('session_restored', ({ roomData, gameStarted, player: restoredPlayer }) => {
      const me = restoredPlayer || roomData.players?.find((p: any) => p.userId === userId);
      
      if (me) {
        setPlayer({
          id: me.id || 'p_' + me.userId,
          userId: me.userId,
          name: me.name,
          profession: me.profession,
          currentTrack: 'RAT_RACE',
          boardPosition: me.boardPosition ?? me.position ?? 0,
          cash: me.cash,
          bankDebt: me.bankDebt || 0,
          financials: me.financials,
          assets: me.assets || [],
          isBankrupt: false,
          skippedTurns: 0
        });

        if (me.color) {
          setPlayerColor(me.color);
        }
      }

      setGameSettings({
        roomId: roomData.roomId,
        maxPlayers: roomData.maxPlayers,
        autoPayday: roomData.autoPayday
      });

      if (gameStarted) {
        setStep('GAME');
      } else {
        setStep('ROOM_LOBBY');
      }
    });

    // Обработчик неудачного восстановления (комната удалена / таймаут 2 мин)
    socket.on('session_restore_failed', () => {
      localStorage.removeItem('cashflow_active_session');
      if (playerName) {
        setStep('LOBBY_BROWSER');
      } else {
        setStep('WELCOME');
      }
    });

    return () => {
      socket.off('session_restored');
      socket.off('session_restore_failed');
    };
  }, [userId, playerName]);

  const handleAcceptRules = () => {
    if (playerName) {
      setStep('LOBBY_BROWSER');
    } else {
      setStep('PROFILE');
    }
  };

  const handleProfileComplete = (name: string) => {
    setPlayerName(name);
    localStorage.setItem('cashflow_userName', name);
    setStep('LOBBY_BROWSER');
  };

  const handleCreateRoom = ({ roomId, roomName, maxPlayers, autoPayday }: any) => {
    setActiveRoomId(roomId);
    setGameSettings({ roomId, maxPlayers, autoPayday });

    // Сохраняем активную сессию
    localStorage.setItem('cashflow_active_session', JSON.stringify({
      roomId,
      userId,
      userName: playerName
    }));

    socket.emit('create_room', {
      roomId,
      roomName,
      maxPlayers,
      autoPayday,
      hostPlayer: {
        id: 'p_' + userId,
        userId,
        name: playerName,
        color: null,
        profession: null
      }
    });

    setStep('ROOM_LOBBY');
  };

  const handleJoinRoom = (roomId: string) => {
    setActiveRoomId(roomId);

    // Сохраняем активную сессию
    localStorage.setItem('cashflow_active_session', JSON.stringify({
      roomId,
      userId,
      userName: playerName
    }));

    socket.emit('join_room', {
      roomId,
      playerProfile: {
        id: 'p_' + userId,
        userId,
        name: playerName,
        color: null,
        profession: null
      }
    });

    setStep('ROOM_LOBBY');
  };

  const handleGameStarted = (roomData: any) => {
    const me = roomData.players.find((p: any) => p.userId === userId);
    if (me) {
      setPlayer({
        id: me.id || 'p_' + me.userId,
        userId: me.userId,
        name: me.name,
        profession: me.profession,
        currentTrack: 'RAT_RACE',
        boardPosition: me.boardPosition ?? me.position ?? 0,
        cash: me.cash,
        bankDebt: 0,
        financials: me.financials,
        assets: me.assets || [],
        isBankrupt: false,
        skippedTurns: 0
      });
      setPlayerColor(me.color);
      setGameSettings({
        roomId: roomData.roomId,
        maxPlayers: roomData.maxPlayers,
        autoPayday: roomData.autoPayday
      });

      // Обновляем сохраненную сессию
      localStorage.setItem('cashflow_active_session', JSON.stringify({
        roomId: roomData.roomId,
        userId,
        userName: playerName
      }));

      setStep('GAME');
    }
  };

  const handleLeaveLobby = () => {
    localStorage.removeItem('cashflow_active_session');
    setStep('LOBBY_BROWSER');
  };

  const handleRestart = () => {
    localStorage.removeItem('cashflow_active_session');
    setStep('LOBBY_BROWSER');
    setPlayer(null);
    setPlayerColor(null);
  };

  return (
    <main className="min-h-screen bg-[#130620] text-slate-100 font-sans">
      {step === 'WELCOME' && <WelcomeScreen onAcceptRules={handleAcceptRules} />}

      {step === 'PROFILE' && (
        <ProfileSetupScreen
          onComplete={(name) => handleProfileComplete(name)}
        />
      )}

      {step === 'LOBBY_BROWSER' && (
        <LobbyBrowserScreen
          userName={playerName}
          userId={userId}
          onJoinRoom={handleJoinRoom}
          onCreateRoom={handleCreateRoom}
          onBack={() => setStep('PROFILE')}
        />
      )}

      {step === 'ROOM_LOBBY' && (
        <RoomLobbyScreen
          roomId={activeRoomId}
          userId={userId}
          userName={playerName}
          onGameStarted={handleGameStarted}
          onLeave={handleLeaveLobby}
        />
      )}

      {step === 'GAME' && player && playerColor && (
        <GameScreen
          player={player}
          playerColor={playerColor}
          settings={gameSettings}
          onRestart={handleRestart}
        />
      )}
    </main>
  );
};