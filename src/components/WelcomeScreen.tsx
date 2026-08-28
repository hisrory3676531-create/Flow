import { useState } from 'react';
import type { FC } from 'react';

interface WelcomeScreenProps {
  onAcceptRules: () => void;
}

export const WelcomeScreen: FC<WelcomeScreenProps> = ({ onAcceptRules }) => {
  const [showFullRules, setShowFullRules] = useState(false);

  return (
    <section 
      className="min-h-screen flex items-center justify-center p-3 sm:p-4 py-6 sm:py-8 bg-cover bg-center select-none"
      style={{
        backgroundImage: `radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.85) 100%), url('/table-bg.jpg')`
      }}
    >
      {/* Главная коробка приветствия */}
      <div className="bg-[#240a2c] border-2 border-amber-500/50 w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-stone-100 font-sans">
        
        {/* Заголовок */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 bg-[#4a154b] border border-amber-400/40 px-3.5 py-1 rounded-full text-amber-300 text-xs font-bold uppercase tracking-wider shadow-sm">
            <span>🐀 CASHFLOW 101 • НАСТОЛЬНАЯ ИГРА</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-amber-300">
            Добро пожаловать в игру!
          </h1>
          <p className="text-stone-300 font-medium text-xs sm:text-sm max-w-xl mx-auto">
            Ваша цель — сформировать пассивный доход, вырваться из «Крысиных бегов» на Скоростную дорожку и реализовать свою Мечту.
          </p>
        </div>

        {/* Бумажный блок с главными условиями */}
        <div className="space-y-3 bg-[#fcf9f2] p-4 sm:p-5 rounded-2xl border-2 border-stone-300 text-stone-900 shadow-md">
          <span className="text-xs font-bold text-[#4a154b] uppercase tracking-wider block border-b border-stone-300 pb-1 font-mono">
            🎯 Главные условия победы
          </span>
          <div className="flex items-start space-x-3 text-xs sm:text-sm leading-relaxed">
            <span className="text-xl">🌀</span>
            <div>
              <strong className="text-stone-950 font-bold">1. Крысиные бега (Малый круг):</strong> Победа на этапе наступает, когда ваш <strong>Пассивный доход</strong> (от недвижимости, дивидендов, бизнеса) становится строго больше всех ежемесячных обязательных <strong>Расходов</strong>.
            </div>
          </div>
          <div className="flex items-start space-x-3 text-xs sm:text-sm leading-relaxed">
            <span className="text-xl">💰</span>
            <div>
              <strong className="text-stone-950 font-bold">2. Денежный поток (Payday):</strong> Разница между общими доходами и расходами. Каждый приобретенный актив увеличивает сумму чистых наличных, получаемых на клетке получки.
            </div>
          </div>
        </div>

        {/* Банковский и кредитный ликбез */}
        <div className="space-y-2 bg-[#34113f] p-4 rounded-2xl border border-amber-500/30 text-xs text-amber-100">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block font-mono">
            🏦 Кредиты и финансовые обязательства
          </span>
          <p className="text-stone-300 leading-relaxed">
            • <strong>Банковский заем:</strong> выдается в любой момент с шагом в 1 000 $ под 10%/мес (каждая 1 000 $ кредита списывает по 100 $/мес из вашего Cashflow). Гасится частями по 1 000 $.
          </p>
          <p className="text-stone-300 leading-relaxed">
            • <strong>Потребительские долги (авто, кредитки, ипотека на жилье):</strong> гасятся только целиком разовым платежом в панели баланса.
          </p>
        </div>

        {/* Кнопки действий */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => setShowFullRules(true)}
            className="w-full bg-[#4a154b] hover:bg-[#5e1b5f] active:scale-[0.99] border-2 border-amber-400/40 text-amber-200 font-bold py-3 rounded-2xl text-xs sm:text-sm transition cursor-pointer flex items-center justify-center space-x-2 shadow-md uppercase tracking-wider"
          >
            <span>📖</span>
            <span>ПОЛНЫЙ СВОД ПРАВИЛ И ОПИСАНИЕ СЕКТОРОВ</span>
          </button>

          <button
            onClick={onAcceptRules}
            className="w-full bg-amber-400 hover:bg-amber-300 active:scale-[0.98] transition-all text-stone-950 font-black py-3.5 rounded-2xl text-sm sm:text-base shadow-lg shadow-amber-500/30 cursor-pointer uppercase tracking-wider"
          >
            НАЧАТЬ ИГРУ ➔
          </button>
        </div>
      </div>

      {/* Модальное окно с полными правилами в стиле книги правил */}
      {showFullRules && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#fcf9f2] border-2 border-stone-300 w-full max-w-3xl rounded-3xl p-5 sm:p-7 shadow-2xl space-y-4 text-stone-900 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col font-sans">
            
            {/* Хедер модалки */}
            <div className="flex justify-between items-center border-b-2 border-stone-300 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">📜</span>
                <h3 className="text-base sm:text-lg font-black text-[#4a154b] tracking-wide">
                  Официальный свод правил Cashflow 101
                </h3>
              </div>
              <button
                onClick={() => setShowFullRules(false)}
                className="w-8 h-8 bg-stone-200 hover:bg-stone-300 rounded-full flex items-center justify-center text-stone-700 text-sm font-bold cursor-pointer transition"
              >
                ✕
              </button>
            </div>

            {/* Контент правил со скроллом */}
            <div className="flex-1 overflow-y-auto space-y-4 text-xs sm:text-sm leading-relaxed pr-2">
              
              {/* 1. Цель и главная идея игры */}
              <div className="bg-[#f4efe4] p-4 rounded-2xl border border-stone-300 space-y-2 shadow-sm">
                <strong className="text-[#4a154b] font-bold block text-sm sm:text-base border-b border-stone-300 pb-1">
                  1. Цель и структура игры
                </strong>
                <p className="text-stone-800">Игра разделена на два фундаментальных этапа:</p>
                <div className="space-y-2 pl-1 text-stone-800">
                  <p>
                    🌀 <strong className="text-stone-950">Малый круг («Крысиные бега» / Rat Race):</strong> симуляция жизни от зарплаты до зарплаты.<br />
                    • <strong>Главная цель этапа:</strong> создать пассивный доход (от недвижимости, акций, бизнеса), который превысит ваши общие ежемесячные расходы.<br />
                    • Как только <strong>Пассивный доход &gt; Общие расходы</strong>, вы вырываетесь из крысиных бегов и переходите на Скоростную дорожку.
                  </p>
                  <p>
                    🚀 <strong className="text-stone-950">Большой круг («Скоростная дорожка» / Fast Track):</strong> мир крупного капитала и больших инвестиций.<br />
                    • <strong>Победа в игре (одно из двух условий):</strong><br />
                    &nbsp;&nbsp;1. <em>Покупка своей Мечты:</em> попасть на выбранную в начале игры карточку Мечты и выкупить её за наличные.<br />
                    &nbsp;&nbsp;2. <em>Финансовое господство:</em> увеличить свой ежемесячный денежный поток на Fast Track на <strong>+50 000 $</strong> от стартового значения.
                  </p>
                </div>
              </div>

              {/* 2. Финансовый отчет */}
              <div className="bg-[#f4efe4] p-4 rounded-2xl border border-stone-300 space-y-2 shadow-sm">
                <strong className="text-[#4a154b] font-bold block text-sm sm:text-base border-b border-stone-300 pb-1">
                  2. Финансовый отчет (Основа игры)
                </strong>
                <p className="text-stone-800">Каждое действие в игре фиксируется в финансовом бланке:</p>
                <div className="space-y-1.5 pl-1 text-stone-800">
                  <p>• <strong>Доходы (Income):</strong></p>
                  <p className="pl-4 text-stone-700">
                    - <em>Заработная плата (Salary):</em> фиксированная зарплата по профессии.<br />
                    - <em>Пассивный доход (Passive Income):</em> дивиденды по акциям, проценты по депозитам, чистый арендный доход от недвижимости, доход от бизнеса.<br />
                    - <strong>Общий доход (Total Income)</strong> = Зарплата + Пассивный доход.
                  </p>
                  <p>• <strong>Расходы (Expenses):</strong> Налоги, ипотека, кредиты на авто, кредитные карты, мелкие кредиты, прочие расходы и расходы на детей.</p>
                  <p>• <strong>Денежный поток (Monthly Cashflow / Чистый доход):</strong></p>
                  <div className="bg-[#240a2c] text-amber-300 p-2.5 rounded-xl font-mono font-bold text-center text-xs sm:text-sm my-1 shadow-inner">
                    Cashflow = Общий доход - Общие расходы
                  </div>
                  <p className="text-stone-700">Именно эту сумму игрок получает на руки при попадании или прохождении сектора «День получки» (Payday).</p>
                </div>
              </div>

              {/* 3. Малый круг */}
              <div className="bg-[#f4efe4] p-4 rounded-2xl border border-stone-300 space-y-2 shadow-sm">
                <strong className="text-[#4a154b] font-bold block text-sm sm:text-base border-b border-stone-300 pb-1">
                  3. Малый круг: Секторы и механики
                </strong>
                <div className="space-y-2 text-stone-800">
                  <p>🟢 <strong className="text-emerald-800">День получки (Payday):</strong> Вы получаете сумму своего текущего Денежного потока (Cashflow). Если Cashflow отрицательный (из-за долгов), вы выплачиваете эту сумму в банк.</p>
                  <p>🔵 <strong className="text-blue-800">Возможность (Opportunity):</strong> Выбор между Мелкими сделками (стоимость до $5,000 — акции, недорогая земля, квартиры 2/1) и Крупными сделками (от $6,000 — многоквартирные дома, франшизы, торговые площади).</p>
                  <p>🟠 <strong className="text-amber-800">Рынок (Market):</strong> События, влияющие на всех игроков: покупатели недвижимости, слияния компаний, рост/падение цен на акции. Позволяет выгодно продать активы и зафиксировать прибыль.</p>
                  <p>🔴 <strong className="text-rose-800">Всякая всячина (Doodads):</strong> Обязательные непредвиденные траты: покупка техники, отпуск, ремонт автомобиля, штрафы. Сумма списывается сразу.</p>
                  <p>👶 <strong className="text-pink-800">Ребенок (Baby):</strong> Добавляет в графу расходов затраты на ребенка (максимум до 3 детей за игру). Уменьшает ваш ежемесячный Cashflow.</p>
                  <p>🟣 <strong className="text-purple-800">Увольнение (Downturn):</strong> Временная потеря работы. Выплачивается сумма ваших полных Общих расходов в банк, и вы пропускаете 2 хода.</p>
                  <p>🤝 <strong className="text-teal-800">Благотворительность (Charity):</strong> Добровольная опция: пожертвование 10% от общего дохода дает право бросать 2 кубика вместо одного на протяжении 3 ходов.</p>
                </div>
              </div>

              {/* 4. Большой круг */}
              <div className="bg-[#f4efe4] p-4 rounded-2xl border border-stone-300 space-y-2 shadow-sm">
                <strong className="text-[#4a154b] font-bold block text-sm sm:text-base border-b border-stone-300 pb-1">
                  4. Большой круг (Fast Track): Секторы и механики
                </strong>
                <p className="text-stone-800">На Скоростной дорожке правила меняются: зарплаты больше нет, а ваш стартовый денежный поток рассчитывается как:</p>
                <div className="bg-[#240a2c] text-amber-300 p-2.5 rounded-xl font-mono font-bold text-center text-xs sm:text-sm my-1 shadow-inner">
                  Cashflow на Fast Track = Пассивный доход с Малого круга × 100
                </div>
                <div className="space-y-2 text-stone-800 mt-2">
                  <p>💰 <strong className="text-emerald-800">День инвестора (Cashflow Day):</strong> Вы получаете полную сумму своего обновленного денежного потока Fast Track.</p>
                  <p>🏢 <strong className="text-blue-800">Бизнес-инвестиции (Business):</strong> Покупка готового бизнеса (АЗС, отели, клиники, IT-компании) за полную стоимость наличными. Сразу добавляет указанный Cashflow к вашему доходу.</p>
                  <p>🏝️ <strong className="text-amber-800">Мечта (Dream):</strong> Позволяет приобрести выбранную мечту (Остров, Яхта, Замок, Сафари) при наличии всей суммы наличными. Если это ваша выбранная мечта — вы побеждаете в игре.</p>
                  <p>⚖️ <strong className="text-rose-800">Налоговый аудит (Tax Audit):</strong> Внеплановая проверка налоговой: списывается 50% от всех текущих наличных денег.</p>
                  <p>🏛️ <strong className="text-fuchsia-800">Судебный иск (Lawsuit):</strong> Корпоративный или патентный спор: фиксированная выплата штрафа от $50,000 до $60,000 в банк.</p>
                  <p>💔 <strong className="text-red-800">Развод (Divorce):</strong> Раздел имущества: игрок теряет все свободные наличные деньги ($0 на руках).</p>
                  <p>🤝 <strong className="text-teal-800">Благотворительность Fast Track:</strong> Пожертвование $50,000 дает право бросать сразу 3 кубика для быстрого перемещения по дорожке.</p>
                </div>
              </div>

              {/* 5. FAQ */}
              <div className="bg-[#f4efe4] p-4 rounded-2xl border border-stone-300 space-y-2.5 shadow-sm">
                <strong className="text-[#4a154b] font-bold block text-sm sm:text-base border-b border-stone-300 pb-1">
                  5. Ответы на частые вопросы (FAQ)
                </strong>
                <div className="space-y-2.5 text-stone-800">
                  <div>
                    <strong className="text-stone-950 font-bold">1. Как брать кредиты в игре?</strong>
                    <p className="text-stone-700">Кредит в банке можно брать с шагом в 1 000 $ (или кратными суммами). Банковский процент составляет 10% в месяц. То есть кредит на $10,000 добавляет +$1,000 в графу расходов, снижая ваш ежемесячный Cashflow.</p>
                  </div>
                  <div>
                    <strong className="text-stone-950 font-bold">2. Что делать, если не хватает денег на сделку?</strong>
                    <p className="text-stone-700">Вы можете взять кредит в банке (если текущий Cashflow позволяет платить проценты). Если сделка невыгодна или не хватает кредитного лимита — от карточки можно отказаться или предложить ее перекупить другим игрокам через аукцион.</p>
                  </div>
                  <div>
                    <strong className="text-stone-950 font-bold">3. Что происходит при банкротстве?</strong>
                    <p className="text-stone-700">
                      Если при попадании на Payday или обязательные расходы ваш Cashflow отрицательный и наличных нет:<br />
                      1. Вы обязаны продать активы (недвижимость, акции) за 50% от их рыночной стоимости.<br />
                      2. Погасить долги.<br />
                      3. Если даже после продажи активов Cashflow остается отрицательным — объявляется банкротство (перезапуск игры или выбывание).
                    </p>
                  </div>
                  <div>
                    <strong className="text-stone-950 font-bold">4. В чем разница между приростом капитала и денежным потоком?</strong>
                    <p className="text-stone-700">
                      • <strong>Прирост капитала (Capital Gain):</strong> покупка дешевых акций по $5 с последующей продажей по $40 на секторе «Рынок». Дает много наличных для первого взноса.<br />
                      • <strong>Денежный поток (Cashflow):</strong> покупка доходного дома, который каждый месяц приносит +$300 чистыми. Приближает к выходу из Крысиных бегов.
                    </p>
                  </div>
                  <div>
                    <strong className="text-stone-950 font-bold">5. Как работает ипотека на недвижимость при покупке и продаже?</strong>
                    <p className="text-stone-700">
                      • <strong>При покупке:</strong> Вы платите только <em>Первый взнос (Down Payment)</em>. Остаток суммы банк берет на себя как <em>Ипотеку (Mortgage)</em>. Ежемесячный платеж по ней уже учтен в графе Cashflow объекта (арендаторы платят её за вас).<br />
                      • <strong>При продаже на Рынке:</strong> Покупатель выплачивает полную сумму. Банк автоматически забирает остаток ипотеки, а вы получаете на руки разницу: <code>Чистая выплата = Цена покупателя - Ипотека</code>.
                    </p>
                  </div>
                </div>
              </div>

              {/* 6. Стратегия */}
              <div className="bg-[#f4efe4] p-4 rounded-2xl border border-stone-300 space-y-2 shadow-sm">
                <strong className="text-[#4a154b] font-bold block text-sm sm:text-base border-b border-stone-300 pb-1">
                  6. Базовая выигрышная стратегия
                </strong>
                <div className="space-y-1 text-stone-800">
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
              className="w-full bg-[#4a154b] hover:bg-[#5e1b5f] py-3.5 rounded-xl text-xs sm:text-sm font-bold text-amber-200 border border-amber-400/30 transition cursor-pointer uppercase tracking-wider shadow-md"
            >
              ПОНЯТНО, ЗАКРЫТЬ ПРАВИЛА
            </button>
          </div>
        </div>
      )}
    </section>
  );
};