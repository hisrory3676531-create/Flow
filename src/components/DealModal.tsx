import { useState } from 'react';
import type { FC } from 'react';
import type { DealCard } from '../data/cards.data';
import type { BoardPlayer } from './GameBoard';
import { SMALL_DEALS, BIG_DEALS } from '../data/cards.data';
import { Tooltip } from './Tooltip';
import { socket } from '../services/socket';

interface DealModalProps {
  roomId: string;
  playerCash: number;
  monthlyCashflow: number;
  otherPlayers: BoardPlayer[];
  onBuy: (deal: DealCard, stockCount?: number, borrowedAmount?: number) => void;
  onSellToPlayer: (deal: DealCard, buyer: BoardPlayer, fee: number) => void;
  onPass: () => void;
}

export const DealModal: FC<DealModalProps> = ({
  roomId,
  playerCash,
  monthlyCashflow,
  otherPlayers,
  onBuy,
  onSellToPlayer,
  onPass
}) => {
  const [dealTypeChosen, setDealTypeChosen] = useState<'SMALL' | 'BIG' | null>(null);
  const [card, setCard] = useState<DealCard | null>(null);
  const [sharesAmount, setSharesAmount] = useState<number>(100);
  const [takeLoan, setTakeLoan] = useState<boolean>(false);
  const [loanAmount, setLoanAmount] = useState<number>(1000);
  const [showTradeBlock, setShowTradeBlock] = useState<boolean>(false);
  const [tradeFee, setTradeFee] = useState<number>(500);

  const handleSelectCategory = (cat: 'SMALL' | 'BIG') => {
    setDealTypeChosen(cat);
    const pool = cat === 'SMALL' ? SMALL_DEALS : BIG_DEALS;
    const randomCard = pool[Math.floor(Math.random() * pool.length)];
    setCard(randomCard);

    // Мгновенно транслируем выпавшую карту остальным игрокам
    socket.emit('broadcast_active_card', {
      roomId,
      cardData: randomCard
    });
  };

  const isStock = card?.type === 'STOCK';
  const requiredDownPayment = isStock ? (card?.cost || 0) * sharesAmount : (card?.downPayment || 0);
  const deficit = Math.max(0, requiredDownPayment - playerCash);
  const minRequiredLoan = Math.ceil(deficit / 1000) * 1000;

  const activeLoan = takeLoan ? loanAmount : 0;
  const totalAvailableCash = playerCash + activeLoan;
  const canAffordWithLoan = totalAvailableCash >= requiredDownPayment;

  const addedLoanPayment = Math.round(activeLoan * 0.1);
  const projectedNetCashflow = monthlyCashflow + (card?.cashflow || 0) - addedLoanPayment;
  const isBankruptRisk = projectedNetCashflow < 0;

  const mortgageTooltipText = card?.mortgage
    ? `Ипотека $${card.mortgage.toLocaleString()} не вычитается из зарплаты, так как арендатор полностью покрывает её платеж. Цифра нужна для продажи: если на клетке «Рынок» покупатель предложит, например, $${(card.cost * 1.5).toLocaleString()}, ваша чистая прибыль на руки составит: $${(card.cost * 1.5).toLocaleString()} - $${card.mortgage.toLocaleString()} = $${(card.cost * 1.5 - card.mortgage).toLocaleString()}.`
    : 'Долг по сделке';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4 text-slate-100 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        
        {/* Шаг 1: Выбор категории */}
        {!dealTypeChosen && (
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full text-blue-400 text-xs font-mono">
              <span>💼 КЛЕТКА «ВОЗМОЖНОСТЬ»</span>
            </div>
            <h2 className="text-xl font-black">Выберите размер сделки</h2>
            <p className="text-xs text-slate-400">
              Мелкие сделки подходят для старта. Крупные требуют солидный первый взнос или кредитное плечо.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handleSelectCategory('SMALL')}
                className="bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-blue-500 p-4 rounded-2xl flex flex-col items-center text-center space-y-2 transition cursor-pointer group"
              >
                <span className="text-3xl group-hover:scale-110 transition">🪙</span>
                <span className="text-sm font-bold text-blue-400">Мелкая сделка</span>
                <span className="text-[11px] text-slate-400">Взнос до 5 000 $ (акции, 1-2к квартиры)</span>
              </button>

              <button
                onClick={() => handleSelectCategory('BIG')}
                className="bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500 p-4 rounded-2xl flex flex-col items-center text-center space-y-2 transition cursor-pointer group"
              >
                <span className="text-3xl group-hover:scale-110 transition">🏢</span>
                <span className="text-sm font-bold text-amber-400">Крупная сделка</span>
                <span className="text-[11px] text-slate-400">Взнос от 6 000 $ (дома, коммерция, бизнес)</span>
              </button>
            </div>

            <button
              onClick={onPass}
              className="w-full py-2 text-xs text-slate-500 hover:text-slate-300 transition cursor-pointer"
            >
              Пропустить ход
            </button>
          </div>
        )}

        {/* Шаг 2: Карточка выпавшей сделки */}
        {card && (
          <div className="space-y-4">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold block">
                  {card.category === 'SMALL' ? 'Мелкая сделка' : 'Крупная сделка'} • {card.type === 'REAL_ESTATE' ? 'Недвижимость' : card.type === 'STOCK' ? 'Ценные бумаги' : 'Бизнес'}
                </span>
                <h3 className="text-lg font-black text-slate-100">{card.title}</h3>
              </div>
              <span className="text-2xl">{card.type === 'REAL_ESTATE' ? '🏠' : card.type === 'STOCK' ? '📊' : '🏢'}</span>
            </div>

            <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
              {card.description}
            </p>

            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Полная стоимость:</span>
                <span className="font-mono font-bold text-slate-200">
                  {isStock ? `${card.cost} $ / акция` : `${card.cost.toLocaleString()} $`}
                </span>
              </div>

              {!isStock && card.mortgage && (
                <div className="flex justify-between items-center text-slate-400">
                  <div className="flex items-center space-x-1">
                    <span>Ипотечный долг объекта:</span>
                    <Tooltip text={mortgageTooltipText} />
                  </div>
                  <span className="font-mono text-slate-300">{card.mortgage.toLocaleString()} $</span>
                </div>
              )}

              {isStock && (
                <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                  <span className="text-slate-300 font-medium">Количество акций:</span>
                  <input
                    type="number"
                    min={10}
                    step={10}
                    value={sharesAmount}
                    onChange={(e) => {
                      const newAmount = Math.max(10, parseInt(e.target.value) || 0);
                      setSharesAmount(newAmount);
                      // Транслируем изменение количества акций
                      socket.emit('broadcast_active_card', {
                        roomId,
                        cardData: {
                          ...card,
                          downPayment: card.cost * newAmount,
                          description: `Покупает пакет из ${newAmount} шт. акций.`
                        }
                      });
                    }}
                    className="w-24 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-right font-mono text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              <div className="border-t border-slate-800 pt-2 flex justify-between items-center">
                <span className="font-bold text-slate-200">Первый взнос:</span>
                <span className="font-mono font-black text-sm text-emerald-400">
                  {requiredDownPayment.toLocaleString()} $
                </span>
              </div>

              <div className="flex justify-between items-center text-emerald-400 font-bold">
                <span>Доход актива (Cashflow):</span>
                <span className="font-mono">+{card.cashflow.toLocaleString()} $ / мес</span>
              </div>
            </div>

            {/* Блок кредита */}
            {deficit > 0 && !takeLoan && !showTradeBlock && (
              <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-2xl flex items-center justify-between gap-2">
                <div className="text-xs">
                  <span className="font-bold text-amber-300 block">Не хватает {deficit.toLocaleString()} $</span>
                  <span className="text-[10px] text-slate-400">У вас: {playerCash.toLocaleString()} $</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setTakeLoan(true);
                      setLoanAmount(minRequiredLoan);
                    }}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-3 py-1.5 rounded-xl text-xs transition cursor-pointer shrink-0"
                  >
                    ВЗЯТЬ КРЕДИТ ➔
                  </button>
                  <button
                    onClick={() => setShowTradeBlock(true)}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition cursor-pointer shrink-0"
                  >
                    ПРОДАТЬ ИГРОКУ ➔
                  </button>
                </div>
              </div>
            )}

            {/* Настройка кредита */}
            {takeLoan && (
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-amber-500/50 space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-300">🏦 Кредит под сделку (10%/мес):</span>
                  <span className="text-[11px] text-rose-400 font-mono font-bold">Платеж: -{addedLoanPayment} $/мес</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min={minRequiredLoan}
                    step={1000}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Math.max(minRequiredLoan, parseInt(e.target.value) || 0))}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-amber-500"
                  />
                  <button
                    onClick={() => setTakeLoan(false)}
                    className="text-slate-500 hover:text-slate-300 text-xs px-2"
                  >
                    Отмена
                  </button>
                </div>
                <div className="text-[10px] text-slate-400 flex justify-between font-mono">
                  <span>С кредитом: <strong className="text-emerald-400">{totalAvailableCash.toLocaleString()}$</strong></span>
                  <span>Новый Payday: <strong className={isBankruptRisk ? 'text-rose-400' : 'text-emerald-400'}>{projectedNetCashflow}$</strong></span>
                </div>
              </div>
            )}

            {/* Блок торговли сделкой с другими игроками */}
            {showTradeBlock && (
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-purple-500/50 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-purple-300">🤝 Продать право на сделку игроку:</span>
                  <button onClick={() => setShowTradeBlock(false)} className="text-slate-500 hover:text-slate-300 text-xs">Отмена</button>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-slate-400">Комиссия за сделку:</span>
                  <input
                    type="number"
                    min={100}
                    step={100}
                    value={tradeFee}
                    onChange={(e) => setTradeFee(Math.max(100, parseInt(e.target.value) || 0))}
                    className="w-28 bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1 text-xs font-mono text-right focus:outline-none focus:border-purple-500"
                  />
                  <span className="text-emerald-400 font-bold">$</span>
                </div>

                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                  {otherPlayers.map((p) => (
                    <div key={p.id} className="bg-slate-900 border border-slate-800 p-2 rounded-xl flex justify-between items-center">
                      <div className="flex items-center space-x-1.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color.hex }} />
                        <span className="font-bold text-slate-200">{p.name}</span>
                      </div>
                      <button
                        onClick={() => onSellToPlayer(card, p, tradeFee)}
                        className="bg-purple-600 hover:bg-purple-500 text-white font-black px-3 py-1 rounded-lg text-[10px] transition cursor-pointer"
                      >
                        ПЕРЕДАТЬ ЗА +{tradeFee}$
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Кнопки */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={onPass}
                className="w-full bg-slate-800 hover:bg-slate-700 active:scale-95 transition py-3 rounded-xl text-xs font-bold text-slate-300 cursor-pointer"
              >
                Отказаться (Пас)
              </button>

              <button
                onClick={() => onBuy(card, isStock ? sharesAmount : undefined, takeLoan ? loanAmount : 0)}
                disabled={!canAffordWithLoan || isBankruptRisk}
                className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 active:scale-95 transition py-3 rounded-xl text-xs font-black text-slate-950 shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                {takeLoan ? 'ОФОРМИТЬ И КУПИТЬ ➔' : 'КУПИТЬ АКТИВ ➔'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};