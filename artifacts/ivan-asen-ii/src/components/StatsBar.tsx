interface StatsBarProps {
  military: number;
  diplomacy: number;
  prosperity: number;
}

function StatItem({
  label,
  shortLabel,
  value,
  icon,
  color,
}: {
  label: string;
  shortLabel: string;
  value: number;
  icon: string;
  color: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1 sm:gap-1.5 mb-1">
        <span className="text-base sm:text-lg shrink-0">{icon}</span>
        <span className="text-[9px] sm:text-xs font-semibold tracking-wide sm:tracking-widest uppercase text-amber-200/80 font-serif truncate">
          <span className="sm:hidden">{shortLabel}</span>
          <span className="hidden sm:inline">{label}</span>
        </span>
        <span className="ml-auto text-xs sm:text-sm font-bold text-amber-100 shrink-0">{clamped}</span>
      </div>
      <div className="h-2 sm:h-3 rounded-full bg-stone-900/60 border border-amber-900/40 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${clamped}%`,
            background: `linear-gradient(90deg, ${color}99, ${color})`,
          }}
        />
      </div>
    </div>
  );
}

export function StatsBar({ military, diplomacy, prosperity }: StatsBarProps) {
  return (
    <div className="w-full bg-stone-950/80 border-b-2 border-amber-800/60 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center gap-3 mb-1.5 sm:mb-2 justify-center">
          <div className="h-px flex-1 bg-amber-800/40" />
          <span className="text-amber-400/70 text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase font-serif whitespace-nowrap">
            Показатели на царството
          </span>
          <div className="h-px flex-1 bg-amber-800/40" />
        </div>
        <div className="flex gap-2 sm:gap-4 md:gap-6">
          <StatItem label="Военна мощ" shortLabel="Военна" value={military} icon="⚔️" color="#ef4444" />
          <StatItem label="Дипломация" shortLabel="Диплом." value={diplomacy} icon="🕊️" color="#3b82f6" />
          <StatItem label="Благоденствие" shortLabel="Благод." value={prosperity} icon="🌾" color="#22c55e" />
        </div>
      </div>
    </div>
  );
}
