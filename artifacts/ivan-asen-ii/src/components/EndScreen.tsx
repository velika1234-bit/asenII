import { useRef } from "react";
import { getAchievements } from "../data/achievements";

interface EndScreenProps {
  playerName: string;
  military: number;
  diplomacy: number;
  prosperity: number;
  choiceIndices: number[];
  historicalCorrect: number;
  onRestart: () => void;
}

interface TitleInfo {
  title: string;
  subtitle: string;
  icon: string;
  grade: string;
}

function getTitle(military: number, diplomacy: number, prosperity: number): TitleInfo {
  const avg = (military + diplomacy + prosperity) / 3;
  if (avg >= 78) return { title: "Велики Цар", subtitle: "Управлението ти ще бъде помнено с векове. България достигна своя зенит.", icon: "👑", grade: "Отличен" };
  if (avg >= 62) return { title: "Мъдър Владетел", subtitle: "Царството процъфтява под твоята ръководна ръка. Историята те помни с уважение.", icon: "⚜️", grade: "Много добър" };
  if (avg >= 47) return { title: "Достоен Управник", subtitle: "Устоя на предизвикателствата. България е запазена, но не е достигнала пълния си потенциал.", icon: "🛡️", grade: "Добър" };
  if (avg >= 30) return { title: "Колеблив Цар", subtitle: "Грешките в управлението са видими. Историците ще намерят какво да критикуват.", icon: "⚔️", grade: "Слаб" };
  return { title: "Злощастен Владетел", subtitle: "Царството е отслабено след твоето управление. Поуките трябва да бъдат извлечени.", icon: "💀", grade: "Незадоволителен" };
}

