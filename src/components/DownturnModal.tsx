import type { FC } from 'react';

interface DownturnModalProps {
  totalExpenses: number;
  onConfirm: () => void;
}

export const DownturnModal: FC<DownturnModalProps> = ({ totalExpenses, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-purple-500/50 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-start border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block">
              🛑 КЛЕТКА «УВОЛЬНЕНИЕ»
            </span>
            <h3 className="text-lg font-black text-slate-100">Сокращение штата!</h3>
          </div>
          <span className="text-3xl">📦</span>
        </div>

        <p className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 leading-relaxed">
          Вас временно сократили. Вы обязаны выплатить банку сумму всех ваших ежемесячных расходов и пропустить <strong>2 хода</strong>.
        </p>

        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex justify-between items-center text-xs">
          <span className="text-slate-400 font-semibold">Сумма к списанию (Все расходы):</span>
          <span className="text-base font-black font-mono text-rose-400">
            -{totalExpenses.toLocaleString()} $
          </span>
        </div>

        <button
          onClick={onConfirm}
          className="w-full bg-purple-600 hover:bg-purple-500 active:scale-95 transition py-3.5 rounded-xl text-xs sm:text-sm font-black text-white shadow-lg shadow-purple-600/20 cursor-pointer"
        >
          ПРИНЯТЬ И ПРОПУСТИТЬ ХОДЫ ➔
        </button>
      </div>
    </div>
  );
};