import type { FC } from 'react';
import type { Player } from '../types/game.types';

interface FastTrackTransitionModalProps {
  player: Player;
  onEnterFastTrack: () => void;
}

export const FastTrackTransitionModal: FC<FastTrackTransitionModalProps> = ({
  player,
  onEnterFastTrack
}) => {
  const passive = player.financials.passiveIncome;
  const newFastIncome = passive * 10;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-gradient-to-b from-[#1e1035] to-[#0d041a] border-2 border-amber-400/80 rounded-3xl p-5 sm:p-7 max-w-md w-full shadow-2xl text-center relative overflow-hidden">
        <div className="w-16 h-16 bg-amber-400/20 border border-amber-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-3 animate-bounce shadow-lg shadow-amber-500/30">
          🚀
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-amber-300 uppercase tracking-wide">
          Вы вышли из крысиных бегов!
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 mt-2">
          Ваш пассивный доход (<span className="text-emerald-400 font-bold">${passive.toLocaleString()}</span>) превысил расходы! Теперь вы переходите на <span className="text-amber-400 font-bold">Скоростную дорожку (Fast Track)</span>.
        </p>

        <div className="my-4 bg-slate-900/90 border border-purple-500/40 rounded-2xl p-3 text-left space-y-2 text-xs">
          <div className="flex justify-between items-center text-slate-300">
            <span>Стартовый Fast Track доход (x10):</span>
            <span className="font-mono font-black text-emerald-400 text-sm">
              +${newFastIncome.toLocaleString()}/ход
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span>Наличные на руках:</span>
            <span className="font-mono font-bold text-amber-300">
              ${player.cash.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span>Условие финальной победы:</span>
            <span className="font-bold text-purple-300">
              Попасть на Мечту или +$50,000 к потоку
            </span>
          </div>
        </div>

        <button
          onClick={onEnterFastTrack}
          className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm rounded-xl shadow-lg transition transform active:scale-95 cursor-pointer uppercase tracking-wider"
        >
          Выйти на Скоростную дорожку ➔
        </button>
      </div>
    </div>
  );
};