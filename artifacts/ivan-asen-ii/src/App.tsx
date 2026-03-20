import { useState, useEffect } from "react";
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
  if (caseIndex <= 1) return { src: "/images/map-boril.png", year: "при Борил" };
  if (caseIndex <= 4) return { src: "/images/map-1218.png", year: "1218 г." };
  if (caseIndex <= 13) return { src: "/images/map-1230.png", year: "1230 г." };
  return { src: "/images/map-1241.png", year: "1241 г." };
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>("login");
  const [playerName, setPlayerName] = useState("");
  const [currentCase, setCurrentCase] = useState(0);
  const [stats, setStats] = useState(INITIAL_STATS);
  const [choiceIndices, setChoiceIndices] = useState<number[]>([]);
  const [mapOpen, setMapOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMapOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
          {/* Live map thumbnail — parchment frame, clickable */}
          <div className="w-12 sm:w-16 shrink-0 flex flex-col items-center gap-0.5">
            <button
              onClick={() => setMapOpen(true)}
              title="Виж картата в пълен размер"
              className="group relative focus:outline-none"
              style={{ cursor: "zoom-in" }}
            >
              <div
                style={{
                  padding: "3px",
                  background: "linear-gradient(135deg, #6b4a0e 0%, #c9942a 40%, #a0721a 60%, #6b4a0e 100%)",
                  borderRadius: "4px",
                  boxShadow: "0 0 0 1px #3d2a08, 2px 3px 10px rgba(0,0,0,0.8), inset 0 0 4px rgba(0,0,0,0.3)",
                  transition: "box-shadow 0.2s",
                }}
                className="group-hover:brightness-110"
              >
                <div
                  style={{
                    padding: "2px",
                    background: "linear-gradient(145deg, #e8c97a 0%, #c9a84c 30%, #b8943e 70%, #d4aa60 100%)",
                    borderRadius: "2px",
                    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.25)",
                  }}
                >
                  <img
                    src={liveMap.src}
                    alt="Карта на царството"
                    className="block transition-all duration-700"
                    style={{
                      width: "38px",
                      height: "30px",
                      objectFit: "cover",
                      borderRadius: "1px",
                      filter: "sepia(35%) saturate(1.15) contrast(0.92) brightness(0.95)",
                    }}
                  />
                </div>
              </div>
              {/* Zoom hint icon */}
              <span
                className="absolute -bottom-0.5 -right-0.5 text-[8px] bg-amber-900/80 text-amber-300 rounded-full w-3 h-3 flex items-center justify-center leading-none pointer-events-none select-none opacity-80 group-hover:opacity-100 transition-opacity"
              >⊕</span>
            </button>
            <span
              className="font-serif leading-none"
              style={{ fontSize: "7px", color: "#92711a", fontStyle: "italic", marginTop: "2px" }}
            >{liveMap.year}</span>
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

      {/* Map lightbox */}
      {mapOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: "rgba(5,3,1,0.92)" }}
          onClick={() => setMapOpen(false)}
        >
          {/* Parchment frame around full map */}
          <div
            className="relative mx-4 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
            style={{
              padding: "10px",
              background: "linear-gradient(135deg, #5a3d0a 0%, #c9942a 35%, #a0721a 65%, #5a3d0a 100%)",
              borderRadius: "8px",
              boxShadow: "0 0 0 2px #3d2a08, 0 0 40px rgba(0,0,0,0.95), 0 0 80px rgba(0,0,0,0.6)",
            }}
          >
            <div
              style={{
                padding: "6px",
                background: "linear-gradient(145deg, #e8c97a 0%, #c9a84c 30%, #b8943e 70%, #d4aa60 100%)",
                borderRadius: "4px",
                boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              <img
                src={liveMap.src}
                alt="Карта на царството"
                className="w-full block"
                style={{
                  borderRadius: "3px",
                  filter: "sepia(25%) saturate(1.1) contrast(0.95) brightness(0.98)",
                  maxHeight: "70vh",
                  objectFit: "contain",
                }}
              />
            </div>
            {/* Caption */}
            <div className="text-center mt-2 pb-1">
              <span className="font-serif italic text-amber-200/70 text-xs tracking-wide">
                🗺️ Царство България — {liveMap.year}
              </span>
            </div>
            {/* Close button */}
            <button
              onClick={() => setMapOpen(false)}
              className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-stone-900 border-2 border-amber-800/60 text-amber-400 hover:text-amber-200 hover:bg-stone-800 flex items-center justify-center text-sm font-bold transition-all shadow-lg"
              title="Затвори"
            >✕</button>
          </div>
          <p className="text-stone-600 text-[11px] mt-4 font-serif italic">
            Натисни навсякъде или Escape за затваряне
          </p>
        </div>
      )}
    </div>
  );
}
