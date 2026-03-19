interface MapFadeAnimationProps {
  from: string;
  to: string;
  labelFrom?: string;
  labelTo?: string;
  caption?: string;
  className?: string;
}

export function MapFadeAnimation({
  from,
  to,
  labelFrom,
  labelTo,
  caption,
  className = "",
}: MapFadeAnimationProps) {
  return (
    <div
      className={`relative rounded-xl overflow-hidden border border-amber-800/30 shadow-lg shadow-black/40 select-none ${className}`}
    >
      <div className="relative w-full" style={{ aspectRatio: "420/500" }}>
        <img
          src={to}
          alt={labelTo ?? "Карта след"}
          className="absolute inset-0 w-full h-full object-cover object-center"
          draggable={false}
        />
        <img
          src={from}
          alt={labelFrom ?? "Карта преди"}
          className="absolute inset-0 w-full h-full object-cover object-center map-crossfade"
          draggable={false}
        />
        {(labelFrom || labelTo) && (
          <div className="absolute top-2 left-2 right-2 flex justify-between pointer-events-none">
            {labelFrom && (
              <span className="bg-stone-900/80 text-amber-300 text-[10px] font-serif px-2 py-0.5 rounded border border-amber-700/30">
                {labelFrom}
              </span>
            )}
            {labelTo && (
              <span className="bg-stone-900/80 text-amber-300 text-[10px] font-serif px-2 py-0.5 rounded border border-amber-700/30">
                {labelTo}
              </span>
            )}
          </div>
        )}
      </div>
      {caption && (
        <div className="bg-stone-900/80 px-3 py-2 flex items-center gap-2">
          <span className="text-amber-600 text-sm shrink-0">🗺️</span>
          <p className="text-stone-400 text-xs font-serif italic">{caption}</p>
        </div>
      )}
    </div>
  );
}
