import { useState } from "react";

interface LoginScreenProps {
  onEnter: (name: string) => void;
}

export function LoginScreen({ onEnter }: LoginScreenProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Моля, въведи своето име, воине!");
      return;
    }
    onEnter(trimmed);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-8 left-8 text-amber-900/15 text-9xl">⚜️</div>
        <div className="absolute bottom-8 right-8 text-amber-900/15 text-9xl">⚜️</div>
        <div className="absolute top-1/2 -translate-y-1/2 left-6 text-amber-900/10 text-7xl">⚔️</div>
        <div className="absolute top-1/2 -translate-y-1/2 right-6 text-amber-900/10 text-7xl">⚔️</div>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-amber-900/10 text-5xl">🛡️</div>
      </div>

      <div className="max-w-md w-full text-center relative z-10">
        {/* Crown */}
        <div className="text-7xl mb-4 drop-shadow-lg">👑</div>

        {/* Decorative top */}
        <div className="flex items-center gap-3 mb-4 justify-center">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-700/50" />
          <span className="text-amber-600/60 text-[11px] tracking-[0.4em] uppercase font-serif">
            Царство България
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-700/50" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-amber-100 font-serif tracking-wide mb-2">
          Иван Асен II
        </h1>
        <p className="text-amber-400/70 font-serif text-lg tracking-widest mb-8">
          Историческа стратегическа игра
        </p>

        {/* Form panel */}
        <div className="bg-stone-900/70 border border-amber-800/40 rounded-2xl p-8 backdrop-blur-sm shadow-2xl shadow-black/50">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="h-px flex-1 bg-amber-800/40" />
            <span className="text-amber-700 text-base">✦</span>
            <div className="h-px flex-1 bg-amber-800/40" />
          </div>

          <p className="text-stone-300 leading-relaxed mb-6 text-sm md:text-base">
            Преди да встъпиш в ролята на великия цар, кажи ни своето<br />
            <span className="text-amber-300 font-semibold">благородно владетелско Ваше</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                placeholder="Въведи своето ime..."
                maxLength={40}
                className="w-full bg-stone-950/80 border border-amber-800/50 focus:border-amber-500/70 rounded-xl px-4 py-3 text-amber-100 placeholder-stone-600 font-serif text-lg outline-none transition-colors text-center tracking-wide"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-red-400/80 text-sm font-serif animate-fade-in">
                ⚠ {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-700 hover:bg-amber-600 active:bg-amber-800 text-amber-100 font-serif font-bold text-base rounded-xl border-2 border-amber-500/50 shadow-lg shadow-amber-900/30 transition-all duration-200 tracking-[0.2em] uppercase"
            >
              ⚜ Влез в Двореца ⚜
            </button>
          </form>

          <div className="flex items-center gap-3 mt-6">
            <div className="h-px flex-1 bg-amber-800/30" />
            <span className="text-stone-600 text-[10px] tracking-widest uppercase font-serif">
              1218 — 1241 г.
            </span>
            <div className="h-px flex-1 bg-amber-800/30" />
          </div>
        </div>

        <p className="text-stone-600 text-xs mt-5 tracking-wide font-serif">
          Второто Българско Царство • 15 исторически казуса
        </p>
      </div>
    </div>
  );
}
