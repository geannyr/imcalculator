import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ═══════════════════════════════════════════════════════════════
// BMI Categories
// ═══════════════════════════════════════════════════════════════

const CATEGORIES = [
  {
    min: 0,
    max: 18.5,
    label: "Abaixo do peso",
    color: "#60a5fa",
    desc: "Seu peso está abaixo do recomendado para sua altura.",
    advice:
      "Considere consultar um nutricionista para um plano alimentar equilibrado e saudável.",
  },
  {
    min: 18.5,
    max: 25,
    label: "Peso normal",
    color: "#34d399",
    desc: "Seu peso está dentro da faixa ideal para sua altura!",
    advice:
      "Continue mantendo hábitos saudáveis de alimentação e atividade física regular.",
  },
  {
    min: 25,
    max: 30,
    label: "Sobrepeso",
    color: "#fbbf24",
    desc: "Seu peso está um pouco acima do recomendado.",
    advice:
      "Exercícios regulares e pequenos ajustes na alimentação podem ajudar a alcançar o peso ideal.",
  },
  {
    min: 30,
    max: 35,
    label: "Obesidade grau I",
    color: "#fb923c",
    desc: "Você está na faixa de obesidade grau I.",
    advice:
      "Recomenda-se acompanhamento com profissional de saúde para orientação adequada.",
  },
  {
    min: 35,
    max: 40,
    label: "Obesidade grau II",
    color: "#f87171",
    desc: "Você está na faixa de obesidade grau II.",
    advice:
      "Procure orientação médica para desenvolver um plano de saúde personalizado.",
  },
  {
    min: 40,
    max: Infinity,
    label: "Obesidade grau III",
    color: "#ef4444",
    desc: "Você está na faixa de obesidade grave.",
    advice:
      "É fundamental buscar acompanhamento médico especializado o quanto antes.",
  },
];

const getCategory = (bmi) =>
  CATEGORIES.find((c) => bmi >= c.min && bmi < c.max) ||
  CATEGORIES[CATEGORIES.length - 1];

const getScalePosition = (bmi) => {
  const clamped = Math.max(12, Math.min(42, bmi));
  return ((clamped - 12) / 30) * 100;
};

// ═══════════════════════════════════════════════════════════════
// Icons
// ═══════════════════════════════════════════════════════════════

function SunIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ClockIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function TrashIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function InfoIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4m0-4h.01" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// BMI Scale
// ═══════════════════════════════════════════════════════════════

