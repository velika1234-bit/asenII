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
      className={`inline-flex items-center gap-0.5 text-[11px] font-bold px-1.5 py-0.5 rounded ${
        positive
          ? "bg-green-900/60 text-green-300 border border-green-700/40"
          : "bg-red-900/60 text-red-300 border border-red-700/40"
      }`}
    >
      {positive ? "+" : ""}
      {value} {label}
    </span>
  );
}

export function CaseCard({
  caseData,
  caseIndex,
  totalCases,
  onChoice,
}: CaseCardProps) {
  const [hoveredChoice, setHoveredChoice] = useState<number | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [showOutcome, setShowOutcome] = useState(false);

  function handleSelect(choice: Choice) {
    setSelectedChoice(choice);
    setShowOutcome(true);
  }

  function handleContinue() {
    if (selectedChoice) {
      onChoice(selectedChoice);
      setSelectedChoice(null);
      setShowOutcome(false);
      setHoveredChoice(null);
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-6">
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

      {/* Description */}
      <div className="bg-stone-900/50 border border-amber-800/30 rounded-lg p-4 mb-5 text-stone-200 leading-relaxed text-sm md:text-base">
        {caseData.description}
      </div>

      {/* Chronicle */}
      <div className="bg-amber-950/30 border-l-4 border-amber-600/50 rounded-r-lg p-4 mb-5">
        <div className="flex items-center gap-2 text-amber-400/70 text-xs tracking-widest uppercase mb-2 font-serif">
          <span>📜</span> Летопис
        </div>
        <p className="text-amber-200/80 italic text-sm leading-relaxed">
          {caseData.chronicle}
        </p>
      </div>

      {/* Map info */}
      <div className="bg-stone-900/40 border border-stone-700/40 rounded-lg p-3 mb-6 flex items-start gap-3">
        <span className="text-xl mt-0.5">🗺️</span>
        <div>
          <div className="text-stone-400 text-xs uppercase tracking-widest mb-1 font-serif">
            Карта & Местоположение
          </div>
          <p className="text-stone-300 text-sm">{caseData.mapDescription}</p>
        </div>
      </div>

      {/* Choices or Outcome */}
      {!showOutcome ? (
        <>
          <div className="text-center text-amber-400/60 text-xs tracking-[0.3em] uppercase mb-3 font-serif">
            — Избери своето решение —
          </div>
          <div className="space-y-3">
            {caseData.choices.map((choice, idx) => (
              <button
                key={idx}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 group ${
                  hoveredChoice === idx
                    ? "bg-amber-900/40 border-amber-600/60 shadow-lg shadow-amber-900/20"
                    : "bg-stone-900/40 border-stone-700/40 hover:bg-amber-900/20 hover:border-amber-700/40"
                }`}
                onMouseEnter={() => setHoveredChoice(idx)}
                onMouseLeave={() => setHoveredChoice(null)}
                onClick={() => handleSelect(choice)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-amber-500 font-serif font-bold text-lg leading-tight mt-0.5">
                    {["I", "II", "III"][idx]}.
                  </span>
                  <div className="flex-1">
                    <p className="text-stone-100 text-sm md:text-base leading-relaxed mb-2">
                      {choice.text}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <EffectBadge value={choice.effects.military} label="⚔️" />
                      <EffectBadge value={choice.effects.diplomacy} label="🕊️" />
                      <EffectBadge value={choice.effects.prosperity} label="🌾" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-stone-900/60 border-2 border-amber-700/50 rounded-xl p-6 text-center">
          <div className="text-amber-400 text-2xl mb-3">⚜️</div>
          <div className="text-amber-300/70 text-xs tracking-widest uppercase mb-2 font-serif">
            Последствие
          </div>
          <p className="text-stone-200 text-base leading-relaxed mb-4">
            {selectedChoice?.outcome}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-5">
            <EffectBadge
              value={selectedChoice?.effects.military ?? 0}
              label="Военна мощ"
            />
            <EffectBadge
              value={selectedChoice?.effects.diplomacy ?? 0}
              label="Дипломация"
            />
            <EffectBadge
              value={selectedChoice?.effects.prosperity ?? 0}
              label="Благоденствие"
            />
          </div>
          <button
            onClick={handleContinue}
            className="px-6 py-2.5 bg-amber-700 hover:bg-amber-600 text-amber-100 font-serif font-semibold rounded-lg border border-amber-500/40 transition-colors text-sm tracking-wide"
          >
            {caseIndex + 1 < totalCases ? "Продължи →" : "Завърши играта →"}
          </button>
        </div>
      )}
    </div>
  );
}
