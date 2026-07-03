import { useState } from "react";
import DocumentSelector from "../components/DocumentSelector";
import ValidationForm from "../components/ValidationForm";
import DocumentList from "../components/DocumentList";
import { validarColaborador, obterDocumentos } from "../services/api";

export default function Home() {
  const [selectedType, setSelectedType] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validatedCpf, setValidatedCpf] = useState(null);

  const handleSelectType = (type) => {
    setSelectedType(type);
    setError(null);
  };

  const handleSubmitForm = async (formData) => {
    setIsLoading(true);
    setError(null);
    setDocuments(null);

    try {
      // Validar o colaborador
      await validarColaborador(formData);
      setValidatedCpf(formData.cpf);

      // Buscar documentos
      const response = await obterDocumentos(
        formData.cpf,
        formData.tipo,
        formData.ano,
      );
      const docsData = response.data.documentos || response.data || [];
      setDocuments(Array.isArray(docsData) ? docsData : [docsData]);
    } catch (err) {
      const errorMessage =
        err.response?.data?.mensagem ||
        err.message ||
        "Erro ao conectar com o servidor. Tente novamente.";

      if (errorMessage.includes("não localizado")) {
        setError("Pessoa não localizada.");
      } else if (errorMessage.includes("não encontrado")) {
        setError("Documento não localizado.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Portal de Consulta de Documentos
          </h1>
          <p className="text-gray-600">
            Selecione o tipo de documento e informe seus dados para acessar
          </p>
        </div>

        {/* Document Type Selection */}
        <div className="mb-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Tipo de Documento
          </h2>
          <DocumentSelector
            onSelectType={handleSelectType}
            isLoading={isLoading}
          />
        </div>

        {/* Validation Form */}
        {selectedType && !documents && (
          <div className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Validação de Identidade
            </h2>
            <ValidationForm
              onSubmit={handleSubmitForm}
              isLoading={isLoading}
              documentType={selectedType}
              error={error}
            />
          </div>
        )}

        {/* Document List */}
        {documents && (
          <div className="mb-12">
            <DocumentList
              documents={documents}
              isLoading={isLoading}
              error={error}
            />
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setDocuments(null);
                  setSelectedType(null);
                  setValidatedCpf(null);
                  setError(null);
                }}
                className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
              >
                Voltar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