function BmiScale({ bmi }) {
  const position = getScalePosition(bmi);
  const category = getCategory(bmi);

  return (
    <div className="mt-6">
      <div className="relative h-3">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(to right, #60a5fa, #34d399 30%, #fbbf24 50%, #fb923c 68%, #f87171 82%, #ef4444)",
          }}
        />
        <motion.div
          className="absolute top-1/2"
          style={{ marginLeft: -10, marginTop: -10 }}
          initial={{ left: "0%", opacity: 0 }}
          animate={{ left: `${position}%`, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 14,
            delay: 0.3,
          }}
        >
          <div
            className="w-5 h-5 rounded-full border-[3px] border-white dark:border-[#0c1222] shadow-lg"
            style={{ backgroundColor: category.color }}
          />
        </motion.div>
      </div>
      <div className="flex justify-between mt-2.5 text-[10px] font-medium text-gray-400 dark:text-gray-600">
        <span>12</span>
        <span>18.5</span>
        <span>25</span>
        <span>30</span>
        <span>35</span>
        <span>40+</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// App
// ═══════════════════════════════════════════════════════════════

export default function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("bmi-theme");
    return saved ? saved === "dark" : true;
  });
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("bmi-history") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("bmi-theme", dark ? "dark" : "light");
  }, [dark]);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!w || !h) {
      setError("Preencha os dois campos para calcular.");
      setResult(null);
      return;
    }
    if (w < 20 || w > 300) {
      setError("O peso deve estar entre 20 e 300 kg.");
      setResult(null);
      return;
    }
    if (h < 50 || h > 250) {
      setError("A altura deve estar entre 50 e 250 cm.");
      setResult(null);
      return;
    }

    setError("");
    const bmi = w / (h / 100) ** 2;
    const cat = getCategory(bmi);
    setResult({ value: bmi.toFixed(1), ...cat });

    const entry = {
      value: bmi.toFixed(1),
      label: cat.label,
      color: cat.color,
      weight: w,
      height: h,
      date: new Date().toLocaleDateString("pt-BR"),
    };
    const updated = [entry, ...history].slice(0, 5);
    setHistory(updated);
    localStorage.setItem("bmi-history", JSON.stringify(updated));
  };

  const reset = () => {
    setWeight("");
    setHeight("");
    setError("");
    setResult(null);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("bmi-history");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") calculate();
  };

  const hasResult = result !== null;

  return (
    <div className="min-h-screen transition-colors duration-500 bg-[#f8fafc] dark:bg-[#030712] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -right-[20%] w-[60%] h-[60%] rounded-full bg-indigo-500/[0.07] dark:bg-indigo-500/[0.04] blur-[120px]" />
        <div className="absolute -bottom-[30%] -left-[15%] w-[50%] h-[50%] rounded-full bg-violet-500/[0.06] dark:bg-violet-500/[0.03] blur-[120px]" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-10 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-lg"
        >
          {/* ─── Header ─── */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Calculadora{" "}
                <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                  IMC
                </span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1.5 font-medium">
                Descubra seu Índice de Massa Corporal
              </p>
            </div>

            {/* Theme toggle */}
            <button
              onClick={() => setDark(!dark)}
              className="relative w-14 h-7 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-300 border border-gray-300/40 dark:border-gray-700/40 flex-shrink-0"
              aria-label="Alternar tema"
            >
              <motion.div
                className="absolute top-[3px] w-[22px] h-[22px] rounded-full bg-white dark:bg-gray-600 shadow-sm flex items-center justify-center"
                animate={{ left: dark ? "calc(100% - 25px)" : "3px" }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <AnimatePresence mode="wait">
                  {dark ? (
                    <motion.span
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <MoonIcon className="w-3 h-3 text-indigo-300" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <SunIcon className="w-3 h-3 text-amber-500" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </button>
          </div>

          {/* ─── Calculator Card ─── */}
          <div className="rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/[0.06] shadow-xl shadow-gray-200/40 dark:shadow-none backdrop-blur-xl p-6 sm:p-8">
            {/* Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-widest">
                  Peso
                </label>
                <div className="relative group">
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="0"
                    className="w-full pl-4 pr-10 py-3.5 rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-white text-lg font-semibold placeholder:text-gray-300 dark:placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/30 transition-all duration-200"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-300 dark:text-gray-600 tracking-wide">
                    kg
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-widest">
                  Altura
                </label>
                <div className="relative group">
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="0"
                    className="w-full pl-4 pr-10 py-3.5 rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-white text-lg font-semibold placeholder:text-gray-300 dark:placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/30 transition-all duration-200"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-300 dark:text-gray-600 tracking-wide">
                    cm
                  </span>
                </div>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-red-500 dark:text-red-400 text-sm mt-3 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={calculate}
                className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm tracking-wide transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98]"
              >
                Calcular IMC
              </button>
              <button
                onClick={reset}
                className="py-3.5 px-5 rounded-xl bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] text-gray-500 dark:text-gray-400 font-semibold text-sm hover:bg-gray-200/80 dark:hover:bg-white/[0.07] transition-all duration-200 active:scale-[0.98]"
              >
                Limpar
              </button>
            </div>

            {/* ─── Result ─── */}
            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  key={result.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="mt-8 pt-8 border-t border-gray-100 dark:border-white/[0.06]"
                >
                  {/* Value + Badge */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
                        Seu IMC
                      </p>
                      <p
                        className="text-5xl sm:text-6xl font-extrabold tracking-tighter leading-none"
                        style={{ color: result.color }}
                      >
                        {result.value.split(".")[0]}
                        <span className="text-3xl sm:text-4xl opacity-60">
                          .{result.value.split(".")[1]}
                        </span>
                      </p>
                    </div>
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold mb-1"
                      style={{
                        backgroundColor: result.color + "15",
                        color: result.color,
                        border: `1px solid ${result.color}25`,
                      }}
                    >
                      {result.label}
                    </motion.span>
                  </div>

                  {/* Scale */}
                  <BmiScale bmi={parseFloat(result.value)} />

                  {/* Description + Advice */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 p-4 rounded-xl bg-gray-50/80 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.04]"
                  >
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                      {result.desc}
                    </p>
                    <div className="flex items-start gap-2.5 mt-3 pt-3 border-t border-gray-100 dark:border-white/[0.06]">
                      <InfoIcon className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {result.advice}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ─── Reference Table ─── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-5 rounded-2xl bg-white/60 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.05] p-5 sm:p-6"
          >
            <h3 className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
              Classificação IMC
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = hasResult && result.label === cat.label;
                return (
                  <div
                    key={cat.label}
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg transition-all duration-300 ${
                      hasResult && !isActive ? "opacity-35" : ""
                    }`}
                    style={
                      isActive
                        ? {
                            backgroundColor: cat.color + "12",
                            boxShadow: `inset 0 0 0 1px ${cat.color}30`,
                          }
                        : {}
                    }
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 truncate">
                        {cat.label}
                      </p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-600 font-medium">
                        {cat.min === 0
                          ? `< ${cat.max}`
                          : cat.max === Infinity
                            ? `≥ ${cat.min}`
                            : `${cat.min} – ${cat.max}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ─── History ─── */}
          <AnimatePresence>
            {history.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.2 }}
                className="mt-5 rounded-2xl bg-white/60 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.05] p-5 sm:p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                    <h3 className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                      Histórico recente
                    </h3>
                  </div>
                  <button
                    onClick={clearHistory}
                    className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400 hover:text-red-400 transition-colors duration-200"
                  >
                    <TrashIcon className="w-3 h-3" />
                    Limpar
                  </button>
                </div>
                <div className="space-y-1.5">
                  {history.map((entry, i) => (
                    <motion.div
                      key={`${entry.date}-${entry.value}-${i}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-gray-50/60 dark:bg-white/[0.02] hover:bg-gray-100/60 dark:hover:bg-white/[0.04] transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm font-bold text-gray-900 dark:text-white tabular-nums">
                          {entry.value}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                          {entry.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-right">
                        <span className="text-[10px] text-gray-300 dark:text-gray-700 font-medium">
                          {entry.weight}kg · {entry.height}cm
                        </span>
                        <span className="text-[10px] text-gray-400 dark:text-gray-600 font-medium">
                          {entry.date}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── Footer ─── */}
          <p className="text-center text-[11px] text-gray-400 dark:text-gray-600 mt-8 font-medium">
            Apenas informativo — não substitui orientação médica profissional.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
