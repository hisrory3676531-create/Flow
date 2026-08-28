import { useState } from 'react';
import type { FC } from 'react';
import type { Player } from '../types/game.types';
import type { RatColor } from './ProfileSetupScreen';
import { FINANCIAL_TOOLTIPS } from '../data/tooltips.data';
import { Tooltip } from './Tooltip';
import { Dice3DContainer } from './Dice3D';

interface FinancialStatementPanelProps {
  player: Player;
  playerColor: RatColor;
  logs: string[];
  diceValue: number | null;
  isRolling: boolean;
  onRollDice: () => void;
  isMyTurn?: boolean;
  hasRolledThisTurn?: boolean;
  onEndTurn?: () => void;
}

type TabType = 'STATEMENT' | 'ASSETS' | 'LOGS';

export const FinancialStatementPanel: FC<FinancialStatementPanelProps> = ({
  player,
  playerColor,
  logs,
  diceValue,
  isRolling,
  onRollDice,
  isMyTurn = true,
  hasRolledThisTurn = false,
  onEndTurn
}) => {
  const { financials, assets } = player;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('STATEMENT');

  const escapePercent = financials.totalExpenses > 0
    ? Math.min(Math.round((financials.passiveIncome / financials.totalExpenses) * 100), 100)
    : 0;

  // Бумажный бланк: доходы и расходы
  const StatementContent = (
    <div className="space-y-2.5">
      <div className="grid grid-cols-2 gap-2 text-xs">
        {/* Доходы */}
        <div className="bg-[#f4efe4] p-2.5 rounded-xl border border-stone-300 space-y-1 shadow-sm">
          <div className="flex justify-between items-center text-emerald-800 font-bold text-[10px] mb-0.5 border-b border-stone-300 pb-0.5">
            <span>🟢 Доходы:</span>
            <span className="font-mono">{financials.totalIncome.toLocaleString()} $</span>
          </div>
          <div className="text-stone-700 text-[10px] flex justify-between">
            <span>Зарплата:</span>
            <span className="text-stone-900 font-mono font-semibold">{financials.salary.toLocaleString()} $</span>
          </div>
          <div className="text-stone-700 text-[10px] flex justify-between">
            <span>Пассивный:</span>
            <span className="text-emerald-700 font-mono font-bold">+{financials.passiveIncome.toLocaleString()} $</span>
          </div>
        </div>

        {/* Расходы */}
        <div className="bg-[#f4efe4] p-2.5 rounded-xl border border-stone-300 space-y-0.5 shadow-sm">
          <div className="flex justify-between items-center text-rose-800 font-bold text-[10px] mb-0.5 border-b border-stone-300 pb-0.5">
            <span>🔴 Расходы:</span>
            <span className="font-mono">{financials.totalExpenses.toLocaleString()} $</span>
          </div>
          <div className="text-stone-700 text-[10px] flex justify-between">
            <span>Налоги:</span>
            <span className="text-stone-900 font-mono">{financials.taxes.toLocaleString()} $</span>
          </div>
          <div className="text-stone-700 text-[10px] flex justify-between">
            <span>Ипотека/Авто:</span>
            <span className="text-stone-900 font-mono">{(financials.homeMortgagePayment + financials.carLoanPayment).toLocaleString()} $</span>
          </div>
          {financials.childCount > 0 && (
            <div className="text-stone-700 text-[10px] flex justify-between">
              <span>Дети ({financials.childCount}x):</span>
              <span className="text-rose-700 font-mono">{(financials.childExpensePerCount * financials.childCount).toLocaleString()} $</span>
            </div>
          )}
          {financials.bankLoanPayment > 0 && (
            <div className="text-amber-800 text-[10px] flex justify-between font-bold">
              <span>Кредит:</span>
              <span className="font-mono">-{financials.bankLoanPayment.toLocaleString()} $</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Список активов
  const AssetsContent = (
    <div className="space-y-1.5 overflow-y-auto max-h-[260px] lg:max-h-none pr-1">
      {assets.length === 0 ? (
        <div className="text-stone-500 text-[11px] text-center py-6 italic">
          Пока нет купленных активов. Покупайте недвижимость и акции на синих клетках!
        </div>
      ) : (
        assets.map((asset) => (
          <div
            key={asset.id}
            className="bg-[#f4efe4] border border-stone-300 p-2 rounded-xl flex items-center justify-between text-[11px] shadow-sm"
          >
            <div className="truncate mr-2">
              <div className="font-bold text-stone-900 truncate flex items-center gap-1">
                <span>{asset.type === 'REAL_ESTATE' ? '🏠' : asset.type === 'STOCK' ? '📈' : '🏢'}</span>
                <span>{asset.title}</span>
              </div>
              <div className="text-[9px] text-stone-600 font-mono flex items-center gap-2 mt-0.5">
                {asset.mortgage ? (
                  <span className="text-amber-800 font-semibold">Ипотека: {asset.mortgage.toLocaleString()}$</span>
                ) : null}
                {asset.sharesCount ? (
                  <span className="text-blue-800 font-semibold">{asset.sharesCount} акций</span>
                ) : null}
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[9px] text-stone-500 block uppercase">Cashflow</span>
              <span className="font-mono font-black text-emerald-800 text-xs">
                +{asset.cashflow.toLocaleString()} $/мес
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );

  // Журнал событий
  const LogsContent = (
    <div className="space-y-1.5 font-mono text-[11px] overflow-y-auto max-h-[220px] lg:max-h-none pr-1">
      {logs.map((log, index) => (
        <div key={index} className="text-stone-800 leading-relaxed break-words bg-[#f4efe4] p-1.5 rounded-lg border border-stone-300">
          {log}
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* 1. ДЕСКТОПНЫЙ БУМАЖНЫЙ БЛАНК */}
      <div className="hidden lg:flex bg-[#fcf9f2] border-2 border-stone-300 rounded-3xl p-4 sm:p-5 flex-col justify-between shadow-xl space-y-3 h-full overflow-hidden w-full text-stone-900">
        {/* Профиль игрока */}
        <div className="flex justify-between items-start border-b-2 border-stone-300 pb-2.5">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl">🐀</span>
              <h2 className="font-black text-base text-stone-950" style={{ color: playerColor.hex }}>
                {player.name}
              </h2>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              Профессия: <span className="text-emerald-800 font-bold">{player.profession.title}</span>
            </p>
          </div>
          <span className="text-[10px] font-mono bg-[#4a154b] text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold">
            {player.currentTrack === 'FAST_TRACK' ? 'FAST TRACK' : 'МАЛЫЙ КРУГ'}
          </span>
        </div>

        {/* Наличные и Payday */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-[#f4efe4] p-3 rounded-2xl border border-stone-300 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-stone-600 uppercase font-bold">Наличные</span>
              <Tooltip text={FINANCIAL_TOOLTIPS.savings} />
            </div>
            <span className="text-lg font-black text-emerald-800 font-mono block mt-0.5">
              {player.cash.toLocaleString()} $
            </span>
          </div>

          <div className="bg-[#f4efe4] p-3 rounded-2xl border border-stone-300 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-stone-600 uppercase font-bold">Payday (Поток)</span>
              <Tooltip text={FINANCIAL_TOOLTIPS.cashflow} />
            </div>
            <span className="text-lg font-black text-emerald-800 font-mono block mt-0.5">
              +{financials.monthlyCashflow.toLocaleString()} $
            </span>
          </div>
        </div>

        {/* Прогресс-бар выхода */}
        <div className="space-y-1 bg-[#f4efe4] p-2.5 rounded-2xl border border-stone-300 shadow-sm">
          <div className="flex justify-between items-center text-xs font-mono">
            <div className="flex items-center space-x-1">
              <span className="text-stone-600 text-[10px] font-semibold">Пассивный / Расходы</span>
              <Tooltip text={FINANCIAL_TOOLTIPS.passiveIncome} />
            </div>
            <span className="text-amber-800 font-black text-[10px]">
              {financials.passiveIncome}$ / {financials.totalExpenses}$ ({escapePercent}%)
            </span>
          </div>
          <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden border border-stone-300">
            <div
              className="bg-amber-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${escapePercent}%` }}
            />
          </div>
        </div>

        {/* Доходы и расходы */}
        {StatementContent}

        {/* Активы */}
        <div className="bg-[#fcf9f2] border border-stone-300 rounded-2xl p-2.5 flex-1 min-h-[140px] max-h-[180px] flex flex-col justify-between overflow-hidden shadow-inner">
          <div className="flex justify-between items-center border-b border-stone-300 pb-1 mb-1">
            <span className="text-[10px] font-mono text-stone-800 font-bold uppercase tracking-wider">
              🏛️ Активы и имущество ({assets.length})
            </span>
            <span className="text-[9px] text-stone-500 font-mono">Пассив: +{financials.passiveIncome}$/мес</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {AssetsContent}
          </div>
        </div>

        {/* Логи */}
        <div className="bg-[#fcf9f2] border border-stone-300 rounded-2xl p-3 flex flex-col justify-between h-32 shrink-0 shadow-inner">
          <span className="text-[10px] text-stone-600 uppercase font-bold tracking-wider mb-1 block">
            Журнал событий:
          </span>
          <div className="flex-1 overflow-y-auto">
            {LogsContent}
          </div>
        </div>

        {/* Кнопка хода на десктопе */}
        <div className="bg-[#240a2c] border border-amber-500/40 p-2.5 rounded-2xl flex items-center justify-between gap-3 shadow-md">
          <div className="flex items-center space-x-3">
            <Dice3DContainer value={diceValue} isRolling={isRolling} size={38} />
            {diceValue && !isRolling && (
              <span className="font-mono font-black text-amber-300 text-lg">
                ={diceValue}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {!hasRolledThisTurn ? (
              <button
                onClick={onRollDice}
                disabled={!isMyTurn || isRolling}
                className="bg-amber-400 hover:bg-amber-300 active:scale-95 disabled:bg-stone-700 disabled:text-stone-400 transition text-stone-950 font-black px-4 py-2.5 rounded-xl text-xs shadow-md cursor-pointer uppercase tracking-wider"
              >
                {isRolling ? 'КРУТИМ... 🎲' : isMyTurn ? 'БРОСИТЬ КУБИК ➔' : 'Ход соперника...'}
              </button>
            ) : (
              <button
                onClick={onEndTurn}
                disabled={!isMyTurn}
                className="bg-[#4a154b] hover:bg-[#5e1b5f] active:scale-95 disabled:bg-stone-700 disabled:text-stone-400 transition text-amber-200 border border-amber-400/40 font-black px-4 py-2.5 rounded-xl text-xs shadow-md cursor-pointer uppercase tracking-wider"
              >
                ЗАВЕРШИТЬ ХОД ➔
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. МОБИЛЬНЫЙ БАР (Экраны < lg) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#240a2c] border-t border-amber-500/40 px-3 pt-2 pb-5 shadow-2xl">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex-1 bg-[#3b1247] border border-amber-500/30 rounded-xl p-1.5 flex items-center justify-between text-left active:scale-95 transition"
          >
            <div className="flex items-center space-x-2">
              <span className="text-base">💼</span>
              <div>
                <span className="text-[9px] uppercase font-bold text-amber-200/70 block leading-none">Баланс / Поток</span>
                <span className="text-xs font-mono font-black text-amber-300">
                  {player.cash.toLocaleString()}$ <span className="text-[10px] text-emerald-300">(+{financials.monthlyCashflow}$)</span>
                </span>
              </div>
            </div>
            <span className="text-amber-300 text-xs px-1">▲</span>
          </button>

          <div className="flex items-center space-x-2">
            <Dice3DContainer value={diceValue} isRolling={isRolling} size={32} />

            {!hasRolledThisTurn ? (
              <button
                onClick={onRollDice}
                disabled={!isMyTurn || isRolling}
                className="bg-amber-400 hover:bg-amber-300 active:scale-95 disabled:bg-stone-800 disabled:text-stone-500 transition text-stone-950 font-black px-3.5 py-2.5 rounded-xl text-xs shadow-md cursor-pointer uppercase tracking-wider"
              >
                {isRolling ? '...' : isMyTurn ? 'БРОСОК' : 'Ждем...'}
              </button>
            ) : (
              <button
                onClick={onEndTurn}
                disabled={!isMyTurn}
                className="bg-[#4a154b] hover:bg-[#5e1b5f] active:scale-95 disabled:bg-stone-800 disabled:text-stone-500 transition text-amber-200 border border-amber-400/40 font-black px-3.5 py-2.5 rounded-xl text-xs shadow-md cursor-pointer uppercase tracking-wider"
              >
                КОНЕЦ ➔
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. МОБИЛЬНАЯ ШТОРКА (BOTTOM SHEET) */}
      {isDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col justify-end">
          <div 
            className="flex-1"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="bg-[#fcf9f2] border-t-2 border-stone-300 rounded-t-3xl p-4 max-h-[80vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-150 text-stone-900">
            <div className="flex justify-between items-center pb-2.5 border-b border-stone-300">
              <div className="flex items-center space-x-2">
                <span className="text-lg">🐀</span>
                <span className="font-black text-sm" style={{ color: playerColor.hex }}>{player.name}</span>
                <span className="text-[10px] text-stone-600">({player.profession.title})</span>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-7 h-7 bg-stone-200 rounded-full flex items-center justify-center text-stone-700 text-xs font-bold active:scale-90"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-1 bg-stone-200 p-1 rounded-xl my-3 border border-stone-300">
              <button
                onClick={() => setActiveTab('STATEMENT')}
                className={`py-1.5 text-[11px] font-bold rounded-lg transition ${
                  activeTab === 'STATEMENT' ? 'bg-[#4a154b] text-amber-300 shadow' : 'text-stone-700'
                }`}
              >
                📊 Финансы
              </button>
              <button
                onClick={() => setActiveTab('ASSETS')}
                className={`py-1.5 text-[11px] font-bold rounded-lg transition ${
                  activeTab === 'ASSETS' ? 'bg-[#4a154b] text-amber-300 shadow' : 'text-stone-700'
                }`}
              >
                🏛️ Активы ({assets.length})
              </button>
              <button
                onClick={() => setActiveTab('LOGS')}
                className={`py-1.5 text-[11px] font-bold rounded-lg transition ${
                  activeTab === 'LOGS' ? 'bg-[#4a154b] text-amber-300 shadow' : 'text-stone-700'
                }`}
              >
                📜 События
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pb-4">
              {activeTab === 'STATEMENT' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#f4efe4] p-2.5 rounded-xl border border-stone-300">
                      <span className="text-[9px] text-stone-600 uppercase font-bold block">Наличные</span>
                      <span className="text-base font-black text-emerald-800 font-mono">
                        {player.cash.toLocaleString()} $
                      </span>
                    </div>
                    <div className="bg-[#f4efe4] p-2.5 rounded-xl border border-stone-300">
                      <span className="text-[9px] text-stone-600 uppercase font-bold block">Payday</span>
                      <span className="text-base font-black text-emerald-800 font-mono">
                        +{financials.monthlyCashflow.toLocaleString()} $
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 bg-[#f4efe4] p-2.5 rounded-xl border border-stone-300">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-stone-600 font-semibold">Прогресс выхода:</span>
                      <span className="text-amber-800 font-black">{escapePercent}%</span>
                    </div>
                    <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-600 h-full" style={{ width: `${escapePercent}%` }} />
                    </div>
                  </div>

                  {StatementContent}
                </div>
              )}

              {activeTab === 'ASSETS' && AssetsContent}
              {activeTab === 'LOGS' && LogsContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};