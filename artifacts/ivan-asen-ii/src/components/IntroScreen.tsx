interface IntroScreenProps {
  playerName: string;
  onStart: () => void;
}

export function IntroScreen({ playerName, onStart }: IntroScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-10 left-10 text-amber-900/20 text-8xl">⚜️</div>
        <div className="absolute bottom-10 right-10 text-amber-900/20 text-8xl">⚜️</div>
        <div className="absolute top-1/2 left-4 text-amber-900/10 text-6xl">⚔️</div>
        <div className="absolute top-1/2 right-4 text-amber-900/10 text-6xl">⚔️</div>
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        <div className="text-6xl mb-4">👑</div>

        <div className="flex items-center gap-3 mb-5 justify-center">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-600/60" />
          <span className="text-amber-600/60 text-sm tracking-[0.4em] uppercase font-serif">
            Царство България
          </span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-600/60" />
        </div>

        {/* Personalized greeting */}
        <p className="text-stone-400 font-serif text-base mb-1">Добре дошъл,</p>
        <h1 className="text-4xl md:text-5xl font-bold text-amber-100 font-serif tracking-wide mb-1">
          {playerName}
        </h1>
        <h2 className="text-xl md:text-2xl text-amber-400/80 font-serif tracking-widest mb-6">
          Историческа игра — Иван Асен II
        </h2>

        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="h-px flex-1 max-w-24 bg-amber-800/40" />
          <span className="text-amber-700 text-xl">✦</span>
          <div className="h-px flex-1 max-w-24 bg-amber-800/40" />
        </div>

        {/* Description */}
        <div className="bg-stone-900/60 border border-amber-800/30 rounded-xl p-6 mb-7 text-left space-y-3">
          <p className="text-stone-200 leading-relaxed">
            Годината е <strong className="text-amber-300">1218 г.</strong> Ти поемаш управлението на Второто Българско Царство и трябва да вземеш{" "}
            <strong className="text-amber-300">15 ключови решения</strong> от живота на цар Иван Асен II.
          </p>
          <p className="text-stone-300 leading-relaxed text-sm">
            Всяко твоя избор ще повлияе на трите показателя на царството. Мъдрият владетел балансира военната сила, дипломатическите отношения и благоденствието на народа. Историческите летописи ще се разкриват <em>след</em> всяко решение.
          </p>
          <p className="text-stone-400 text-sm italic">
            В края на играта ще можеш да изтеглиш царска грамота с твоето звание и резултат.
          </p>
        </div>

        {/* Stats legend */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: "⚔️", label: "Военна мощ", desc: "Сила на армията и отбраната" },
            { icon: "🕊️", label: "Дипломация", desc: "Международни отношения и съюзи" },
            { icon: "🌾", label: "Благоденствие", desc: "Живот и просперитет на народа" },
          ].map((stat) => (
            <div key={stat.label} className="bg-stone-900/40 border border-stone-700/40 rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-amber-200 text-xs font-semibold font-serif">{stat.label}</div>
              <div className="text-stone-500 text-xs mt-0.5">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Start button */}
        <button
          onClick={onStart}
          className="px-10 py-4 bg-amber-700 hover:bg-amber-600 active:bg-amber-800 text-amber-100 font-serif font-bold text-lg rounded-xl border-2 border-amber-500/50 shadow-lg shadow-amber-900/40 transition-all duration-200 tracking-widest uppercase"
        >
          ⚜️ Встъпи в Царството ⚜️
        </button>

        <p className="text-stone-500 text-xs mt-4 tracking-wide font-serif">
          1218 — 1241 г. • Второто Българско Царство
        </p>
      </div>
    </div>
  );
}
