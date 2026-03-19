interface IntroScreenProps {
  onStart: () => void;
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-amber-900/20 text-8xl select-none">⚜️</div>
        <div className="absolute bottom-10 right-10 text-amber-900/20 text-8xl select-none">⚜️</div>
        <div className="absolute top-1/2 left-4 text-amber-900/10 text-6xl select-none">⚔️</div>
        <div className="absolute top-1/2 right-4 text-amber-900/10 text-6xl select-none">⚔️</div>
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Crown decoration */}
        <div className="text-6xl mb-4">👑</div>

        {/* Decorative border top */}
        <div className="flex items-center gap-3 mb-6 justify-center">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-600/60" />
          <span className="text-amber-600/60 text-sm tracking-[0.4em] uppercase font-serif">
            Царство България
          </span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-600/60" />
        </div>

        {/* Main title */}
        <h1 className="text-4xl md:text-5xl font-bold text-amber-100 font-serif tracking-wide mb-2">
          Иван Асен II
        </h1>
        <h2 className="text-xl md:text-2xl text-amber-400/80 font-serif tracking-widest mb-6">
          Историческа стратегическа игра
        </h2>

        {/* Decorative line */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="h-px flex-1 max-w-24 bg-amber-800/40" />
          <span className="text-amber-700 text-xl">✦</span>
          <div className="h-px flex-1 max-w-24 bg-amber-800/40" />
        </div>

        {/* Description */}
        <div className="bg-stone-900/60 border border-amber-800/30 rounded-xl p-6 mb-8 text-left">
          <p className="text-stone-200 leading-relaxed mb-4">
            Годината е <strong className="text-amber-300">1218</strong>. Ти поемаш управлението на Второто Българско Царство и трябва да водиш страната си чрез{" "}
            <strong className="text-amber-300">15 исторически казуса</strong> от живота на великия цар Иван Асен II.
          </p>
          <p className="text-stone-300 leading-relaxed text-sm">
            Всеки твой избор ще влияе на три показателя на царството. Мъдрият владетел трябва да балансира военната мощ, дипломатическите отношения и благоденствието на народа.
          </p>
        </div>

        {/* Stats legend */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: "⚔️", label: "Военна мощ", desc: "Сила на армията" },
            { icon: "🕊️", label: "Дипломация", desc: "Международни отношения" },
            { icon: "🌾", label: "Благоденствие", desc: "Живот на народа" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-stone-900/40 border border-stone-700/40 rounded-lg p-3 text-center"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-amber-200 text-xs font-semibold font-serif">
                {stat.label}
              </div>
              <div className="text-stone-400 text-xs mt-0.5">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Start button */}
        <button
          onClick={onStart}
          className="px-10 py-4 bg-amber-700 hover:bg-amber-600 active:bg-amber-800 text-amber-100 font-serif font-bold text-lg rounded-xl border-2 border-amber-500/50 shadow-lg shadow-amber-900/40 transition-all duration-200 tracking-widest uppercase"
        >
          ⚜️ Започни Царуването ⚜️
        </button>

        <p className="text-stone-500 text-xs mt-4 tracking-wide">
          1218 — 1241 г. • Второто Българско Царство
        </p>
      </div>
    </div>
  );
}
