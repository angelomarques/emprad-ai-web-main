import { useEffect } from "react";

const InConstruction = () => {
  useEffect(() => {
    console.log("User accessed In Construction page");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center max-w-2xl mx-auto px-6">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-yellow-400 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-yellow-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🚧 Em Construção
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Estamos trabalhando duro para construir algo incrível para você!
          </p>
          <p className="text-lg text-gray-500 mb-8">
            Esta página está sendo desenvolvida atualmente. Por favor, volte em
            breve para atualizações.
          </p>
        </div>

        <div className="space-y-4">
          <a
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Voltar ao Início
          </a>
          <div className="text-sm text-gray-400">
            Conclusão esperada: Em Breve™
          </div>
        </div>
      </div>
    </div>
  );
};

export default InConstruction;
