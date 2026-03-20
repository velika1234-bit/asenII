import { useState } from "react";
import { cases } from "./data/cases";
import type { Choice } from "./data/cases";
import { StatsBar } from "./components/StatsBar";
import { CaseCard } from "./components/CaseCard";
import { LoginScreen } from "./components/LoginScreen";
import { IntroScreen } from "./components/IntroScreen";
import { EndScreen } from "./components/EndScreen";

type GameState = "login" | "intro" | "playing" | "end";

const INITIAL_STATS = { military: 50, diplomacy: 50, prosperity: 50 };

function clamp(v: number) {
  return Math.max(0, Math.min(100, v));
}

function getLiveMap(caseIndex: number): { src: string; year: string } {
  if (caseIndex < 5) return { src: "/images/map-1218.png", year: "1218 г." };
  if (caseIndex < 14) return { src: "/images/map-1230.png", year: "1230 г." };
  return { src: "/images/map-1241.png", year: "1241 г." };
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>("login");
  const [playerName, setPlayerName] = useState("");
  const [currentCase, setCurrentCase] = useState(0);
  const [stats, setStats] = useState(INITIAL_STATS);
  const [choiceIndices, setChoiceIndices] = useState<number[]>([]);

  function handleLogin(name: string) {
    setPlayerName(name);
    setGameState("intro");
  }

  function handleStart() {
    setCurrentCase(0);
    setStats(INITIAL_STATS);
    setChoiceIndices([]);
    setGameState("playing");
  }

  function handleChoice(choice: Choice, choiceIndex: number) {
    const newStats = {
      military: clamp(stats.military + choice.effects.military),
      diplomacy: clamp(stats.diplomacy + choice.effects.diplomacy),
      prosperity: clamp(stats.prosperity + choice.effects.prosperity),
    };
    setStats(newStats);
    setChoiceIndices((prev) => [...prev, choiceIndex]);

    if (currentCase + 1 >= cases.length) {
      setGameState("end");
    } else {
      setCurrentCase((c) => c + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleRestart() {
    setGameState("login");
    setPlayerName("");
  }

  const background = {
    background:
      "radial-gradient(ellipse at top, #1c1008 0%, #0a0a0a 60%), url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23854d0e' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
  };

  if (gameState === "login") {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 overflow-x-hidden" style={background}>
        <LoginScreen onEnter={handleLogin} />
      </div>
    );
  }

  if (gameState === "intro") {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 overflow-x-hidden" style={background}>
        <IntroScreen playerName={playerName} onStart={handleStart} />
      </div>
    );
  }

  const historicalCorrect = choiceIndices.filter(
    (ci, i) => ci === cases[i]?.historicalChoice
  ).length;

  if (gameState === "end") {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 overflow-x-hidden" style={background}>
        <EndScreen
          playerName={playerName}
          military={stats.military}
          diplomacy={stats.diplomacy}
          prosperity={stats.prosperity}
          choiceIndices={choiceIndices}
          historicalCorrect={historicalCorrect}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  const liveMap = getLiveMap(currentCase);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 overflow-x-hidden" style={background}>
      <div className="min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="flex items-center py-2 sm:py-3 border-b border-amber-900/30 px-3 sm:px-4">
          <div className="w-12 sm:w-16 shrink-0" />
          <div className="flex-1 text-center min-w-0">
            <h1 className="text-amber-400/80 font-serif text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.3em] uppercase leading-tight">
              <span className="hidden sm:inline">⚜️ </span>Иван Асен II — Историческа Игра<span className="hidden sm:inline"> ⚜️</span>
            </h1>
            <p className="text-stone-600 text-[10px] sm:text-xs mt-0.5 font-serif truncate">{playerName}</p>
          </div>
          {/* Live map thumbnail */}
          <div className="w-12 sm:w-16 shrink-0 flex flex-col items-center gap-0.5">
            <img
              src={liveMap.src}
              alt="Карта на царството"
              className="w-10 sm:w-14 h-8 sm:h-10 object-cover rounded border border-amber-800/40 shadow-md transition-all duration-700"
            />
            <span className="text-amber-600/50 text-[7px] sm:text-[9px] font-serif leading-none">{liveMap.year}</span>
          </div>
        </header>

        {/* Stats */}
        <StatsBar
          military={stats.military}
          diplomacy={stats.diplomacy}
          prosperity={stats.prosperity}
        />

        {/* Progress bar */}
        <div className="w-full bg-stone-900/60 h-1">
          <div
            className="h-full bg-amber-700/60 transition-all duration-500"
            style={{ width: `${(currentCase / cases.length) * 100}%` }}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <CaseCard
            key={currentCase}
            caseData={cases[currentCase]}
            caseIndex={currentCase}
            totalCases={cases.length}
            onChoice={handleChoice}
          />
        </main>

        <footer className="text-center py-2 border-t border-amber-900/20">
          <p className="text-stone-600 text-[10px] tracking-widest uppercase font-serif">
            Второто Българско Царство • 1218–1241 г.
          </p>
        </footer>
      </div>
    </div>
  );
}
