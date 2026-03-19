import { useState } from "react";
import type { HistoricalCase, Choice } from "../data/cases";

interface CaseCardProps {
  caseData: HistoricalCase;
  caseIndex: number;
  totalCases: number;
  onChoice: (choice: Choice) => void;
}

function EffectBadge({ value, label }: { value: number; label: string }) {
  if (value === 0) return null;
  const positive = value > 0;
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full ${
        positive
          ? "bg-green-900/60 text-green-300 border border-green-700/40"
          : "bg-red-900/60 text-red-300 border border-red-700/40"
      }`}
    >
      {positive ? "+" : ""}{value} {label}
    </span>
  );
}

export function CaseCard({ caseData, caseIndex, totalCases, onChoice }: CaseCardProps) {
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const [imageError, setImageError] = useState(false);

  function handleSelect(choice: Choice) {
    setSelectedChoice(choice);
    setShowOutcome(true);
    setTimeout(() => {
      document.getElementById("outcome-panel")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }

  function handleContinue() {
    if (selectedChoice) {
      onChoice(selectedChoice);
      setSelectedChoice(null);
      setShowOutcome(false);
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-2 text-amber-500/60 text-xs tracking-[0.3em] uppercase mb-2 font-serif">
          <span className="h-px w-8 bg-amber-700/40 inline-block" />
          Казус {caseIndex + 1} от {totalCases}
          <span className="h-px w-8 bg-amber-700/40 inline-block" />
        </div>
        <div className="text-amber-400 text-sm tracking-widest font-serif mb-1">
          {caseData.year}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-amber-100 font-serif tracking-wide">
          {caseData.title}
        </h2>
      </div>

      {/* Decorative divider */}
      <div className="flex items-center gap-3 mb-5">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-700/50 to-transparent" />
        <span className="text-amber-600 text-lg">✦</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-700/50 to-transparent" />
      </div>

      {/* AI-generated illustration */}
      {!imageError && (
        <div className="mb-5 rounded-xl overflow-hidden border border-amber-800/30 shadow-lg shadow-black/40">
          <img
            src={caseData.image}
            alt={caseData.title}
            className="w-full h-48 md:h-64 object-cover"
            onError={() => setImageError(true)}
          />
        </div>
      )}

      {/* Description */}
      <div className="bg-stone-900/50 border border-amber-800/30 rounded-lg p-4 mb-5 text-stone-200 leading-relaxed text-sm md:text-base">
        {caseData.description}
      </div>

      {/* Map info */}
      <div className="bg-stone-900/40 border border-stone-700/40 rounded-lg p-3 mb-4 flex items-start gap-3">
        <span className="text-xl mt-0.5 shrink-0">🗺️</span>
        <div>
          <div className="text-stone-400 text-xs uppercase tracking-widest mb-1 font-serif">
            Карта и местоположение
          </div>
          <p className="text-stone-300 text-sm">{caseData.mapDescription}</p>
        </div>
      </div>

      {/* Video link — shown only when case has one */}
      {caseData.videoUrl && (
        <div className="bg-red-950/30 border border-red-800/30 rounded-lg p-3 mb-5 flex items-center gap-3">
          <span className="text-2xl shrink-0">▶️</span>
          <div>
            <div className="text-red-400/70 text-xs uppercase tracking-widest mb-0.5 font-serif">
              Научи повече
            </div>
            <a
              href={caseData.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-300 hover:text-red-200 text-sm underline underline-offset-2 transition-colors"
            >
              Битката при Клокотница — документален видеоматериал
            </a>
          </div>
        </div>
      )}

      {/* Choices */}
      {!showOutcome ? (
        <>
          <div className="text-center text-amber-400/60 text-xs tracking-[0.3em] uppercase mb-3 font-serif">
            — Вземи своето решение —
          </div>
          <div className="space-y-3">
            {caseData.choices.map((choice, idx) => (
              <button
                key={idx}
                className="w-full text-left p-4 rounded-lg border border-stone-700/40 bg-stone-900/40 hover:bg-amber-900/20 hover:border-amber-700/40 transition-all duration-200"
                onClick={() => handleSelect(choice)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-amber-500 font-serif font-bold text-lg leading-tight mt-0.5 shrink-0">
                    {["I", "II", "III"][idx]}.
                  </span>
                  <p className="text-stone-100 text-sm md:text-base leading-relaxed">
                    {choice.text}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div id="outcome-panel" className="bg-stone-900/60 border-2 border-amber-700/50 rounded-xl p-5 md:p-6">
          {/* Chosen option recap */}
          <div className="mb-4 pb-4 border-b border-stone-700/40">
            <div className="text-amber-400/60 text-[10px] tracking-widest uppercase mb-1 font-serif">
              Твоят избор
            </div>
            <p className="text-stone-300 text-sm italic">"{selectedChoice?.text}"</p>
          </div>

          {/* Outcome */}
          <div className="text-amber-400 text-xl mb-3 text-center">⚜️</div>
          <div className="text-amber-300/70 text-xs tracking-widest uppercase mb-2 font-serif text-center">
            Последствие
          </div>
          <p className="text-stone-200 text-sm md:text-base leading-relaxed mb-4 text-center">
            {selectedChoice?.outcome}
          </p>

          {/* Effects */}
          <div className="flex flex-wrap justify-center gap-2 mb-5">
            <EffectBadge value={selectedChoice?.effects.military ?? 0} label="⚔️ Военна мощ" />
            <EffectBadge value={selectedChoice?.effects.diplomacy ?? 0} label="🕊️ Дипломация" />
            <EffectBadge value={selectedChoice?.effects.prosperity ?? 0} label="🌾 Благоденствие" />
          </div>

          {/* Chronicle — revealed AFTER choice */}
          <div className="bg-amber-950/40 border-l-4 border-amber-600/50 rounded-r-lg p-4 mb-5">
            <div className="flex items-center gap-2 text-amber-400/70 text-xs tracking-widest uppercase mb-2 font-serif">
              <span>📜</span> Историческият летопис свидетелства
            </div>
            <p className="text-amber-200/80 italic text-sm leading-relaxed">
              {selectedChoice?.chronicle}
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={handleContinue}
              className="px-8 py-2.5 bg-amber-700 hover:bg-amber-600 text-amber-100 font-serif font-semibold rounded-lg border border-amber-500/40 transition-colors text-sm tracking-wide"
            >
              {caseIndex + 1 < totalCases ? "Продължи →" : "Завърши царуването →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
