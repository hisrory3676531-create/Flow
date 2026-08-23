import type { FC } from 'react';

interface CharityModalProps {
  totalIncome: number;
  playerCash: number;
  onDonate: (amount: number) => void;
  onPass: () => void;
}

export const CharityModal: FC<CharityModalProps> = ({
  totalIncome,
  playerCash,
  onDonate,
  onPass
}) => {
  const donationCost = Math.round(totalIncome * 0.1);
  const canAfford = playerCash >= donationCost;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-teal-500/50 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-start border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 font-bold block">
              🤝 БЛАГОТВОРИТЕЛЬНОСТЬ
            </span>
            <h3 className="text-lg font-black text-slate-100">Пожертвование в фонд</h3>
          </div>
          <span className="text-3xl">🕊️</span>
        </div>

        <p className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 leading-relaxed">
          Пожертвуйте <strong>10% от вашего общего дохода</strong>, чтобы получить право следующие <strong>3 хода</strong> бросать сразу <strong>2 кубика</strong> на выбор!
        </p>

        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex justify-between items-center text-xs">
          <span className="text-slate-400 font-semibold">Сумма пожертвования:</span>
          <span className="text-base font-black font-mono text-teal-400">
            {donationCost.toLocaleString()} $
          </span>
        </div>

        {!canAfford && (
          <div className="text-xs text-rose-400 font-semibold text-center">
            У вас недостаточно средств ({playerCash.toLocaleString()} $)
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={onPass}
            className="w-full bg-slate-800 hover:bg-slate-700 active:scale-95 transition py-3 rounded-xl text-xs font-bold text-slate-300 cursor-pointer"
          >
            Отказаться
          </button>

          <button
            onClick={() => onDonate(donationCost)}
            disabled={!canAfford}
            className="w-full bg-teal-500 hover:bg-teal-400 disabled:bg-slate-800 disabled:text-slate-600 active:scale-95 transition py-3 rounded-xl text-xs font-black text-slate-950 shadow-lg shadow-teal-500/20 cursor-pointer"
          >
            ПОЖЕРТВОВАТЬ ➔
          </button>
        </div>
      </div>
    </div>
  );
};