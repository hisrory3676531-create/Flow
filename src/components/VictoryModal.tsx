import type { FC } from 'react';
import type { Player } from '../types/game.types';

interface VictoryModalProps {
  player: Player;
  winnerName?: string;
  dreamTitle?: string;
  winReason?: string;
  isMeWinner?: boolean;
  onRestart?: () => void;
  onContinue?: () => void;
}

export const VictoryModal: FC<VictoryModalProps> = ({
  player,
  winnerName,
  dreamTitle,
  winReason,
  isMeWinner = true,
  onRestart,
  onContinue
}) => {
  const winner = winnerName || player.name;
  const reason =
    winReason ||
    (dreamTitle
      ? `Выкупил свою мечту «${dreamTitle}»!`
      : 'Увеличил денежный поток на Скоростной дорожке на +$50,000/ход!');

  const handleClose = () => {
    if (onRestart) {
      onRestart();
    } else if (onContinue) {
      onContinue();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-lg flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-[#2a1045] via-[#1a0830] to-[#0d031c] border-2 border-amber-400 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-center text-slate-100 animate-in fade-in zoom-in-95 duration-300 relative overflow-hidden">
        
        {/* Анимационный кубок */}
        <div className="relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-amber-500 to-amber-300 rounded-full flex items-center justify-center text-5xl sm:text-6xl mx-auto shadow-2xl shadow-amber-500/50 animate-bounce">
            🏆
          </div>
          <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse pointer-events-none" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block">
            {isMeWinner ? '🎉 АБСОЛЮТНАЯ ПОБЕДА!' : '🏁 МАТЧ ЗАВЕРШЕН'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {isMeWinner ? 'ВЫ ПОБЕДИЛИ В ИГРЕ!' : `ПОБЕДИТЕЛЬ: ${winner.toUpperCase()}`}
          </h2>
        </div>

        {/* Сводка условий победы */}
        <div className="bg-slate-950/80 border border-purple-800/60 p-4 rounded-2xl text-xs sm:text-sm space-y-2 text-left font-mono">
          <div className="flex justify-between items-center text-slate-300">
            <span className="text-slate-400">Игрок:</span>
            <span className="font-bold text-amber-300 text-base">{winner}</span>
          </div>
          <div className="border-t border-slate-800 pt-2 text-slate-300">
            <span className="text-slate-400 block text-xs">Достижение:</span>
            <span className="font-bold text-emerald-400 text-xs sm:text-sm leading-relaxed block mt-0.5">
              {reason}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-400 px-2 leading-relaxed">
          {isMeWinner
            ? 'Вы успешно построили финансовую империю, обошли конкурентов и достигли своей главной цели!'
            : 'Один из участников реализовал свою цель и победил в текущей сессии.'}
        </p>

        {/* Кнопка выхода в главное меню */}
        <button
          onClick={handleClose}
          className="w-full py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 active:scale-95 transition rounded-2xl text-sm font-black text-slate-950 shadow-xl shadow-amber-500/20 cursor-pointer uppercase tracking-wider"
        >
          В главное меню (В лобби) ➔
        </button>
      </div>
    </div>
  );
};