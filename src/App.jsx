
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const getClassificacao = (imc) => {
  if (imc < 18.5) return { text: "Abaixo do peso", color: "bg-blue-400", percent: 20 };
  if (imc < 25) return { text: "Peso ideal", color: "bg-green-500", percent: 40 };
  if (imc < 30) return { text: "Sobrepeso", color: "bg-yellow-400", percent: 60 };
  if (imc < 40) return { text: "Obesidade II", color: "bg-orange-500", percent: 80 };
  return { text: "Obesidade III", color: "bg-red-600", percent: 100 };
};

export default function App() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");
  const [modoEscuro, setModoEscuro] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", modoEscuro);
  }, [modoEscuro]);

  const calcularIMC = () => {
    const p = parseFloat(peso);
    const a = parseFloat(altura);

    if (!p || !a || p <= 0 || a <= 0) {
      setErro("Preencha os campos com valores válidos.");
      setResultado(null);
      return;
    }

    setErro("");
    const imc = p / ((a / 100) ** 2);
    const classif = getClassificacao(imc);
    setResultado({ imc: imc.toFixed(2), texto: classif.text, ...classif });
  };

  const limpar = () => {
    setPeso("");
    setAltura("");
    setErro("");
    setResultado(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 transition-colors duration-300 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-xl backdrop-blur-lg bg-white/30 dark:bg-white/10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Calculadora de IMC</h1>
          <button onClick={() => setModoEscuro(!modoEscuro)} className="text-sm px-3 py-1 rounded-full border border-gray-400 dark:border-gray-600">
            {modoEscuro ? "Modo Claro" : "Modo Escuro"}
          </button>
        </div>

        <input
          type="number"
          placeholder="Peso (kg)"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          className="w-full mb-3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />

        <input
          type="number"
          placeholder="Altura (cm)"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          className="w-full mb-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />

        {erro && <p className="text-red-500 text-sm mb-3">{erro}</p>}

        <div className="flex gap-3 mb-4">
          <button onClick={calcularIMC} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Calcular</button>
          <button onClick={limpar} className="flex-1 bg-gray-300 dark:bg-gray-700 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition">Limpar</button>
        </div>

        {resultado && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
            {resultado.imc && <p className="text-lg font-semibold">Seu IMC: {resultado.imc}</p>}
            <p className="text-md mt-1">{resultado.texto}</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-4 rounded-full mt-3 overflow-hidden">
              <div className={`h-full transition-all ${resultado.color}`} style={{ width: `${resultado.percent}%` }}></div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
