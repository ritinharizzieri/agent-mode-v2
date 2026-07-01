export default function DocumentList({ documents, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
        <div className="text-center">
          <p className="text-gray-600">Carregando documentos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
        <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
      </div>
    );
  }

  if (!documents || documents.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
        <div className="text-center">
          <p className="text-gray-600">Documento não localizado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Documentos Disponíveis
      </h3>
      <ul className="space-y-3">
        {documents.map((doc, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1">
              <p className="font-medium text-gray-800">{doc.nome || doc}</p>
            </div>
            <a
              href={doc.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors ml-4"
            >
              Abrir
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
