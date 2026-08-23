import type { FC } from 'react';
import type { Player } from '../types/game.types';

interface VictoryModalProps {
  player: Player;
  onContinue: () => void;
}

export const VictoryModal: FC<VictoryModalProps> = ({ player, onContinue }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-lg flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 border-2 border-amber-400/80 w-full max-w-lg rounded-3xl p-8 shadow-2xl space-y-6 text-center text-slate-100 animate-in fade-in zoom-in-95 duration-300">
        <div className="text-6xl animate-bounce">🏆</div>
        
        <div className="space-y-2">
          <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block">
            ПОБЕДА НА МАЛОМ КРУГЕ!
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100">
            ВЫ ВЫРВАЛИСЬ ИЗ КРЫСИНЫХ БЕГОВ!
          </h2>
          <p className="text-xs text-slate-300">
            Ваш пассивный доход (<strong className="text-emerald-400">{player.financials.passiveIncome.toLocaleString()} $</strong>) превысил общие расходы (<strong className="text-rose-400">{player.financials.totalExpenses.toLocaleString()} $</strong>).
          </p>
        </div>

        <div className="bg-slate-950/80 border border-amber-500/30 p-4 rounded-2xl font-mono text-xs text-amber-300">
          Теперь вы финансово свободны и переходите на Скоростную дорожку (Fast Track)!
        </div>

        <button
          onClick={onContinue}
          className="w-full bg-amber-400 hover:bg-amber-300 active:scale-95 transition py-4 rounded-2xl text-sm font-black text-slate-950 shadow-xl shadow-amber-500/20 cursor-pointer"
        >
          ВЫЙТИ НА СКОРОСТНУЮ ДОРОЖКУ ➔
        </button>
      </div>
    </div>
  );
};