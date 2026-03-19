interface EndScreenProps {
  military: number;
  diplomacy: number;
  prosperity: number;
  onRestart: () => void;
}

function getTitle(military: number, diplomacy: number, prosperity: number) {
  const total = military + diplomacy + prosperity;
  const avg = total / 3;

  if (avg >= 75) return { title: "Велики Цар", subtitle: "Твоето управление ще бъде помнено с векове!", icon: "👑" };
  if (avg >= 60) return { title: "Мъдър Владетел", subtitle: "България процъфтява под твоята власт.", icon: "⚜️" };
  if (avg >= 45) return { title: "Достоен Управник", subtitle: "Царството устоя на предизвикателствата.", icon: "🛡️" };
  if (avg >= 30) return { title: "Слаб Цар", subtitle: "Историята ще помни твоите грешки.", icon: "⚔️" };
  return { title: "Злощастен Владетел", subtitle: "Царството е в упадък след твоето управление.", icon: "💀" };
}

function StatResult({ icon, label, value }: { icon: string; label: string; value: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  const color = clamped >= 60 ? "#22c55e" : clamped >= 40 ? "#eab308" : "#ef4444";
  return (
    <div className="flex items-center gap-3 py-2">
      <span className="text-xl w-7 text-center">{icon}</span>
      <span className="text-stone-300 font-serif text-sm w-32">{label}</span>
      <div className="flex-1 h-3 bg-stone-900/60 rounded-full border border-stone-700/40 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${clamped}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-amber-200 font-bold text-sm w-8 text-right">{clamped}</span>
    </div>
  );
}

export function EndScreen({ military, diplomacy, prosperity, onRestart }: EndScreenProps) {
  const { title, subtitle, icon } = getTitle(military, diplomacy, prosperity);
  const total = Math.round((military + diplomacy + prosperity) / 3);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full text-center">
        {/* Title */}
        <div className="text-6xl mb-4">{icon}</div>

        <div className="flex items-center gap-3 mb-4 justify-center">
          <div className="h-px w-16 bg-amber-700/40" />
          <span className="text-amber-500/60 text-xs tracking-[0.4em] uppercase font-serif">
            Краят на царуването
          </span>
          <div className="h-px w-16 bg-amber-700/40" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-amber-100 font-serif mb-2">{title}</h1>
        <p className="text-stone-300 italic mb-8">{subtitle}</p>

        {/* Stats summary */}
        <div className="bg-stone-900/60 border border-amber-800/30 rounded-xl p-6 mb-6 text-left">
          <div className="text-amber-400/70 text-xs tracking-widest uppercase text-center mb-4 font-serif">
            Крайни резултати
          </div>
          <StatResult icon="⚔️" label="Военна мощ" value={military} />
          <StatResult icon="🕊️" label="Дипломация" value={diplomacy} />
          <StatResult icon="🌾" label="Благоденствие" value={prosperity} />
          <div className="border-t border-stone-700/40 mt-3 pt-3 flex items-center justify-between">
            <span className="text-stone-400 font-serif text-sm">Средна оценка</span>
            <span className="text-amber-300 font-bold text-xl">{total} / 100</span>
          </div>
        </div>

        {/* Historical note */}
        <div className="bg-amber-950/30 border-l-4 border-amber-600/50 rounded-r-lg p-4 mb-8 text-left">
          <p className="text-amber-200/80 italic text-sm leading-relaxed">
            "Иван Асен II е един от най-великите владетели на средновековна България. В действителност той управлява мъдро и остава в историята като Цар миротворец, достигнал максимума на Второто Българско Царство."
          </p>
          <p className="text-amber-400/50 text-xs mt-2 font-serif">— Историческа оценка, XIII в.</p>
        </div>

        {/* Restart button */}
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-amber-700 hover:bg-amber-600 text-amber-100 font-serif font-bold rounded-xl border-2 border-amber-500/50 shadow-lg transition-all tracking-widest uppercase text-sm"
        >
          ⚔️ Играй Отново
        </button>
      </div>
    </div>
  );
}
