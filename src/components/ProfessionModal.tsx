import type { FC } from 'react';
import type { Profession } from '../types/game.types';
import { FINANCIAL_TOOLTIPS } from '../data/tooltips.data';
import { Tooltip } from './Tooltip';

interface ProfessionModalProps {
  profession: Profession;
  onConfirm: () => void;
}

export const ProfessionModal: FC<ProfessionModalProps> = ({ profession, onConfirm }) => {
  const totalExpenses =
    profession.taxes +
    profession.homeMortgagePayment +
    profession.carLoanPayment +
    profession.creditCardPayment +
    profession.otherExpenses;

  const netCashflow = profession.salary - totalExpenses;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Шапка карточки */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
              Ваша профессия
            </span>
            <h2 className="text-xl font-black text-slate-100">{profession.title}</h2>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end space-x-1">
              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Стартовый кэш</span>
              <Tooltip text={FINANCIAL_TOOLTIPS.savings} />
            </div>
            <span className="text-base font-extrabold text-emerald-400 font-mono">
              {profession.savings.toLocaleString()} $
            </span>
          </div>
        </div>

        {/* Доходы и Расходы */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Доходы */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">🟢 Доходы</span>
              <Tooltip text={FINANCIAL_TOOLTIPS.totalIncome} />
            </div>

            <div className="flex justify-between items-center text-slate-300">
              <div className="flex items-center space-x-1">
                <span>Зарплата:</span>
                <Tooltip text={FINANCIAL_TOOLTIPS.salary} />
              </div>
              <span className="font-mono font-bold text-slate-200">{profession.salary.toLocaleString()} $</span>
            </div>

            <div className="flex justify-between items-center text-slate-300">
              <div className="flex items-center space-x-1">
                <span>Пассивный доход:</span>
                <Tooltip text={FINANCIAL_TOOLTIPS.passiveIncome} />
              </div>
              <span className="font-mono font-bold text-slate-500">0 $</span>
            </div>

            <div className="border-t border-slate-800 pt-1.5 flex justify-between font-bold text-slate-200">
              <span>Итого доход:</span>
              <span className="font-mono text-emerald-400">{profession.salary.toLocaleString()} $</span>
            </div>
          </div>

          {/* Расходы */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-rose-400 font-bold uppercase tracking-wider text-[10px]">🔴 Расходы</span>
              <Tooltip text={FINANCIAL_TOOLTIPS.totalExpenses} />
            </div>

            <div className="flex justify-between items-center text-slate-400">
              <div className="flex items-center space-x-1">
                <span>Налоги:</span>
                <Tooltip text={FINANCIAL_TOOLTIPS.taxes} />
              </div>
              <span className="font-mono text-slate-200">{profession.taxes.toLocaleString()} $</span>
            </div>

            <div className="flex justify-between items-center text-slate-400">
              <div className="flex items-center space-x-1">
                <span>Ипотека:</span>
                <Tooltip text={FINANCIAL_TOOLTIPS.homeMortgage} />
              </div>
              <span className="font-mono text-slate-200">{profession.homeMortgagePayment.toLocaleString()} $</span>
            </div>

            <div className="flex justify-between items-center text-slate-400">
              <div className="flex items-center space-x-1">
                <span>Автокредит:</span>
                <Tooltip text={FINANCIAL_TOOLTIPS.carLoan} />
              </div>
              <span className="font-mono text-slate-200">{profession.carLoanPayment.toLocaleString()} $</span>
            </div>

            <div className="flex justify-between items-center text-slate-400">
              <div className="flex items-center space-x-1">
                <span>Прочие траты:</span>
                <Tooltip text={FINANCIAL_TOOLTIPS.otherExpenses} />
              </div>
              <span className="font-mono text-slate-200">{profession.otherExpenses.toLocaleString()} $</span>
            </div>

            <div className="border-t border-slate-800 pt-1 flex justify-between font-bold text-slate-200">
              <span>Всего расходов:</span>
              <span className="font-mono text-rose-400">{totalExpenses.toLocaleString()} $</span>
            </div>
          </div>
        </div>

        {/* Долги / Пассивы */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">💳 Пассивы (Долги)</span>
            <Tooltip text={FINANCIAL_TOOLTIPS.homeDebt} />
          </div>
          <div className="grid grid-cols-2 gap-2 text-slate-400 text-[11px]">
            <div>Ипотека: <span className="font-mono text-slate-200">{profession.homeDebt.toLocaleString()} $</span></div>
            <div>Автокредит: <span className="font-mono text-slate-200">{profession.carDebt.toLocaleString()} $</span></div>
          </div>
        </div>

        {/* Cashflow */}
        <div className="bg-emerald-950/40 border border-emerald-800/80 p-3 rounded-xl flex justify-between items-center text-xs">
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-300 font-medium">Денежный поток (Payday):</span>
            <Tooltip text={FINANCIAL_TOOLTIPS.cashflow} />
          </div>
          <span className="text-base font-black text-emerald-400 font-mono">
            +{netCashflow.toLocaleString()} $
          </span>
        </div>

        {/* Кнопка подтверждения */}
        <button
          onClick={onConfirm}
          className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] transition text-slate-950 font-black py-3 rounded-xl text-sm shadow-lg shadow-emerald-500/20 cursor-pointer"
        >
          ПРИНЯТЬ ПРОФЕССИЮ И НАЧАТЬ ИГРУ ➔
        </button>
      </div>
    </div>
  );
};