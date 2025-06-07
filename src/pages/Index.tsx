
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="relative bg-blue-900 bg-opacity-90">
        {/* Background image with overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
          style={{ 
            backgroundImage: `url('/lovable-uploads/94c06186-0dfa-4134-87c7-c935309ffb82.png')`,
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="container mx-auto px-4 py-24 md:py-40 relative z-10">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Emprad 2025
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-10">
                Datas definidas:
              </h2>
              
              <div className="bg-blue-900 bg-opacity-50 backdrop-blur-sm p-4 inline-block">
                <Button 
                  asChild 
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold mb-8"
                >
                  <Link to="/research-assistant" className="flex items-center gap-2">
                    Assistente de Pesquisa <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="space-y-6 text-white">
                <p className="text-xl">
                  <span className="font-bold">13/06</span> – Data limite de submissão dos trabalhos
                </p>
                <p className="text-xl">
                  <span className="font-bold">12/08</span> – Divulgação dos trabalhos aceitos
                </p>
                <p className="text-xl">
                  <span className="font-bold">14/08</span> – Data limite de inscrição dos trabalhos
                </p>
                <p className="text-xl font-bold">
                  26 e 27/08/2025 – EMPRAD
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Biblioteca Digital</h3>
            <p className="text-gray-600 mb-4">Acesso aos 1585 artigos científicos publicados nos anais do EMPRAD.</p>
            <Link to="/articles" className="text-blue-600 font-medium hover:underline inline-flex items-center">
              Ver artigos <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Assistente de Pesquisa</h3>
            <p className="text-gray-600 mb-4">Explore a nossa ferramenta de IA que ajuda a encontrar informações em todos os artigos do EMPRAD.</p>
            <Link to="/research-assistant" className="text-blue-600 font-medium hover:underline inline-flex items-center">
              Iniciar pesquisa <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Sobre o EMPRAD</h3>
            <p className="text-gray-600 mb-4">Conheça mais sobre o Encontro de Mestrados Profissionais em Administração.</p>
            <Link to="/about" className="text-blue-600 font-medium hover:underline inline-flex items-center">
              Saiba mais <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
