import type { FC } from 'react';

interface DealTradeIncomingModalProps {
  tradeOffer: any;
  playerCash: number;
  onAccept: () => void;
  onDecline: () => void;
}

export const DealTradeIncomingModal: FC<DealTradeIncomingModalProps> = ({
  tradeOffer,
  playerCash,
  onAccept,
  onDecline
}) => {
  if (!tradeOffer) return null;

  const { fromName, deal, fee } = tradeOffer;
  const downPayment = deal.downPayment || deal.cost;
  const totalCost = downPayment + fee;
  const canAfford = playerCash >= totalCost;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-amber-400 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-start border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
              🤝 ВАМ ПРЕДЛАГАЮТ СДЕЛКУ
            </span>
            <h3 className="text-lg font-black text-slate-100">{deal.title}</h3>
          </div>
          <span className="text-2xl">💼</span>
        </div>

        <p className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 leading-relaxed">
          Игрок <strong className="text-amber-300">{fromName}</strong> переуступает вам эту инвестиционную сделку.
        </p>

        {/* Финансовый расчет */}
        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Первый взнос активу:</span>
            <span className="text-slate-200 font-bold">{downPayment.toLocaleString()} $</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Комиссия продавцу ({fromName}):</span>
            <span className="text-amber-400 font-bold">+{fee.toLocaleString()} $</span>
          </div>
          <div className="flex justify-between text-emerald-400 border-t border-slate-800 pt-1 font-bold">
            <span>Cashflow актива:</span>
            <span>+{deal.cashflow.toLocaleString()} $/мес</span>
          </div>
          <div className="flex justify-between text-slate-100 border-t border-slate-800 pt-1 text-sm font-black">
            <span>ИТОГО К СПИСАНИЮ:</span>
            <span className="text-rose-400">{totalCost.toLocaleString()} $</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-[11px] font-mono px-1">
          <span className="text-slate-400">Ваш баланс:</span>
          <span className={canAfford ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
            {playerCash.toLocaleString()} $ {canAfford ? '✓' : '(Недостаточно)'}
          </span>
        </div>

        {/* Кнопки принятия / отказа */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={onDecline}
            className="bg-slate-800 hover:bg-slate-700 py-3 rounded-2xl text-xs font-bold text-slate-300 transition cursor-pointer"
          >
            ОТКЛОНИТЬ ✕
          </button>

          <button
            onClick={onAccept}
            disabled={!canAfford}
            className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 py-3 rounded-2xl text-xs font-black text-slate-950 transition cursor-pointer shadow-lg shadow-emerald-500/20"
          >
            КУПИТЬ СДЕЛКУ ➔
          </button>
        </div>
      </div>
    </div>
  );
};