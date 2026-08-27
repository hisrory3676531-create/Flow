import { useState } from 'react';
import type { FC } from 'react';
import type { Player } from '../types/game.types';

interface BankModalProps {
  player: Player;
  onTakeLoan: (amount: number) => void;
  onPayLoan: (amount: number) => void;
  onPayOffLiability: (type: 'CREDIT_CARD' | 'CAR_LOAN' | 'HOME_MORTGAGE', cost: number, paymentReduction: number) => void;
  onClose: () => void;
}

export const BankModal: FC<BankModalProps> = ({
  player,
  onTakeLoan,
  onPayLoan,
  onPayOffLiability,
  onClose
}) => {
  const { profession, financials, cash } = player;

  // Если bankDebt по какой-то причине равен 0, но есть платеж банку, восстанавливаем сумму долга (платеж / 0.1)
  const actualBankDebt = Math.max(player.bankDebt || 0, (financials.bankLoanPayment || 0) * 10);

  const [loanInput, setLoanInput] = useState<number>(1000);
  const [payInput, setPayInput] = useState<number>(actualBankDebt > 0 ? actualBankDebt : 1000);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 text-slate-100 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        <div className="flex justify-between items-start border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
              🏦 БАНК И ФИНАНСОВЫЕ ОБЯЗАТЕЛЬСТВА
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-100">Управление кредитами и долгами</h3>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 text-lg cursor-pointer">✕</button>
        </div>

        {/* Долг перед банком */}
        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Текущий банковский кредит:</span>
            <span className="text-sm sm:text-base font-black font-mono text-amber-400">{actualBankDebt.toLocaleString()} $</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Платеж банку (10%/мес):</span>
            <span className="text-sm sm:text-base font-black font-mono text-rose-400">-{financials.bankLoanPayment.toLocaleString()} $/мес</span>
          </div>
        </div>

        {/* Погасить взятый банковский кредит (отображается, если есть долг или есть платеж) */}
        {(actualBankDebt > 0 || financials.bankLoanPayment > 0) && (
          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-blue-900/40 space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-blue-300">Погасить кредит банку:</span>
              <span className="text-[11px] text-slate-400">Снизит траты на: -{Math.round(payInput * 0.1).toLocaleString()} $/мес</span>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min={1000}
                max={actualBankDebt}
                step={1000}
                value={payInput}
                onChange={(e) => setPayInput(Math.min(actualBankDebt, Math.max(1000, parseInt(e.target.value) || 0)))}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => onPayLoan(payInput)}
                disabled={cash < payInput}
                className="bg-blue-500 hover:bg-blue-400 disabled:bg-slate-800 disabled:text-slate-600 text-white font-black px-4 py-2 rounded-xl text-xs transition cursor-pointer shrink-0 shadow-lg shadow-blue-500/20"
              >
                ПОГАСИТЬ ({payInput.toLocaleString()}$)
              </button>
            </div>
          </div>
        )}

        {/* Секция: Погашение стартовых пассивов профессии */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Погашение стартовых пассивов (Снижают обязательные расходы):
          </span>

          <div className="space-y-2">
            {/* Кредитная карта */}
            {profession.creditCardDebt > 0 && financials.creditCardPayment > 0 && (
              <div className="bg-slate-950 p-2.5 sm:p-3 rounded-2xl border border-slate-800 flex items-center justify-between gap-2 text-xs">
                <div>
                  <div className="font-bold text-slate-200">Кредитные карты</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Долг: <strong className="text-amber-400">{profession.creditCardDebt.toLocaleString()} $</strong> | Платеж: <strong className="text-rose-400">-{financials.creditCardPayment} $/мес</strong>
                  </div>
                </div>
                <button
                  onClick={() => onPayOffLiability('CREDIT_CARD', profession.creditCardDebt, financials.creditCardPayment)}
                  disabled={cash < profession.creditCardDebt}
                  className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-black px-3 py-1.5 rounded-xl text-xs transition cursor-pointer shrink-0"
                >
                  ПОГАСИТЬ ({profession.creditCardDebt}$)
                </button>
              </div>
            )}

            {/* Автокредит */}
            {profession.carDebt > 0 && financials.carLoanPayment > 0 && (
              <div className="bg-slate-950 p-2.5 sm:p-3 rounded-2xl border border-slate-800 flex items-center justify-between gap-2 text-xs">
                <div>
                  <div className="font-bold text-slate-200">Автомобильный кредит</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Долг: <strong className="text-amber-400">{profession.carDebt.toLocaleString()} $</strong> | Платеж: <strong className="text-rose-400">-{financials.carLoanPayment} $/мес</strong>
                  </div>
                </div>
                <button
                  onClick={() => onPayOffLiability('CAR_LOAN', profession.carDebt, financials.carLoanPayment)}
                  disabled={cash < profession.carDebt}
                  className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-black px-3 py-1.5 rounded-xl text-xs transition cursor-pointer shrink-0"
                >
                  ПОГАСИТЬ ({profession.carDebt}$)
                </button>
              </div>
            )}

            {/* Ипотека на дом */}
            {profession.homeDebt > 0 && financials.homeMortgagePayment > 0 && (
              <div className="bg-slate-950 p-2.5 sm:p-3 rounded-2xl border border-slate-800 flex items-center justify-between gap-2 text-xs">
                <div>
                  <div className="font-bold text-slate-200">Ипотека на личный дом</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Долг: <strong className="text-amber-400">{profession.homeDebt.toLocaleString()} $</strong> | Платеж: <strong className="text-rose-400">-{financials.homeMortgagePayment} $/мес</strong>
                  </div>
                </div>
                <button
                  onClick={() => onPayOffLiability('HOME_MORTGAGE', profession.homeDebt, financials.homeMortgagePayment)}
                  disabled={cash < profession.homeDebt}
                  className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-black px-3 py-1.5 rounded-xl text-xs transition cursor-pointer shrink-0"
                >
                  ПОГАСИТЬ ({profession.homeDebt.toLocaleString()}$)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Взять кредит */}
        <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 space-y-2.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-200">Взять кредит (шаг 1 000 $):</span>
            <span className="text-[11px] text-slate-400">Платеж: +{Math.round(loanInput * 0.1).toLocaleString()} $/мес</span>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min={1000}
              step={1000}
              value={loanInput}
              onChange={(e) => setLoanInput(Math.max(1000, parseInt(e.target.value) || 0))}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={() => onTakeLoan(loanInput)}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition cursor-pointer shrink-0 shadow-lg shadow-emerald-500/20"
            >
              ПОЛУЧИТЬ КЭШ
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-slate-800 hover:bg-slate-700 py-2.5 rounded-xl text-xs font-bold text-slate-300 transition cursor-pointer"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};