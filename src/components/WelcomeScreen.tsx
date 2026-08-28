import { useState } from 'react';
import type { FC } from 'react';

interface WelcomeScreenProps {
  onAcceptRules: () => void;
}

export const WelcomeScreen: FC<WelcomeScreenProps> = ({ onAcceptRules }) => {
  const [showFullRules, setShowFullRules] = useState(false);

  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center p-3 sm:p-4 py-6 sm:py-8">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-3xl p-5 sm:p-8 shadow-2xl space-y-5 text-slate-100">
        
        {/* Заголовок */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-400 text-xs font-mono">
            <span>🐀 CASHFLOW ONLINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-100">
            Добро пожаловать в игру!
          </h1>
          <p className="text-emerald-400 font-semibold text-xs sm:text-sm">
            Твоя цель — вырваться из «Крысиных бегов» и обрести финансовую свободу.
          </p>
        </div>

        {/* Краткие тезисы */}
        <div className="space-y-2.5 bg-slate-950 p-4 rounded-2xl border border-slate-800/80 text-xs sm:text-sm text-slate-300">
          <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
            🎯 Главные условия победы
          </span>
          <div className="flex items-start space-x-2.5">
            <span className="text-base">🌀</span>
            <div>
              <strong className="text-slate-100">Крысиные бега (Малый круг):</strong> Победа наступает в тот момент, когда твой <strong>Пассивный доход</strong> (от недвижимости, бизнеса, дивидендов) превышает сумму всех ежемесячных обязательных <strong>Расходов</strong>.
            </div>
          </div>
          <div className="flex items-start space-x-2.5">
            <span className="text-base">💰</span>
            <div>
              <strong className="text-slate-100">Денежный поток (Payday):</strong> Разница между доходами и расходами. Чем больше активов ты покупаешь, тем больше свободных денег получаешь при прохождении клетки получки.
            </div>
          </div>
        </div>

        {/* Долговой ликбез */}
        <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800/80 text-xs text-slate-300">
          <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
            🏦 Кредиты и пассивы
          </span>
          <p className="text-slate-400">
            • <strong>Банковский заем:</strong> выдается с шагом в 1 000 $ под 10%/мес (каждая 1 000 $ кредита списывает по 100 $/мес из твоего Payday). Гасится в любой свой ход частями по 1 000 $.
          </p>
          <p className="text-slate-400">
            • <strong>Стартовые кредитки / авто / дом:</strong> гасятся только целиком разовым платежом в окне «Банк / Долги».
          </p>
        </div>

        {/* Кнопки действий */}
        <div className="space-y-2.5 pt-1">
          <button
            onClick={() => setShowFullRules(true)}
            className="w-full bg-purple-950/60 hover:bg-purple-900/80 border border-purple-600/50 text-purple-300 font-bold py-3 rounded-2xl text-xs sm:text-sm transition cursor-pointer flex items-center justify-center space-x-2 shadow-lg"
          >
            <span>📖</span>
            <span>ПОЛНЫЕ ПРАВИЛА ИГРЫ И ОПИСАНИЕ КЛЕТОК</span>
          </button>

          <button
            onClick={onAcceptRules}
            className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] transition-all text-slate-950 font-black py-3.5 rounded-2xl text-sm sm:text-base shadow-lg shadow-emerald-500/25 cursor-pointer"
          >
            НАЧАТЬ ИГРУ ➔
          </button>
        </div>
      </div>

      {/* Модальное окно с полными правилами */}
      {showFullRules && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-purple-700/60 w-full max-w-3xl rounded-3xl p-5 sm:p-7 shadow-2xl space-y-4 text-slate-100 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            
            {/* Хедер модалки */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xl">📜</span>
                <h3 className="text-base sm:text-lg font-black text-amber-300">Полный свод правил Cashflow</h3>
              </div>
              <button
                onClick={() => setShowFullRules(false)}
                className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:text-white text-sm font-bold cursor-pointer transition"
              >
                ✕
              </button>
            </div>

            {/* Контент правил со скроллом */}
            <div className="flex-1 overflow-y-auto space-y-4 text-xs sm:text-sm leading-relaxed pr-2">
              
              {/* 1. Цель и главная идея игры */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <strong className="text-emerald-400 font-bold block text-sm sm:text-base">1. Цель и главная идея игры</strong>
                <p className="text-slate-300">Игра разделена на два принципиально разных этапа:</p>
                <div className="space-y-2 pl-1 text-slate-300">
                  <p>
                    🌀 <strong className="text-slate-100">Малый круг («Крысиные бега» / Rat Race):</strong> симуляция жизни от зарплаты до зарплаты.<br />
                    • <strong>Главная цель этапа:</strong> создать пассивный доход (от недвижимости, акций, бизнеса), который превысит ваши общие ежемесячные расходы.<br />
                    • Как только <strong>Пассивный доход &gt; Общие расходы</strong>, вы вырываетесь из крысиных бегов и переходите на Скоростную дорожку.
                  </p>
                  <p>
                    🚀 <strong className="text-slate-100">Большой круг («Скоростная дорожка» / Fast Track):</strong> мир крупного капитала и больших инвестиций.<br />
                    • <strong>Победа в игре (одно из двух условий):</strong><br />
                    &nbsp;&nbsp;1. <em>Покупка своей Мечты:</em> попасть на выбранную в начале игры карточку Мечты и выкупить её за наличные.<br />
                    &nbsp;&nbsp;2. <em>Финансовое господство:</em> увеличить свой ежемесячный денежный поток на Fast Track на <strong>+50 000 $</strong> от стартового значения.
                  </p>
                </div>
              </div>

              {/* 2. Финансовый отчет */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <strong className="text-cyan-400 font-bold block text-sm sm:text-base">2. Финансовый отчет (Основа игры)</strong>
                <p className="text-slate-300">Каждое действие в игре фиксируется в финансовом бланке:</p>
                <div className="space-y-1.5 pl-1 text-slate-300">
                  <p>• <strong>Доходы (Income):</strong></p>
                  <p className="pl-4 text-slate-400">- <em>Заработная плата (Salary):</em> фиксированная зарплата по профессии.<br />- <em>Пассивный доход (Passive Income):</em> дивиденды по акциям, проценты по депозитам, чистый арендный доход от недвижимости, доход от бизнеса.<br />- <strong>Общий доход (Total Income)</strong> = Зарплата + Пассивный доход.</p>
                  <p>• <strong>Расходы (Expenses):</strong> Налоги, ипотека, кредиты на авто, кредитные карты, мелкие кредиты, прочие расходы и расходы на детей.</p>
                  <p>• <strong>Денежный поток (Monthly Cashflow / Чистый доход):</strong></p>
                  <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl font-mono text-emerald-400 font-bold text-center text-xs sm:text-sm my-1">
                    Cashflow = Общий доход - Общие расходы
                  </div>
                  <p className="text-slate-400">Именно эту сумму игрок получает на руки при попадании или прохождении сектора «День получки» (Payday).</p>
                </div>
              </div>

              {/* 3. Малый круг: Секторы и механики */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <strong className="text-amber-400 font-bold block text-sm sm:text-base">3. Малый круг: Секторы и механики</strong>
                <div className="space-y-2 text-slate-300">
                  <p>🟢 <strong className="text-emerald-400">День получки (Payday):</strong> Вы получаете сумму своего текущего Денежного потока (Cashflow). Если Cashflow отрицательный (из-за долгов), вы выплачиваете эту сумму в банк.</p>
                  <p>🔵 <strong className="text-blue-400">Возможность (Opportunity):</strong> Выбор между Мелкими сделками (стоимость до $5,000 — акции, недорогая земля, квартиры 2/1) и Крупными сделками (от $6,000 — многоквартирные дома, франшизы, торговые площади).</p>
                  <p>🟠 <strong className="text-amber-400">Рынок (Market):</strong> События, влияющие на всех игроков: покупатели недвижимости, слияния компаний, рост/падение цен на акции. Позволяет выгодно продать активы и зафиксировать прибыль.</p>
                  <p>🔴 <strong className="text-rose-400">Всякая всячина (Doodads):</strong> Обязательные непредвиденные траты: покупка техники, отпуск, ремонт автомобиля, штрафы. Сумма списывается сразу.</p>
                  <p>👶 <strong className="text-pink-400">Ребенок (Baby):</strong> Увеличивает графу «Расходы на ребенка» в вашем финансовом бланке (максимум до 3 детей за игру). Уменьшает ваш ежемесячный Cashflow.</p>
                  <p>🟣 <strong className="text-purple-400">Увольнение (Downturn):</strong> Временная потеря работы. Выплачивается сумма ваших полных Общих расходов в банк, и вы пропускаете 2 хода.</p>
                  <p>🤝 <strong className="text-teal-400">Благотворительность (Charity):</strong> Добровольная опция: пожертвование 10% от общего дохода дает право бросать 2 кубика вместо одного на протяжении 3 ходов.</p>
                </div>
              </div>

              {/* 4. Большой круг (Fast Track) */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <strong className="text-indigo-400 font-bold block text-sm sm:text-base">4. Большой круг (Fast Track): Секторы и механики</strong>
                <p className="text-slate-300">На Скоростной дорожке правила меняются: зарплаты больше нет, а ваш стартовый денежный поток рассчитывается как:</p>
                <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl font-mono text-indigo-300 font-bold text-center text-xs sm:text-sm my-1">
                  Cashflow на Fast Track = Пассивный доход с Малого круга × 100
                </div>
                <div className="space-y-2 text-slate-300 mt-2">
                  <p>💰 <strong className="text-emerald-400">День инвестора (Cashflow Day):</strong> Вы получаете полную сумму своего обновленного денежного потока Fast Track.</p>
                  <p>🏢 <strong className="text-blue-400">Бизнес-инвестиции (Business):</strong> Покупка готового бизнеса (АЗС, отели, клиники, IT-компании) за полную стоимость наличными. Сразу добавляет указанный Cashflow к вашему доходу.</p>
                  <p>🏝️ <strong className="text-amber-400">Мечта (Dream):</strong> Позволяет приобрести выбранную мечту (Остров, Яхта, Замок, Сафари) при наличии всей суммы наличными. Если это ваша выбранная мечта — вы побеждаете в игре.</p>
                  <p>⚖️ <strong className="text-rose-400">Налоговый аудит (Tax Audit):</strong> Внеплановая проверка налоговой: списывается 50% от всех текущих наличных денег.</p>
                  <p>🏛️ <strong className="text-fuchsia-400">Судебный иск (Lawsuit):</strong> Корпоративный или патентный спор: фиксированная выплата штрафа от $50,000 до $60,000 в банк.</p>
                  <p>💔 <strong className="text-red-500">Развод (Divorce):</strong> Раздел имущества: игрок теряет все свободные наличные деньги ($0 на руках).</p>
                  <p>🤝 <strong className="text-teal-400">Благотворительность Fast Track:</strong> Пожертвование $50,000 дает право бросать сразу 3 кубика для быстрого перемещения по дорожке.</p>
                </div>
              </div>

              {/* 5. FAQ */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2.5">
                <strong className="text-rose-400 font-bold block text-sm sm:text-base">5. Ответы на частые вопросы (FAQ)</strong>
                <div className="space-y-2 text-slate-300">
                  <div>
                    <strong className="text-slate-100">1. Как брать кредиты в игре?</strong>
                    <p className="text-slate-400">Кредит в банке можно брать с шагом в 1 000 $ (или кратными суммами). Банковский процент составляет 10% в месяц. То есть кредит на $10,000 добавляет +$1,000 в графу расходов, снижая ваш ежемесячный Cashflow.</p>
                  </div>
                  <div>
                    <strong className="text-slate-100">2. Что делать, если не хватает денег на сделку?</strong>
                    <p className="text-slate-400">Вы можете взять кредит в банке (если текущий Cashflow позволяет платить проценты). Если сделка невыгодна или не хватает кредитного лимита — от карточки можно отказаться или предложить ее перекупить другим игрокам.</p>
                  </div>
                  <div>
                    <strong className="text-slate-100">3. Что происходит при банкротстве?</strong>
                    <p className="text-slate-400">
                      Если при попадании на Payday или обязательные расходы ваш Cashflow отрицательный и наличных нет:<br />
                      1. Вы обязаны продать активы (недвижимость, акции) за 50% от их рыночной стоимости.<br />
                      2. Погасить долги.<br />
                      3. Если даже после продажи активов Cashflow остается отрицательным — объявляется банкротство (перезапуск игры или выбывание).
                    </p>
                  </div>
                  <div>
                    <strong className="text-slate-100">4. В чем разница между приростом капитала и денежным потоком?</strong>
                    <p className="text-slate-400">
                      • <strong>Прирост капитала (Capital Gain):</strong> покупка дешевых акций по $5 с последующей продажей по $40 на секторе «Рынок». Дает много наличных для первого взноса.<br />
                      • <strong>Денежный поток (Cashflow):</strong> покупка доходного дома, который каждый месяц приносит +$300 чистыми. Приближает к выходу из Крысиных бегов.
                    </p>
                  </div>
                </div>
              </div>

              {/* 6. Стратегия */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <strong className="text-yellow-400 font-bold block text-sm sm:text-base">6. Базовая выигрышная стратегия</strong>
                <div className="space-y-1 text-slate-300">
                  <p>• <strong>Старт игры:</strong> держите подушку безопасности в $1,000–$2,000 на случай Doodads или Увольнения.</p>
                  <p>• <strong>Накопление капитала:</strong> на малом круге в начале покупайте дешевые акции ($1–$10) или опционы; при выходе карты «Рынок» продавайте их на пике ($30–$40).</p>
                  <p>• <strong>Генерация Cashflow:</strong> перекладывайте полученный капитал в недвижимость (2/1, 3/2 кондоминиумы, 4-plex, 8-plex) с высоким положительным денежным потоком.</p>
                  <p>• <strong>Гашение плохих долгов:</strong> если на руках есть свободные деньги, закрывайте кредиты на авто и кредитки — это мгновенно повышает чистый Cashflow.</p>
                  <p>• <strong>На Скоростной дорожке:</strong> избегайте рискованных остатков по $0 перед налоговыми проверками и целенаправленно идите к клеткам своего типа победы (скупка бизнесов либо выход на свою Мечту).</p>
                </div>
              </div>

            </div>

            {/* Кнопка закрытия модалки */}
            <button
              onClick={() => setShowFullRules(false)}
              className="w-full bg-slate-800 hover:bg-slate-700 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-200 transition cursor-pointer"
            >
              ПОНЯТНО, ЗАКРЫТЬ ПРАВИЛА
            </button>
          </div>
        </div>
      )}
    </section>
  );
};