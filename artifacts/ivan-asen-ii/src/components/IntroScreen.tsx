interface IntroScreenProps {
  playerName: string;
  onStart: () => void;
}

export function IntroScreen({ playerName, onStart }: IntroScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-12 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-8 left-8 text-amber-900/20 text-6xl sm:text-8xl hidden sm:block">⚜️</div>
        <div className="absolute bottom-8 right-8 text-amber-900/20 text-6xl sm:text-8xl hidden sm:block">⚜️</div>
        <div className="absolute top-1/2 left-4 text-amber-900/10 text-5xl sm:text-6xl hidden md:block">⚔️</div>
        <div className="absolute top-1/2 right-4 text-amber-900/10 text-5xl sm:text-6xl hidden md:block">⚔️</div>
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">👑</div>

        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 justify-center">
          <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-amber-600/60" />
          <span className="text-amber-600/60 text-[10px] sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase font-serif">
            Царство България
          </span>
          <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-amber-600/60" />
        </div>

        <p className="text-stone-400 font-serif text-sm sm:text-base mb-1">Добре дошъл,</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-100 font-serif tracking-wide mb-1 break-words">
          {playerName}
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl text-amber-400/80 font-serif tracking-widest mb-5 sm:mb-6">
          Историческа игра — Иван Асен II
        </h2>

        <div className="flex items-center gap-3 mb-6 sm:mb-8 justify-center">
          <div className="h-px flex-1 max-w-24 bg-amber-800/40" />
          <span className="text-amber-700 text-xl">✦</span>
          <div className="h-px flex-1 max-w-24 bg-amber-800/40" />
        </div>

        {/* Description */}
        <div className="bg-stone-900/60 border border-amber-800/30 rounded-xl p-4 sm:p-6 mb-5 sm:mb-7 text-left space-y-3">
          <p className="text-stone-200 leading-relaxed text-sm sm:text-base">
            Годината е <strong className="text-amber-300">1218 г.</strong> Ти поемаш управлението на Второто Българско Царство и трябва да вземеш{" "}
            <strong className="text-amber-300">15 ключови решения</strong> от живота на цар Иван Асен II.
          </p>
          <p className="text-stone-300 leading-relaxed text-xs sm:text-sm">
            Всяко твоя избор ще повлияе на трите показателя на царството. Мъдрият владетел балансира военната сила, дипломатическите отношения и благоденствието на народа. Историческите летописи ще се разкриват <em>след</em> всяко решение.
          </p>
          <p className="text-stone-400 text-xs sm:text-sm italic">
            В края на играта ще можеш да изтеглиш царска грамота с твоето звание и резултат.
          </p>
        </div>

        {/* Stats legend */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8">
          {[
            { icon: "⚔️", label: "Военна мощ", desc: "Сила на армията и отбраната" },
            { icon: "🕊️", label: "Дипломация", desc: "Международни отношения и съюзи" },
            { icon: "🌾", label: "Благоденствие", desc: "Живот и просперитет на народа" },
          ].map((stat) => (
            <div key={stat.label} className="bg-stone-900/40 border border-stone-700/40 rounded-lg p-2 sm:p-3 text-center">
              <div className="text-xl sm:text-2xl mb-1">{stat.icon}</div>
              <div className="text-amber-200 text-[10px] sm:text-xs font-semibold font-serif leading-tight">{stat.label}</div>
              <div className="text-stone-500 text-[9px] sm:text-xs mt-0.5 leading-tight hidden sm:block">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Start button */}
        <button
          onClick={onStart}
          className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-amber-700 hover:bg-amber-600 active:bg-amber-800 text-amber-100 font-serif font-bold text-base sm:text-lg rounded-xl border-2 border-amber-500/50 shadow-lg shadow-amber-900/40 transition-all duration-200 tracking-[0.15em] sm:tracking-widest uppercase"
        >
          ⚜️ Встъпи в Царството ⚜️
        </button>

        <p className="text-stone-500 text-xs mt-3 sm:mt-4 tracking-wide font-serif">
          1218 — 1241 г. • Второто Българско Царство
        </p>
      </div>
    </div>
  );
}
