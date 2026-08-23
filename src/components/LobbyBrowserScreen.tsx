import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { socket } from '../services/socket';

export interface RoomSummary {
  roomId: string;
  name: string;
  hostName: string;
  playersCount: number;
  maxPlayers: number;
  autoPayday: boolean;
  gameStarted: boolean;
}

interface LobbyBrowserScreenProps {
  userName: string;
  userId: string;
  onJoinRoom: (roomId: string) => void;
  onCreateRoom: (params: { roomId: string; roomName: string; maxPlayers: number; autoPayday: boolean }) => void;
  onBack: () => void;
}

export const LobbyBrowserScreen: FC<LobbyBrowserScreenProps> = ({
  userName,
  onJoinRoom,
  onCreateRoom,
  onBack
}) => {
  const [rooms, setRooms] = useState<RoomSummary[]>([]);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>(`Партия ${userName}`);
  const [maxPlayers, setMaxPlayers] = useState<number>(4);
  const [autoPayday, setAutoPayday] = useState<boolean>(true);
  const [customRoomId, setCustomRoomId] = useState<string>('');

  useEffect(() => {
    socket.emit('get_rooms');

    socket.on('rooms_list', (list: RoomSummary[]) => {
      setRooms(list);
    });

    return () => {
      socket.off('rooms_list');
    };
  }, []);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = customRoomId.trim().toUpperCase() || 'ROOM-' + Math.floor(1000 + Math.random() * 9000);
    onCreateRoom({
      roomId: generatedId,
      roomName,
      maxPlayers,
      autoPayday
    });
  };

  return (
    <div className="min-h-screen bg-[#130620] flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-purple-900/60 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-start border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-purple-950/80 border border-purple-700/50 px-3 py-1 rounded-full text-purple-300 text-xs font-mono mb-1">
              <span>🌐 МУЛЬТИПЛЕЕР CASHFLOW</span>
            </div>
            <h2 className="text-2xl font-black text-slate-100">Игровые комнаты</h2>
            <p className="text-xs text-slate-400">Игрок: <strong className="text-amber-400">{userName}</strong></p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black px-4 py-2.5 rounded-2xl text-xs transition shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            + СОЗДАТЬ КОМНАТУ
          </button>
        </div>

        <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
          {rooms.length === 0 ? (
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center space-y-2">
              <span className="text-3xl">📭</span>
              <p className="text-xs text-slate-400">Нет активных комнат. Создайте свою первую комнату!</p>
            </div>
          ) : (
            rooms.map((r) => {
              const isFull = r.playersCount >= r.maxPlayers;
              const canJoin = !isFull && !r.gameStarted;

              return (
                <div
                  key={r.roomId}
                  className="bg-slate-950 border border-slate-800 hover:border-purple-600/60 p-4 rounded-2xl flex items-center justify-between transition gap-3"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-200 text-sm">{r.name}</span>
                      <span className="text-[10px] font-mono bg-purple-950 border border-purple-800/80 px-2 py-0.5 rounded-full text-purple-300">
                        #{r.roomId}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 flex items-center space-x-3">
                      <span>Создатель: <strong className="text-slate-300">{r.hostName}</strong></span>
                      <span>ЗП: <strong className={r.autoPayday ? 'text-emerald-400' : 'text-amber-400'}>{r.autoPayday ? 'Авто' : 'Ручная'}</strong></span>
                      <span>Игроки: <strong className="text-amber-400">{r.playersCount}/{r.maxPlayers}</strong></span>
                    </div>
                  </div>

                  <button
                    onClick={() => onJoinRoom(r.roomId)}
                    disabled={!canJoin}
                    className="bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-black px-4 py-2 rounded-xl text-xs transition cursor-pointer shrink-0"
                  >
                    {r.gameStarted ? 'ИГРА ИДЕТ' : isFull ? 'МЕСТ НЕТ' : 'ВОЙТИ ➔'}
                  </button>
                </div>
              );
            })
          )}
        </div>

        <button
          onClick={onBack}
          className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-300 transition cursor-pointer text-center"
        >
          ← Назад в профиль
        </button>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-purple-800 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 text-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-black text-amber-300">Параметры новой комнаты</h3>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Название комнаты:</label>
                <input
                  type="text"
                  required
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Код комнаты (опционально):</label>
                <input
                  type="text"
                  placeholder="Оставьте пустым для авто-генерации"
                  value={customRoomId}
                  onChange={(e) => setCustomRoomId(e.target.value.toUpperCase())}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-amber-300 uppercase focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Лимит игроков:</span>
                  <span className="text-amber-400">{maxPlayers} чел</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={10}
                  step={1}
                  value={maxPlayers}
                  onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-200 block">Авто-получение Payday (ЗП)</span>
                  <span className="text-[10px] text-slate-400">{autoPayday ? 'Автоматически' : 'Кнопка вручную'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoPayday(!autoPayday)}
                  className={`w-10 h-5 flex items-center rounded-full p-0.5 transition cursor-pointer ${
                    autoPayday ? 'bg-emerald-500 justify-end' : 'bg-slate-800 justify-start'
                  }`}
                >
                  <div className="bg-white w-4 h-4 rounded-full shadow-md" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="bg-slate-800 hover:bg-slate-700 py-2.5 rounded-xl text-xs font-bold text-slate-300 cursor-pointer"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-2.5 rounded-xl text-xs cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  СОЗДАТЬ ЛОББИ ➔
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};