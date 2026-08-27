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
          <div className="bg-slate-900 border border-purple-700/60 w-full max-w-2xl rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 text-slate-100 animate-in fade-in zoom-in-95 duration-200 max-h-[88vh] flex flex-col">
            
            {/* Хедер модалки */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xl">📜</span>
                <h3 className="text-base sm:text-lg font-black text-amber-300">Полный свод правил Cashflow</h3>
              </div>
              <button
                onClick={() => setShowFullRules(false)}
                className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-white text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Контент правил со скроллом */}
            <div className="flex-1 overflow-y-auto space-y-4 text-xs sm:text-[13px] leading-relaxed pr-1">
              
              {/* 1. Порядок хода */}
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                <strong className="text-emerald-400 font-bold block text-sm">1. Очередность и ход игры</strong>
                <p className="text-slate-300">
                  Игроки ходят по очереди по часовой стрелке. В свой ход игрок нажимает кнопку <strong>«Бросить кубик»</strong>, перемещает фишку на выпавшее число секторов и разыгрывает действие той клетки, на которую приземлился.
                </p>
              </div>

              {/* 2. Описание секторов поля */}
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <strong className="text-amber-400 font-bold block text-sm">2. Значение клеток Малого круга</strong>
                <div className="space-y-1.5 text-slate-300">
                  <p>🟢 <strong className="text-emerald-400">День получки (Payday):</strong> При пересечении или остановке на этой клетке игрок получает свой месячный Денежный поток (Monthly Cashflow). В ручном режиме не забудь нажать кнопку «Забрать зарплату», пока не закончился ход!</p>
                  <p>🔵 <strong className="text-blue-400">Возможность (Сделка):</strong> Позволяет выбрать мелкую (до 5 000$) или крупную сделку (от 6 000$). Вы можете купить квартиру, акции, бизнес, авто или перепродать право на сделку другому игроку через встроенный аукцион.</p>
                  <p>🟠 <strong className="text-amber-400">Рынок (Market):</strong> Карточка события, которая открывается сразу для всех игроков. Покупатели предлагают выкупить недвижимость, автопарки, склады (РЦ) или объявляют сплит/рост стоимости акций.</p>
                  <p>🔴 <strong className="text-rose-400">Всякая всячина (Doodad):</strong> Непредвиденные бытовые расходы и траты на роскошь (ремонт, отпуск, покупки), которые списываются с баланса моментально.</p>
                  <p>🤝 <strong className="text-teal-400">Благотворительность (Charity):</strong> Пожертвовав 10% от общего дохода, игрок получает право бросать сразу <strong>2 кубика</strong> на протяжении следующих 3 ходов.</p>
                  <p>🟣 <strong className="text-purple-400">Увольнение (Downturn):</strong> Игрок теряет сумму своих общих месячных расходов и пропускает 2 следующих хода.</p>
                  <p>👶 <strong className="text-pink-400">Ребенок (Baby):</strong> Добавляет в графу расходов затраты на воспитание ребенка (максимум до 3 детей на игрока).</p>
                </div>
              </div>

              {/* 3. Перепродажа сделок между игроками */}
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                <strong className="text-blue-400 font-bold block text-sm">3. Торговля и перепродажа сделок</strong>
                <p className="text-slate-300">
                  Если вам выпала перспективная сделка, но не хватает собственных средств или кредитного лимита, вы можете прямо в окне сделки выставить её на продажу любому сопернику за столом, назначив свою комиссию.
                </p>
              </div>

              {/* 4. Банкротство */}
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                <strong className="text-rose-400 font-bold block text-sm">4. Банкротство и дефицит средств</strong>
                <p className="text-slate-300">
                  Если баланс наличных уходит в минус и вы не можете платить по обязательствам, игра предложит экстренно ликвидировать имеющиеся активы за 50% от их первоначального взноса или объявить официальное банкротство (списание 50% долгов и пропуск 3 ходов).
                </p>
              </div>
            </div>

            {/* Кнопка закрытия модалки */}
            <button
              onClick={() => setShowFullRules(false)}
              className="w-full bg-slate-800 hover:bg-slate-700 py-3 rounded-xl text-xs font-bold text-slate-200 transition cursor-pointer"
            >
              ПОНЯТНО, ЗАКРЫТЬ ПРАВИЛА
            </button>
          </div>
        </div>
      )}
    </section>
  );
};