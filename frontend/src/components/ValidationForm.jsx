import { useState } from "react";

const formatCPF = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
};

const formatDate = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .slice(0, 10);
};

const formatYear = (value) => {
  return value.replace(/\D/g, "").slice(0, 4);
};

export default function ValidationForm({
  onSubmit,
  isLoading,
  documentType,
  error,
}) {
  const [formData, setFormData] = useState({
    matricula: "",
    cpf: "",
    dataNascimento: "",
    dataAdmissao: "",
    ano: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cpf") {
      setFormData({ ...formData, [name]: formatCPF(value) });
    } else if (name === "dataNascimento" || name === "dataAdmissao") {
      setFormData({ ...formData, [name]: formatDate(value) });
    } else if (name === "ano") {
      setFormData({ ...formData, [name]: formatYear(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ ...formData, tipo: documentType });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label
          htmlFor="matricula"
          className="block text-sm font-medium text-gray-700"
        >
          Matrícula
        </label>
        <input
          type="text"
          id="matricula"
          name="matricula"
          value={formData.matricula}
          onChange={handleChange}
          placeholder="Ex: 12345"
          required
          disabled={isLoading}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      <div>
        <label
          htmlFor="cpf"
          className="block text-sm font-medium text-gray-700"
        >
          CPF
        </label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          placeholder="000.000.000-00"
          required
          disabled={isLoading}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      <div>
        <label
          htmlFor="dataNascimento"
          className="block text-sm font-medium text-gray-700"
        >
          Data de Nascimento
        </label>
        <input
          type="text"
          id="dataNascimento"
          name="dataNascimento"
          value={formData.dataNascimento}
          onChange={handleChange}
          placeholder="DD/MM/AAAA"
          required
          disabled={isLoading}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      <div>
        <label
          htmlFor="dataAdmissao"
          className="block text-sm font-medium text-gray-700"
        >
          Data de Admissão
        </label>
        <input
          type="text"
          id="dataAdmissao"
          name="dataAdmissao"
          value={formData.dataAdmissao}
          onChange={handleChange}
          placeholder="DD/MM/AAAA"
          required
          disabled={isLoading}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      <div>
        <label htmlFor="ano" className="block text-sm font-medium text-gray-700">
          Ano (opcional)
        </label>
        <input
          type="text"
          id="ano"
          name="ano"
          value={formData.ano}
          onChange={handleChange}
          placeholder="AAAA"
          disabled={isLoading}
          inputMode="numeric"
          maxLength={4}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !documentType}
        className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? "Verificando..." : "Enviar"}
      </button>
    </form>
  );
}
