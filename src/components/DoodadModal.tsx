import type { FC } from 'react';
import type { DoodadCard } from '../data/cards.data';

interface DoodadModalProps {
  card: DoodadCard;
  playerCash: number;
  onPay: (amount: number) => void;
}

export const DoodadModal: FC<DoodadModalProps> = ({ card, playerCash, onPay }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-rose-900/60 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-start border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold block">
              💸 ВСЯКАЯ ВСЯЧИНА (РАСХОДЫ)
            </span>
            <h3 className="text-lg font-black text-slate-100">{card.title}</h3>
          </div>
          <span className="text-3xl">🛍️</span>
        </div>

        <p className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 leading-relaxed">
          {card.description}
        </p>

        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex justify-between items-center">
          <span className="text-xs text-slate-400 font-semibold">Сумма к оплате:</span>
          <span className="text-lg font-black font-mono text-rose-400">-{card.cost.toLocaleString()} $</span>
        </div>

        <button
          onClick={() => onPay(card.cost)}
          className="w-full bg-rose-500 hover:bg-rose-400 active:scale-95 transition py-3.5 rounded-xl text-xs sm:text-sm font-black text-slate-950 shadow-lg shadow-rose-500/20 cursor-pointer"
        >
          ОПЛАТИТЬ РАСХОД ➔
        </button>
      </div>
    </div>
  );
};