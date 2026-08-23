import type { FC } from 'react';

interface WelcomeScreenProps {
  onAcceptRules: () => void;
}

export const WelcomeScreen: FC<WelcomeScreenProps> = ({ onAcceptRules }) => {
  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center p-4 py-8">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Заголовок */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-400 text-xs font-mono">
            <span>🐀 ГАЙД НАЧИНАЮЩЕГО ИНВЕСТОРА</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-100">
            Приветствую тебя, мой друг!
          </h1>
          <p className="text-emerald-400 font-semibold text-sm sm:text-base">
            Ты решил разбогатеть?! Изучи правила и финансовые механики перед стартом:
          </p>
        </div>

        {/* 1. Базовые правила игры */}
        <div className="space-y-3 bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-1">
            📜 Главная цель и механика
          </span>
          <div className="flex items-start space-x-3">
            <span className="text-base">🌀</span>
            <div>
              <strong className="text-slate-100">Крысиные бега (Малый круг):</strong> жизнь от зарплаты до зарплаты. Победа наступает, когда твой <strong>Пассивный доход</strong> становится больше суммы всех обязательных ежемесячных расходов.
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-base">💰</span>
            <div>
              <strong className="text-slate-100">День получки (Payday):</strong> при каждом круге ты получаешь чистый денежный поток (Доходы минус Расходы). На эти деньги покупаются активы.
            </div>
          </div>
        </div>

        {/* 2. Подробный финансовый гид: Кредиты и Ипотека */}
        <div className="space-y-3 bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block mb-1">
            💳 Кредиты, ипотека и долговые рычаги
          </span>

          <div className="space-y-2 text-xs sm:text-[13px]">
            <div>
              <strong className="text-slate-100">🏦 Зачем нужен банковский кредит?</strong>
              <p className="text-slate-400 mt-0.5">
                Если на выгодную сделку (квартиру, бизнес) или срочные непредвиденные траты не хватает наличных, банк выдает кредит с шагом в <strong>1 000 $</strong>.
              </p>
            </div>

            <div>
              <strong className="text-slate-100">📉 Как начисляются проценты и платежи?</strong>
              <p className="text-slate-400 mt-0.5">
                Ежемесячный платеж по банковскому займу составляет <strong>10% в месяц</strong> от суммы долга (каждые 1 000 $ кредита увеличивают расходы на 100 $/мес и снижают твой Payday). Ипотека и автокредит из стартовой профессии также ежемесячно списываются в графе расходов.
              </p>
            </div>

            <div>
              <strong className="text-slate-100">✂️ Как гасить долги? (Частичное и полное погашение)</strong>
              <ul className="list-disc list-inside text-slate-400 mt-0.5 space-y-1">
                <li><strong>Банковский кредит:</strong> можно гасить в любой свой ход частями, кратными <strong>1 000 $</strong>. Каждый возврат 1 000 $ сразу снижает ежемесячные расходы на 100 $.</li>
                <li><strong>Стартовые пассивы (Ипотека, Автокредит, Кредитки):</strong> гасятся только <strong>целиком</strong> разовой выплатой всего остатка долга. После выплаты соответствующая строка расходов полностью обнуляется.</li>
              </ul>
            </div>

            <div>
              <strong className="text-slate-100">⚖️ «Хорошие» и «Плохие» долги:</strong>
              <p className="text-slate-400 mt-0.5">
                <span className="text-emerald-400 font-semibold">Хороший долг</span> — ипотека на арендную недвижимость, где арендатор покрывает платеж банку и приносит чистую прибыль. <span className="text-rose-400 font-semibold">Плохой долг</span> — потребительский кредит на роскошь, забирающий деньги из твоего кармана.
              </p>
            </div>
          </div>
        </div>

        {/* Кнопка перехода */}
        <button
          onClick={onAcceptRules}
          className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] transition-all text-slate-950 font-black py-3.5 rounded-2xl text-sm sm:text-base shadow-lg shadow-emerald-500/25 cursor-pointer"
        >
          С ПРАВИЛАМИ ОЗНАКОМЛЕН ➔
        </button>
      </div>
    </section>
  );
};