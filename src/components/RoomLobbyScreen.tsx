import { useState, useEffect } from 'react';
import type { FC } from 'react';
import type { Profession, Dream } from '../types/game.types';
import { DREAMS_LIST } from '../types/game.types';
import { RAT_COLORS, RatColor } from './ProfileSetupScreen';
import { PROFESSIONS } from '../data/professions.data';
import { socket } from '../services/socket';

interface RoomLobbyScreenProps {
  roomId: string;
  userId: string;
  userName: string;
  onGameStarted: (gameData: any) => void;
  onLeave: () => void;
}

export const RoomLobbyScreen: FC<RoomLobbyScreenProps> = ({
  roomId,
  userId,
  userName,
  onGameStarted,
  onLeave
}) => {
  const [roomData, setRoomData] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState<RatColor | null>(null);
  const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null);
  const [selectedDream, setSelectedDream] = useState<Dream>(DREAMS_LIST[0]);
  const [showFullCardModal, setShowFullCardModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const handleSyncLobby = (data: any) => {
      if (data && data.roomId === roomId) {
        setRoomData(data);
        const me = data.players?.find((p: any) => p.userId === userId);
        if (me?.color) setSelectedColor(me.color);
        if (me?.profession) setSelectedProfession(me.profession);
        if (me?.dream) setSelectedDream(me.dream);
      }
    };

    const handleGameStarted = (data: any) => {
      if (data && data.roomId === roomId) {
        onGameStarted(data);
      }
    };

    const handleError = (msg: string) => {
      setErrorMessage(msg);
      setTimeout(() => {
        setErrorMessage('');
        onLeave();
      }, 2500);
    };

    socket.on('sync_room_lobby', handleSyncLobby);
    socket.on('game_started', handleGameStarted);
    socket.on('error_message', handleError);

    const sendJoinAndSync = () => {
      socket.emit('get_room_lobby_state', { roomId });
      socket.emit('join_room', {
        roomId,
        playerProfile: {
          id: 'p_' + userId,
          userId,
          name: userName,
          color: null,
          profession: null,
          dream: selectedDream
        }
      });
    };

    if (socket.connected) {
      sendJoinAndSync();
    } else {
      socket.connect();
    }

    socket.on('connect', sendJoinAndSync);

    const interval = setInterval(() => {
      if (!roomData && socket.connected) {
        sendJoinAndSync();
      }
    }, 1200);

    return () => {
      socket.off('sync_room_lobby', handleSyncLobby);
      socket.off('game_started', handleGameStarted);
      socket.off('error_message', handleError);
      socket.off('connect', sendJoinAndSync);
      clearInterval(interval);
    };
  }, [roomId, userId, userName, roomData, onGameStarted, onLeave]);

  if (!roomData) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center p-4 space-y-4 bg-cover bg-center select-none"
        style={{
          backgroundImage: `radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.85) 100%), url('/table-bg.jpg')`
        }}
      >
        <div className="bg-[#240a2c] border-2 border-amber-500/40 p-6 rounded-3xl flex flex-col items-center space-y-3 shadow-2xl">
          <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-amber-300 font-mono text-sm tracking-wide">Подключение к лобби #{roomId}...</p>
          <button
            onClick={onLeave}
            className="bg-[#3b1247] hover:bg-[#4d175d] border border-amber-500/30 text-amber-200 px-4 py-2 rounded-xl text-xs font-bold transition mt-2 cursor-pointer"
          >
            ← Вернуться в список комнат
          </button>
        </div>
      </div>
    );
  }

  const isHost = roomData.hostId === userId;
  const players = roomData.players || [];

  const takenColorIds = players
    .filter((p: any) => p.userId !== userId && p.color)
    .map((p: any) => p.color.id);

  const takenProfIds = players
    .filter((p: any) => p.userId !== userId && p.profession)
    .map((p: any) => p.profession.id);

  const handlePickColor = (color: RatColor) => {
    if (takenColorIds.includes(color.id)) return;
    setSelectedColor(color);
    socket.emit('select_color', { roomId, userId, color });
  };

  const handlePickDream = (dream: Dream) => {
    setSelectedDream(dream);
    localStorage.setItem('cashflow_selected_dream', JSON.stringify(dream));
    socket.emit('select_dream', { roomId, userId, dream });
  };

  const handlePickProfession = (prof: Profession) => {
    if (takenProfIds.includes(prof.id)) return;
    setSelectedProfession(prof);
    setShowFullCardModal(true);
    socket.emit('select_profession', { roomId, userId, profession: prof });
  };

  const handleStartGame = () => {
    socket.emit('start_game', { roomId });
  };

  const allPlayersReady = players.length >= 1 && players.every((p: any) => p.color && p.profession);

  const totalExpenses = selectedProfession
    ? selectedProfession.taxes +
      selectedProfession.homeMortgagePayment +
      selectedProfession.carLoanPayment +
      selectedProfession.creditCardPayment +
      selectedProfession.otherExpenses
    : 0;

  const monthlyCashflow = selectedProfession
    ? selectedProfession.salary - totalExpenses
    : 0;

  return (
    <div 
      className="min-h-screen text-stone-100 flex flex-col p-3 sm:p-6 bg-cover bg-center select-none"
      style={{
        backgroundImage: `radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%), url('/table-bg.jpg')`
      }}
    >
      <div className="max-w-6xl w-full mx-auto space-y-4 flex-1 flex flex-col justify-between">
        {errorMessage && (
          <div className="bg-rose-700 border-2 border-rose-400 text-white font-bold px-4 py-2 rounded-xl text-xs text-center shadow-lg">
            {errorMessage}
          </div>
        )}

        {/* Хедер лобби */}
        <header className="bg-[#240a2c] border-2 border-amber-500/40 rounded-3xl p-4 sm:p-5 flex justify-between items-center shadow-xl">
          <div>
            <span className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider block">
              КОМНАТА ОЖИДАНИЯ • #{roomId}
            </span>
            <h2 className="text-xl font-black text-amber-300">{roomData.name}</h2>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-xs bg-[#3b1247] border border-amber-500/30 px-3 py-1.5 rounded-xl font-mono text-amber-300 font-bold">
              Игроки: {players.length}/{roomData.maxPlayers}
            </div>
            <button
              onClick={onLeave}
              className="text-xs text-stone-300 hover:text-rose-400 transition cursor-pointer font-bold"
            >
              Покинуть лобби
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 items-start">
          {/* Левая колонка: Игроки, Цвет крысы и Мечта */}
          <div className="lg:col-span-4 space-y-4">
            {/* 1. Список игроков */}
            <div className="bg-[#240a2c] border-2 border-amber-500/30 rounded-3xl p-4 space-y-3 shadow-md">
              <span className="text-xs font-bold text-amber-200 uppercase tracking-wider block font-mono">
                Участники в комнате:
              </span>
              <div className="space-y-2">
                {players.map((p: any) => (
                  <div
                    key={p.userId}
                    className="bg-[#19061f] border border-purple-900/60 p-2.5 rounded-2xl flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3.5 h-3.5 rounded-full ring-1 ring-white/50"
                        style={{ backgroundColor: p.color?.hex || '#64748b' }}
                      />
                      <span className="font-bold text-stone-100">
                        {p.name} {p.userId === userId && '(Вы)'}
                      </span>
                      {p.dream && <span title={p.dream.title}>{p.dream.icon}</span>}
                    </div>
                    <div className="text-[10px] font-mono">
                      {p.profession ? (
                        <span className="text-emerald-400 font-bold">Готов ✓</span>
                      ) : (
                        <span className="text-amber-300/80 italic">Готовится...</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Выбор цвета */}
            <div className="bg-[#240a2c] border-2 border-amber-500/30 rounded-3xl p-4 space-y-3 shadow-md">
              <span className="text-xs font-bold text-amber-200 uppercase tracking-wider block font-mono">
                1. Выберите цвет крысы:
              </span>
              <div className="grid grid-cols-5 gap-2">
                {RAT_COLORS.map((c) => {
                  const isTaken = takenColorIds.includes(c.id);
                  const isSelected = selectedColor?.id === c.id;

                  return (
                    <button
                      key={c.id}
                      onClick={() => handlePickColor(c)}
                      disabled={isTaken}
                      className={`h-10 rounded-xl flex items-center justify-center transition border-2 cursor-pointer ${
                        isSelected
                          ? 'border-amber-300 scale-110 shadow-lg ring-2 ring-amber-300/50'
                          : isTaken
                          ? 'opacity-20 border-transparent cursor-not-allowed grayscale'
                          : 'border-transparent hover:scale-105 opacity-90 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={isTaken ? 'Цвет занят' : c.name}
                    >
                      {isSelected && <span className="text-stone-950 font-black text-xs">✓</span>}
                      {isTaken && <span className="text-white text-xs">✕</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Выбор мечты */}
            <div className="bg-[#240a2c] border-2 border-amber-500/30 rounded-3xl p-4 space-y-2.5 shadow-md">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-amber-200 uppercase tracking-wider block font-mono">
                  2. Ваша мечта (Fast Track):
                </span>
                <span className="text-[10px] font-mono text-amber-300 font-bold bg-[#3b1247] px-2 py-0.5 rounded border border-amber-500/30">
                  {selectedDream.cost.toLocaleString()} $
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {DREAMS_LIST.map((dream) => {
                  const isSelected = selectedDream.id === dream.id;
                  return (
                    <button
                      key={dream.id}
                      type="button"
                      onClick={() => handlePickDream(dream)}
                      className={`p-2 rounded-xl border text-left transition flex items-center space-x-2 cursor-pointer ${
                        isSelected
                          ? 'border-amber-400 bg-[#4a154b] text-amber-200 shadow-md font-bold'
                          : 'border-purple-900/60 bg-[#19061f] hover:border-amber-500/40 text-stone-300'
                      }`}
                    >
                      <span className="text-lg">{dream.icon}</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-bold truncate">{dream.title}</div>
                        <div className="text-[9px] font-mono text-amber-300/80">{dream.cost.toLocaleString()}$</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Кнопка запуска */}
            {isHost && (
              <button
                onClick={handleStartGame}
                disabled={!allPlayersReady}
                className="w-full bg-amber-400 hover:bg-amber-300 active:scale-[0.98] disabled:bg-stone-800 disabled:text-stone-500 text-stone-950 font-black py-4 rounded-2xl text-sm transition shadow-lg shadow-amber-500/30 cursor-pointer uppercase tracking-wider"
              >
                {!allPlayersReady
                  ? 'ОЖИДАНИЕ ВЫБОРА ВСЕХ ИГРОКОВ...'
                  : 'НАЧАТЬ ИГРУ ДЛЯ ВСЕХ ➔'}
              </button>
            )}

            {!isHost && (
              <div className="bg-[#34113f] border border-amber-500/30 p-4 rounded-2xl text-center text-xs text-amber-200 font-bold animate-pulse">
                ⏳ Ожидание, пока создатель запустит партию...
              </div>
            )}
          </div>

          {/* Правая колонка: Профессии вслепую */}
          <div className="lg:col-span-8 bg-[#240a2c] border-2 border-amber-500/30 rounded-3xl p-5 space-y-4 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-amber-200 uppercase tracking-wider font-mono">
                  3. Выберите карточку профессии вслепую:
                </span>
                {selectedProfession && (
                  <button
                    onClick={() => setShowFullCardModal(true)}
                    className="text-xs font-mono text-amber-300 hover:underline font-bold cursor-pointer"
                  >
                    🔍 Посмотреть карту целиком
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {PROFESSIONS.map((prof, idx) => {
                  const isTaken = takenProfIds.includes(prof.id);
                  const isSelected = selectedProfession?.id === prof.id;

                  return (
                    <div
                      key={prof.id}
                      onClick={() => {
                        if (!isTaken && !selectedProfession) {
                          handlePickProfession(prof);
                        } else if (isSelected) {
                          setShowFullCardModal(true);
                        }
                      }}
                      className={`h-40 rounded-2xl border-2 flex flex-col items-center justify-center p-3 text-center transition cursor-pointer relative overflow-hidden ${
                        isSelected
                          ? 'bg-[#fcf9f2] border-amber-400 text-stone-950 shadow-2xl scale-105 ring-2 ring-amber-400/40'
                          : isTaken
                          ? 'bg-[#14041b] border-stone-800 opacity-20 cursor-not-allowed grayscale'
                          : 'bg-[#3b1247] border-amber-500/30 hover:border-amber-400 hover:scale-102 shadow-md'
                      }`}
                    >
                      {!isSelected && !isTaken && (
                        <div className="space-y-2 select-none">
                          <div className="w-10 h-10 mx-auto rounded-full bg-[#240a2c] border border-amber-400/40 flex items-center justify-center text-lg shadow-inner">
                            💼
                          </div>
                          <div className="font-mono text-xs font-bold text-amber-300">
                            КАРТА #{idx + 1}
                          </div>
                          <span className="text-[9px] text-stone-300 block uppercase font-bold">
                            Тянуть наугад
                          </span>
                        </div>
                      )}

                      {isTaken && (
                        <div className="text-stone-500 font-mono text-xs font-bold">
                          ВЫТЯНУТА ✕
                        </div>
                      )}

                      {isSelected && (
                        <div className="space-y-1.5 animate-in fade-in zoom-in-95 duration-200">
                          <span className="text-2xl">✨</span>
                          <div className="font-black text-xs text-[#4a154b] leading-tight">
                            {selectedProfession.title}
                          </div>
                          <div className="text-[10px] font-mono text-emerald-800 font-black">
                            Payday: +{monthlyCashflow}$
                          </div>
                          <span className="text-[9px] text-stone-600 block underline mt-1 font-semibold">
                            (Нажмите для аудита)
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {selectedProfession && (
              <div className="bg-[#fcf9f2] p-3.5 rounded-2xl border-2 border-stone-300 text-stone-900 flex flex-wrap items-center justify-between gap-3 shadow-md animate-in fade-in duration-150">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">📜</span>
                  <div>
                    <span className="text-[10px] font-mono text-[#4a154b] font-bold uppercase block">
                      Ваша профессия:
                    </span>
                    <span className="text-sm font-black text-stone-950">{selectedProfession.title}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs font-mono">
                  <div>ЗП: <strong className="text-stone-900">{selectedProfession.salary}$</strong></div>
                  <div>Кэшфлоу: <strong className="text-emerald-800 font-bold">+{monthlyCashflow}$</strong></div>
                  <button
                    onClick={() => setShowFullCardModal(true)}
                    className="bg-[#4a154b] hover:bg-[#5e1b5f] text-amber-200 px-3.5 py-1.5 rounded-xl font-sans text-xs font-bold cursor-pointer border border-amber-400/30 uppercase tracking-wider shadow"
                  >
                    Развернуть отчёт ➔
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Модальное окно полного финансового отчета выбранной карточки */}
      {showFullCardModal && selectedProfession && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="bg-[#fcf9f2] border-2 border-stone-300 w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-5 text-stone-900 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b-2 border-stone-300 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#4a154b] font-bold block">
                  ФИНАНСОВЫЙ ОТЧЕТ ИГРОКА
                </span>
                <h3 className="text-2xl font-black text-stone-950">{selectedProfession.title}</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#f4efe4] border border-stone-300 flex items-center justify-center text-2xl shadow-sm">
                💼
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="bg-[#f4efe4] p-3 rounded-2xl border border-stone-300 shadow-sm">
                <span className="text-[10px] text-stone-600 block uppercase font-sans font-bold">Зарплата (Salary)</span>
                <span className="text-lg font-black text-emerald-800">+{selectedProfession.salary.toLocaleString()} $</span>
              </div>
              <div className="bg-[#f4efe4] p-3 rounded-2xl border border-stone-300 shadow-sm">
                <span className="text-[10px] text-stone-600 block uppercase font-sans font-bold">Сбережения (Savings)</span>
                <span className="text-lg font-black text-stone-900">{selectedProfession.savings.toLocaleString()} $</span>
              </div>
            </div>

            <div className="bg-[#f4efe4] p-4 rounded-2xl border border-stone-300 space-y-2 text-xs font-mono shadow-sm">
              <div className="flex justify-between items-center text-rose-800 font-bold border-b border-stone-300 pb-1.5 font-sans">
                <span>🔴 Ежемесячные расходы:</span>
                <span className="font-mono">-{totalExpenses.toLocaleString()} $</span>
              </div>

              <div className="flex justify-between text-stone-700">
                <span>Налоги (Taxes):</span>
                <span className="text-stone-900 font-bold">-{selectedProfession.taxes.toLocaleString()} $</span>
              </div>
              <div className="flex justify-between text-stone-700">
                <span>Ипотека на дом:</span>
                <span className="text-stone-900 font-bold">-{selectedProfession.homeMortgagePayment.toLocaleString()} $</span>
              </div>
              <div className="flex justify-between text-stone-700">
                <span>Кредит на авто:</span>
                <span className="text-stone-900 font-bold">-{selectedProfession.carLoanPayment.toLocaleString()} $</span>
              </div>
              <div className="flex justify-between text-stone-700">
                <span>Кредитные карты:</span>
                <span className="text-stone-900 font-bold">-{selectedProfession.creditCardPayment.toLocaleString()} $</span>
              </div>
              <div className="flex justify-between text-stone-700">
                <span>Прочие расходы:</span>
                <span className="text-stone-900 font-bold">-{selectedProfession.otherExpenses.toLocaleString()} $</span>
              </div>
              <div className="flex justify-between text-amber-800 pt-1 border-t border-stone-300 font-bold">
                <span>Расход на 1 ребенка:</span>
                <span>+{selectedProfession.childExpensePerCount.toLocaleString()} $/мес</span>
              </div>
            </div>

            <div className="bg-[#240a2c] border border-amber-400/40 p-3.5 rounded-2xl flex justify-between items-center font-mono shadow-inner">
              <div>
                <span className="text-[10px] text-amber-300 uppercase font-sans font-bold block">
                  Чистый стартовый Payday (Поток):
                </span>
                <span className="text-xs text-stone-300">Зарплата минус Все Расходы</span>
              </div>
              <span className="text-xl font-black text-amber-300">
                +{monthlyCashflow.toLocaleString()} $
              </span>
            </div>

            <button
              onClick={() => setShowFullCardModal(false)}
              className="w-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-black py-3.5 rounded-2xl text-sm transition shadow-lg shadow-amber-500/25 cursor-pointer uppercase tracking-wider"
            >
              ПОНЯТНО, ПРИНЯТЬ КАРТОЧКУ ➔
            </button>
          </div>
        </div>
      )}
    </div>
  );
};