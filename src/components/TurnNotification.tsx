import { useEffect, useState } from 'react';
import type { FC } from 'react';

interface TurnNotificationProps {
  playerName: string;
  isMyTurn: boolean;
}

export const TurnNotification: FC<TurnNotificationProps> = ({ playerName, isMyTurn }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (playerName) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [playerName]);

  if (!visible) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-200">
      <div
        className={`px-8 py-3.5 rounded-2xl shadow-2xl border-2 flex items-center space-x-3 backdrop-blur-md ${
          isMyTurn
            ? 'bg-amber-500/90 border-white text-slate-950 shadow-amber-500/40'
            : 'bg-slate-900/90 border-purple-500/60 text-slate-100 shadow-purple-900/50'
        }`}
      >
        <span className="text-2xl">{isMyTurn ? '🎯' : '⏳'}</span>
        <div>
          <span className="text-[10px] uppercase tracking-widest font-mono font-bold block opacity-80">
            {isMyTurn ? 'Ваш черед делать ход!' : 'Передача хода'}
          </span>
          <span className="text-base font-black tracking-wide">
            {isMyTurn ? 'ВАШ ХОД' : `Ходит: ${playerName}`}
          </span>
        </div>
      </div>
    </div>
  );
};