function StatResult({ icon, label, value }: { icon: string; label: string; value: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  const color = clamped >= 65 ? "#22c55e" : clamped >= 40 ? "#eab308" : "#ef4444";
  return (
    <div className="flex items-center gap-3 py-2">
      <span className="text-lg w-6 text-center shrink-0">{icon}</span>
      <span className="text-stone-300 font-serif text-xs sm:text-sm w-20 sm:w-28 shrink-0">{label}</span>
      <div className="flex-1 h-2.5 bg-stone-900/60 rounded-full border border-stone-700/40 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${clamped}%`, backgroundColor: color }} />
      </div>
      <span className="text-amber-200 font-bold text-sm w-8 text-right shrink-0">{clamped}</span>
    </div>
  );
}

function downloadCertificate(playerName: string, titleInfo: TitleInfo, military: number, diplomacy: number, prosperity: number, accuracy: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 680;
  const ctx = canvas.getContext("2d")!;

  const bgGrad = ctx.createLinearGradient(0, 0, 900, 680);
  bgGrad.addColorStop(0, "#1a0e00");
  bgGrad.addColorStop(0.5, "#120b00");
  bgGrad.addColorStop(1, "#0a0700");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 900, 680);

  ctx.strokeStyle = "#92400e";
  ctx.lineWidth = 3;
  ctx.strokeRect(18, 18, 864, 644);
  ctx.strokeStyle = "#d97706";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(26, 26, 848, 628);
  ctx.strokeStyle = "#78350f";
  ctx.lineWidth = 1;
  ctx.strokeRect(34, 34, 832, 612);

  const corners = [[34, 34], [866, 34], [34, 646], [866, 646]] as const;
  corners.forEach(([x, y]) => {
    ctx.fillStyle = "#d97706";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "#78350f";
  ctx.fillRect(50, 90, 800, 1);
  ctx.fillStyle = "#d97706";
  ctx.fillRect(50, 88, 800, 1);

  ctx.font = "bold 13px serif";
  ctx.fillStyle = "#92400e";
  ctx.textAlign = "center";
  ctx.fillText("ВТОРОТО БЪЛГАРСКО ЦАРСТВО", 450, 70);

  ctx.font = "50px serif";
  ctx.fillStyle = "#d97706";
  ctx.fillText("👑", 450, 145);

  ctx.font = "bold 42px Georgia, serif";
  ctx.fillStyle = "#fbbf24";
  ctx.textAlign = "center";
  ctx.shadowColor = "rgba(251, 191, 36, 0.3)";
  ctx.shadowBlur = 12;
  ctx.fillText("ЦАРСКА ГРАМОТА", 450, 200);
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#d97706";
  ctx.fillRect(150, 212, 600, 1);

  ctx.font = "italic 18px Georgia, serif";
  ctx.fillStyle = "#d6d3d1";
  ctx.fillText("Настоящата грамота се издава на", 450, 248);

  ctx.font = "bold 36px Georgia, serif";
  ctx.fillStyle = "#fef3c7";
  ctx.shadowColor = "rgba(251, 191, 36, 0.2)";
  ctx.shadowBlur = 8;
  ctx.fillText(playerName, 450, 295);
  ctx.shadowBlur = 0;

  ctx.strokeStyle = "#92400e";
  ctx.lineWidth = 1;
  const nameWidth = Math.min(ctx.measureText(playerName).width + 60, 500);
  ctx.beginPath();
  ctx.moveTo(450 - nameWidth / 2, 305);
  ctx.lineTo(450 + nameWidth / 2, 305);
  ctx.stroke();

  ctx.font = "italic 16px Georgia, serif";
  ctx.fillStyle = "#a8a29e";
  ctx.fillText("за мъдро управление на Второто Българско Царство", 450, 332);
  ctx.fillText("и е удостоен с почетното звание:", 450, 352);

  ctx.font = "bold 28px Georgia, serif";
  ctx.fillStyle = "#fbbf24";
  ctx.shadowColor = "rgba(251, 191, 36, 0.25)";
  ctx.shadowBlur = 10;
  ctx.fillText(`${titleInfo.icon}  ${titleInfo.title}`, 450, 392);
  ctx.shadowBlur = 0;

  ctx.font = "14px Georgia, serif";
  ctx.fillStyle = "#78716c";
  ctx.fillText(`Военна мощ: ${military}  •  Дипломация: ${diplomacy}  •  Благоденствие: ${prosperity}`, 450, 425);

  ctx.font = "13px Georgia, serif";
  ctx.fillStyle = "#92400e";
  ctx.fillText(`Историческа точност: ${accuracy}%`, 450, 448);

  ctx.fillStyle = "#78350f";
  ctx.fillRect(50, 468, 800, 1);

  ctx.font = "italic 14px Georgia, serif";
  ctx.fillStyle = "#78716c";
  ctx.fillText("1218 — 1241 г.  •  Иван Асен II — Историческа Стратегическа Игра", 450, 490);

  ctx.beginPath();
  ctx.arc(450, 560, 50, 0, Math.PI * 2);
  ctx.strokeStyle = "#d97706";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(450, 560, 44, 0, Math.PI * 2);
  ctx.strokeStyle = "#92400e";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.font = "32px serif";
  ctx.fillStyle = "#d97706";
  ctx.textAlign = "center";
  ctx.fillText("⚜️", 450, 573);

  ctx.font = "12px Georgia, serif";
  ctx.fillStyle = "#57534e";
  ctx.fillText("Цар Иван Асен II, самодържец на България", 450, 635);

  const link = document.createElement("a");
  link.download = `gramota-${playerName.replace(/\s+/g, "-")}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export function EndScreen({ playerName, military, diplomacy, prosperity, choiceIndices, historicalCorrect, onRestart }: EndScreenProps) {
  const titleInfo = getTitle(military, diplomacy, prosperity);
  const total = Math.round((military + diplomacy + prosperity) / 3);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const accuracy = Math.round((historicalCorrect / 15) * 100);
  const accuracyColor = accuracy >= 70 ? "text-green-400" : accuracy >= 50 ? "text-amber-400" : "text-red-400";
  const accuracyBar = accuracy;

  const achievements = getAchievements({ military, diplomacy, prosperity }, choiceIndices, historicalCorrect);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full text-center">
        <div className="text-6xl mb-4">{titleInfo.icon}</div>

        <div className="flex items-center gap-3 mb-4 justify-center">
          <div className="h-px w-16 bg-amber-700/40" />
          <span className="text-amber-500/60 text-xs tracking-[0.4em] uppercase font-serif">
            Краят на царуването
          </span>
          <div className="h-px w-16 bg-amber-700/40" />
        </div>

        <p className="text-stone-400 font-serif text-sm mb-1">{playerName},</p>
        <h1 className="text-3xl md:text-4xl font-bold text-amber-100 font-serif mb-2">{titleInfo.title}</h1>
        <p className="text-stone-300 italic mb-6 leading-relaxed text-sm md:text-base">{titleInfo.subtitle}</p>

        {/* Stats summary */}
        <div className="bg-stone-900/60 border border-amber-800/30 rounded-xl p-5 mb-4 text-left">
          <div className="text-amber-400/70 text-xs tracking-widest uppercase text-center mb-4 font-serif">
            Крайни резултати на царството
          </div>
          <StatResult icon="⚔️" label="Военна мощ" value={military} />
          <StatResult icon="🕊️" label="Дипломация" value={diplomacy} />
          <StatResult icon="🌾" label="Благоденствие" value={prosperity} />
          <div className="border-t border-stone-700/40 mt-3 pt-3 flex items-center justify-between">
            <span className="text-stone-400 font-serif text-sm">Средна оценка</span>
            <div className="flex items-center gap-2">
              <span className="text-stone-500 text-xs font-serif">{titleInfo.grade}</span>
              <span className="text-amber-300 font-bold text-xl">{total} / 100</span>
            </div>
          </div>
        </div>

        {/* Historical accuracy */}
        <div className="bg-stone-900/60 border border-amber-800/30 rounded-xl p-5 mb-4 text-left">
          <div className="text-amber-400/70 text-xs tracking-widest uppercase text-center mb-3 font-serif">
            Историческа точност
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🗺️</span>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-stone-300 text-sm font-serif">Съвпадение с реалния Иван Асен II</span>
                <span className={`font-bold text-lg ${accuracyColor}`}>{accuracy}%</span>
              </div>
              <div className="h-3 bg-stone-800/60 rounded-full border border-stone-700/40 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${accuracyBar}%`,
                    background: accuracy >= 70 ? "#22c55e" : accuracy >= 50 ? "#d97706" : "#ef4444"
                  }}
                />
              </div>
            </div>
          </div>
          <p className="text-stone-500 text-xs font-serif italic text-center mt-2">
            {historicalCorrect} от 15 решения съвпадат с историческите избори на цар Иван Асен II
          </p>
        </div>

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="bg-stone-900/60 border border-amber-800/30 rounded-xl p-5 mb-4 text-left">
            <div className="text-amber-400/70 text-xs tracking-widest uppercase text-center mb-4 font-serif">
              Спечелени постижения
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className="flex items-center gap-3 bg-amber-950/30 border border-amber-800/25 rounded-lg px-3 py-2"
                >
                  <span className="text-2xl shrink-0">{ach.icon}</span>
                  <div className="min-w-0">
                    <p className="text-amber-200 font-serif font-semibold text-sm leading-tight">{ach.title}</p>
                    <p className="text-stone-500 text-xs leading-tight mt-0.5">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {achievements.length === 0 && (
          <div className="bg-stone-900/40 border border-stone-700/30 rounded-xl p-4 mb-4 text-center">
            <p className="text-stone-500 font-serif text-sm italic">Не са спечелени постижения. Опитай отново!</p>
          </div>
        )}

        {/* Historical note */}
        <div className="bg-amber-950/30 border-l-4 border-amber-600/50 rounded-r-lg p-4 mb-7 text-left">
          <div className="flex items-center gap-2 text-amber-400/70 text-xs tracking-widest uppercase mb-2 font-serif">
            <span>📜</span> Историческа оценка
          </div>
          <p className="text-amber-200/80 italic text-sm leading-relaxed">
            "Иван Асен II е един от най-великите владетели на средновековна България. По негово време България стига максималното си разширение — от Дунав до Беломорието, от Черно море до Адриатика. В историята той остава като мъдър, справедлив и умерен владетел."
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => downloadCertificate(playerName, titleInfo, military, diplomacy, prosperity, accuracy)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-stone-800 hover:bg-stone-700 text-amber-200 font-serif font-semibold rounded-xl border-2 border-amber-800/50 shadow-lg transition-all text-sm tracking-wide"
          >
            📜 Изтегли грамотата
          </button>
          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-700 hover:bg-amber-600 text-amber-100 font-serif font-bold rounded-xl border-2 border-amber-500/50 shadow-lg transition-all text-sm tracking-wide"
          >
            ⚔️ Играй отново
          </button>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
