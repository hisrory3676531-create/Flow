import { useState } from 'react';
import type { FC } from 'react';
import type { Player } from '../types/game.types';
import type { RatColor } from './ProfileSetupScreen';
import { FINANCIAL_TOOLTIPS } from '../data/tooltips.data';
import { Tooltip } from './Tooltip';

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

  // Контент финансового отчета
  const StatementContent = (
    <div className="space-y-3">
      {/* Доходы и Расходы */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {/* Доходы */}
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1">
          <div className="flex justify-between items-center text-emerald-400 font-bold text-[10px] mb-0.5">
            <span>🟢 Доходы:</span>
            <span className="font-mono">{financials.totalIncome.toLocaleString()} $</span>
          </div>
          <div className="text-slate-400 text-[10px] flex justify-between">
            <span>Зарплата:</span>
            <span className="text-slate-200 font-mono">{financials.salary.toLocaleString()} $</span>
          </div>
          <div className="text-slate-400 text-[10px] flex justify-between">
            <span>Пассивный:</span>
            <span className="text-emerald-400 font-mono font-semibold">+{financials.passiveIncome.toLocaleString()} $</span>
          </div>
        </div>

        {/* Расходы */}
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-0.5">
          <div className="flex justify-between items-center text-rose-400 font-bold text-[10px] mb-0.5">
            <span>🔴 Расходы:</span>
            <span className="font-mono">{financials.totalExpenses.toLocaleString()} $</span>
          </div>
          <div className="text-slate-400 text-[10px] flex justify-between">
            <span>Налоги:</span>
            <span className="text-slate-200 font-mono">{financials.taxes.toLocaleString()} $</span>
          </div>
          <div className="text-slate-400 text-[10px] flex justify-between">
            <span>Ипотека/Авто:</span>
            <span className="text-slate-200 font-mono">{(financials.homeMortgagePayment + financials.carLoanPayment).toLocaleString()} $</span>
          </div>
          {financials.childCount > 0 && (
            <div className="text-slate-400 text-[10px] flex justify-between">
              <span>Дети ({financials.childCount}x):</span>
              <span className="text-rose-400 font-mono">{(financials.childExpensePerCount * financials.childCount).toLocaleString()} $</span>
            </div>
          )}
          {financials.bankLoanPayment > 0 && (
            <div className="text-amber-400 text-[10px] flex justify-between font-bold">
              <span>Кредит банку:</span>
              <span className="font-mono">-{financials.bankLoanPayment.toLocaleString()} $</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Контент списка активов
  const AssetsContent = (
    <div className="space-y-1.5 overflow-y-auto max-h-[260px] lg:max-h-none pr-1">
      {assets.length === 0 ? (
        <div className="text-slate-500 text-[11px] text-center py-6 italic">
          Пока нет купленных активов. Покупайте недвижимость и акции на синих клетках!
        </div>
      ) : (
        assets.map((asset) => (
          <div
            key={asset.id}
            className="bg-slate-900/90 border border-slate-800 p-2 rounded-xl flex items-center justify-between text-[11px]"
          >
            <div className="truncate mr-2">
              <div className="font-bold text-slate-200 truncate flex items-center gap-1">
                <span>{asset.type === 'REAL_ESTATE' ? '🏠' : asset.type === 'STOCK' ? '📈' : '🏢'}</span>
                <span>{asset.title}</span>
              </div>
              <div className="text-[9px] text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                {asset.mortgage ? (
                  <span className="text-amber-400/90">Ипотека: {asset.mortgage.toLocaleString()}$</span>
                ) : null}
                {asset.sharesCount ? (
                  <span className="text-blue-400">{asset.sharesCount} акций</span>
                ) : null}
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[9px] text-slate-500 block uppercase">Cashflow</span>
              <span className="font-mono font-bold text-emerald-400 text-xs">
                +{asset.cashflow.toLocaleString()} $/мес
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );

  // Контент логов событий
  const LogsContent = (
    <div className="space-y-1.5 font-mono text-[11px] overflow-y-auto max-h-[220px] lg:max-h-none pr-1">
      {logs.map((log, index) => (
        <div key={index} className="text-slate-300 leading-relaxed break-words bg-slate-900/60 p-1.5 rounded-lg border border-slate-800/60">
          {log}
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. ДЕСКТОПНЫЙ ВИД (Отображается на экранах >= lg)                         */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 flex-col justify-between shadow-2xl space-y-3 h-full overflow-hidden w-full">
        {/* Профиль игрока */}
        <div className="flex justify-between items-start border-b border-slate-800 pb-2.5">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl">🐀</span>
              <h2 className="font-extrabold text-base text-slate-100" style={{ color: playerColor.hex }}>
                {player.name}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Профессия: <span className="text-emerald-400 font-semibold">{player.profession.title}</span>
            </p>
          </div>
          <span className="text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
            МАЛЫЙ КРУГ
          </span>
        </div>

        {/* Наличные и Payday */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/90">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Наличные</span>
              <Tooltip text={FINANCIAL_TOOLTIPS.savings} />
            </div>
            <span className="text-lg font-black text-emerald-400 font-mono block mt-0.5">
              {player.cash.toLocaleString()} $
            </span>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/90">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Payday (Поток)</span>
              <Tooltip text={FINANCIAL_TOOLTIPS.cashflow} />
            </div>
            <span className="text-lg font-black text-emerald-400 font-mono block mt-0.5">
              +{financials.monthlyCashflow.toLocaleString()} $
            </span>
          </div>
        </div>

        {/* Прогресс-бар выхода */}
        <div className="space-y-1 bg-slate-950/60 p-2.5 rounded-2xl border border-slate-800/80">
          <div className="flex justify-between items-center text-xs font-mono">
            <div className="flex items-center space-x-1">
              <span className="text-slate-400 text-[10px]">Пассивный / Расходы</span>
              <Tooltip text={FINANCIAL_TOOLTIPS.passiveIncome} />
            </div>
            <span className="text-amber-400 font-bold text-[10px]">
              {financials.passiveIncome}$ / {financials.totalExpenses}$ ({escapePercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-amber-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${escapePercent}%` }}
            />
          </div>
        </div>

        {/* Доходы и расходы */}
        {StatementContent}

        {/* Активы */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-2.5 flex-1 min-h-[140px] max-h-[180px] flex flex-col justify-between overflow-hidden">
          <div className="flex justify-between items-center border-b border-slate-800/80 pb-1 mb-1">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
              🏛️ Активы и имущество ({assets.length})
            </span>
            <span className="text-[9px] text-slate-500 font-mono">Пассив: +{financials.passiveIncome}$/мес</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {AssetsContent}
          </div>
        </div>

        {/* Логи */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 flex flex-col justify-between h-32 shrink-0">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1 block">
            Журнал событий:
          </span>
          <div className="flex-1 overflow-y-auto">
            {LogsContent}
          </div>
        </div>

        {/* Кнопка хода на десктопе */}
        <div className="bg-slate-950 border border-purple-900/50 p-2.5 rounded-2xl flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-700 flex items-center justify-center text-lg shadow-inner">
              {diceValue ? '🎲' : '🎯'}
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-purple-300 block">Бросок</span>
              <span className="text-sm font-black font-mono text-amber-400">
                {isRolling ? '...' : diceValue ? `${diceValue}` : '-'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {!hasRolledThisTurn ? (
              <button
                onClick={onRollDice}
                disabled={!isMyTurn || isRolling}
                className="bg-amber-400 hover:bg-amber-300 active:scale-95 disabled:bg-slate-800 disabled:text-slate-600 transition text-slate-950 font-black px-4 py-2 rounded-xl text-xs shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                {isRolling ? 'Бросаем...' : isMyTurn ? 'БРОСИТЬ КУБИК ➔' : 'Ход соперника...'}
              </button>
            ) : (
              <button
                onClick={onEndTurn}
                className="bg-purple-600 hover:bg-purple-500 active:scale-95 transition text-white font-black px-4 py-2 rounded-xl text-xs shadow-lg shadow-purple-600/30 cursor-pointer"
              >
                ЗАВЕРШИТЬ ХОД ➔
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. МОБИЛЬНЫЙ ПЛАВАЮЩИЙ БАР И ШТОРКА (Экраны < lg)                         */}
      {/* ========================================================================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#170526]/95 backdrop-blur-md border-t border-purple-900/80 px-3 py-2 shadow-2xl">
        <div className="flex items-center justify-between gap-2">
          {/* Кнопка открытия полной информации о балансе */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex-1 bg-slate-900/90 border border-purple-800/60 rounded-xl p-1.5 flex items-center justify-between text-left active:scale-95 transition"
          >
            <div className="flex items-center space-x-2">
              <span className="text-base">💼</span>
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">Баланс / Поток</span>
                <span className="text-xs font-mono font-black text-emerald-400">
                  {player.cash.toLocaleString()}$ <span className="text-[10px] text-amber-300">(+{financials.monthlyCashflow}$)</span>
                </span>
              </div>
            </div>
            <span className="text-slate-400 text-xs px-1">▲</span>
          </button>

          {/* Индикатор кубика и кнопка действия */}
          <div className="flex items-center space-x-1.5">
            {diceValue && (
              <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-700 flex items-center justify-center font-mono font-black text-amber-300 text-sm">
                {diceValue}
              </div>
            )}

            {!hasRolledThisTurn ? (
              <button
                onClick={onRollDice}
                disabled={!isMyTurn || isRolling}
                className="bg-amber-400 hover:bg-amber-300 active:scale-95 disabled:bg-slate-800 disabled:text-slate-600 transition text-slate-950 font-black px-3.5 py-2.5 rounded-xl text-xs shadow-lg cursor-pointer"
              >
                {isRolling ? '...' : isMyTurn ? '🎲 КУБИК' : 'Ждем...'}
              </button>
            ) : (
              <button
                onClick={onEndTurn}
                className="bg-purple-600 hover:bg-purple-500 active:scale-95 transition text-white font-black px-3.5 py-2.5 rounded-xl text-xs shadow-lg cursor-pointer"
              >
                КОНЕЦ ➔
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. ВЫДВИЖНАЯ МОБИЛЬНАЯ ШТОРКА (BOTTOM SHEET)                               */}
      {/* ========================================================================= */}
      {isDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex flex-col justify-end">
          <div 
            className="flex-1"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="bg-slate-900 border-t border-purple-700 rounded-t-3xl p-4 max-h-[80vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-200">
            {/* Хендл закрытия */}
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="text-lg">🐀</span>
                <span className="font-extrabold text-sm" style={{ color: playerColor.hex }}>{player.name}</span>
                <span className="text-[10px] text-slate-400">({player.profession.title})</span>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 text-xs font-bold active:scale-90"
              >
                ✕
              </button>
            </div>

            {/* Табы меню */}
            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl my-3 border border-slate-800">
              <button
                onClick={() => setActiveTab('STATEMENT')}
                className={`py-1.5 text-[11px] font-bold rounded-lg transition ${
                  activeTab === 'STATEMENT' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                📊 Финансы
              </button>
              <button
                onClick={() => setActiveTab('ASSETS')}
                className={`py-1.5 text-[11px] font-bold rounded-lg transition ${
                  activeTab === 'ASSETS' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🏛️ Активы ({assets.length})
              </button>
              <button
                onClick={() => setActiveTab('LOGS')}
                className={`py-1.5 text-[11px] font-bold rounded-lg transition ${
                  activeTab === 'LOGS' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                📜 События
              </button>
            </div>

            {/* Содержимое активного таба */}
            <div className="flex-1 overflow-y-auto pb-4">
              {activeTab === 'STATEMENT' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-[9px] text-slate-400 uppercase font-semibold block">Наличные</span>
                      <span className="text-base font-black text-emerald-400 font-mono">
                        {player.cash.toLocaleString()} $
                      </span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-[9px] text-slate-400 uppercase font-semibold block">Payday</span>
                      <span className="text-base font-black text-emerald-400 font-mono">
                        +{financials.monthlyCashflow.toLocaleString()} $
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-slate-400">Прогресс выхода:</span>
                      <span className="text-amber-400 font-bold">{escapePercent}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full" style={{ width: `${escapePercent}%` }} />
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