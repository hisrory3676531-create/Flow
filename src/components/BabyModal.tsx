import type { FC } from 'react';

interface BabyModalProps {
  childCount: number;
  childExpense: number;
  onConfirm: () => void;
}

export const BabyModal: FC<BabyModalProps> = ({ childCount, childExpense, onConfirm }) => {
  const isMaxReached = childCount >= 3;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-pink-500/50 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-start border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-pink-400 font-bold block">
              👶 ПОПОЛНЕНИЕ В СЕМЬЕ!
            </span>
            <h3 className="text-lg font-black text-slate-100">
              {isMaxReached ? 'Семья уже укомплектована' : 'Поздравляем с новорожденным!'}
            </h3>
          </div>
          <span className="text-3xl">🍼</span>
        </div>

        {!isMaxReached ? (
          <>
            <p className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 leading-relaxed">
              В вашей семье родился ребенок (теперь у вас: <strong>{childCount + 1} из 3</strong>). Ежемесячные расходы навсегда увеличиваются на сумму содержания ребенка.
            </p>

            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">Увеличение расходов:</span>
              <span className="text-base font-black font-mono text-rose-400">
                +{childExpense.toLocaleString()} $ / мес
              </span>
            </div>
          </>
        ) : (
          <p className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 leading-relaxed">
            У вас уже <strong>3 ребенка</strong> (максимум по правилам игры). Новые дети больше не добавляют расходов!
          </p>
        )}

        <button
          onClick={onConfirm}
          className="w-full bg-pink-500 hover:bg-pink-400 active:scale-95 transition py-3.5 rounded-xl text-xs sm:text-sm font-black text-slate-950 shadow-lg shadow-pink-500/20 cursor-pointer"
        >
          {isMaxReached ? 'ПРОДОЛЖИТЬ ИГРУ' : 'ПРИНЯТЬ РАСХОДЫ И ПРОДОЛЖИТЬ ➔'}
        </button>
      </div>
    </div>
  );
};