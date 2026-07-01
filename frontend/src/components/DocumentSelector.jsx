import { useState } from "react";

export default function DocumentSelector({ onSelectType, isLoading }) {
  const [selectedType, setSelectedType] = useState(null);

  const handleSelect = (type) => {
    setSelectedType(type);
    onSelectType(type);
  };

  return (
    <div className="flex gap-4 justify-center">
      <button
        onClick={() => handleSelect("IR")}
        disabled={isLoading}
        className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
          selectedType === "IR"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-800 border-2 border-gray-300 hover:border-blue-600"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Informe de Rendimentos
      </button>
      <button
        onClick={() => handleSelect("BOLETO")}
        disabled={isLoading}
        className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
          selectedType === "BOLETO"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-800 border-2 border-gray-300 hover:border-blue-600"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Boletos do Plano de Saúde
      </button>
    </div>
  );
}
