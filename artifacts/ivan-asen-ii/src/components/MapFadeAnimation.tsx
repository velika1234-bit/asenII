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
      className={`relative rounded-lg overflow-hidden border border-amber-800/30 shadow-md shadow-black/40 select-none ${className}`}
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
          <div className="absolute top-1.5 left-1.5 right-1.5 flex justify-between gap-1 pointer-events-none">
            {labelFrom && (
              <span className="bg-stone-900/85 text-amber-300 text-[8px] sm:text-[10px] font-serif px-1 sm:px-2 py-0.5 rounded border border-amber-700/30 leading-tight truncate">
                {labelFrom}
              </span>
            )}
            {labelTo && (
              <span className="bg-stone-900/85 text-amber-300 text-[8px] sm:text-[10px] font-serif px-1 sm:px-2 py-0.5 rounded border border-amber-700/30 leading-tight truncate">
                {labelTo}
              </span>
            )}
          </div>
        )}
      </div>
      {caption && (
        <div className="bg-stone-900/80 px-2 sm:px-3 py-1.5 sm:py-2 flex items-start gap-1.5 sm:gap-2">
          <span className="text-amber-600 text-xs shrink-0 mt-px hidden sm:inline">🗺️</span>
          <p className="text-stone-400 text-[9px] sm:text-[10px] md:text-xs font-serif italic leading-snug line-clamp-2">
            {caption}
          </p>
        </div>
      )}
    </div>
  );
}
