
import React from 'react';
import Header from '../components/Header';
import ChatInterface from '../components/ChatInterface';
import { Book, Search, Download, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const ResearchAssistant: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6 flex-grow flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-emprad-dark-purple">Assistente de Pesquisa EMPRAD</h1>
          <p className="text-gray-600 mt-2">
            Use nossa IA para pesquisar entre os 1585 artigos científicos do EMPRAD e encontrar informações relevantes para sua pesquisa.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
          <Link to="/smart-search" className="bg-white p-4 rounded-lg shadow-sm border flex items-center hover:shadow-md transition-shadow">
            <div className="rounded-full bg-emprad-light-purple p-3 mr-4">
              <Search className="h-5 w-5 md:h-6 md:w-6 text-emprad-dark-purple" />
            </div>
            <div>
              <h3 className="font-medium">Pesquisa Inteligente</h3>
              <p className="text-sm text-gray-600">Busca contextual em todos os artigos</p>
            </div>
          </Link>
          
          <Link to="/direct-download" className="bg-white p-4 rounded-lg shadow-sm border flex items-center hover:shadow-md transition-shadow">
            <div className="rounded-full bg-emprad-light-purple p-3 mr-4">
              <Download className="h-5 w-5 md:h-6 md:w-6 text-emprad-dark-purple" />
            </div>
            <div>
              <h3 className="font-medium">Download Direto</h3>
              <p className="text-sm text-gray-600">Acesso aos artigos completos</p>
            </div>
          </Link>
          
          <Link to="/indexed-articles" className="bg-white p-4 rounded-lg shadow-sm border flex items-center hover:shadow-md transition-shadow">
            <div className="rounded-full bg-emprad-light-purple p-3 mr-4">
              <Database className="h-5 w-5 md:h-6 md:w-6 text-emprad-dark-purple" />
            </div>
            <div>
              <h3 className="font-medium">Artigos Indexados</h3>
              <p className="text-sm text-gray-600">Base de conhecimento abrangente</p>
            </div>
          </Link>
        </div>
        
        <div className="flex-grow bg-white rounded-lg shadow-sm border overflow-hidden flex flex-col">
          <div className="bg-emprad-light-purple p-4 border-b">
            <h2 className="text-emprad-dark-purple font-semibold">Chat com o Assistente EMPRAD</h2>
            <p className="text-sm text-gray-600">Pergunte sobre empreendedorismo, inovação, gestão e outros temas de interesse</p>
          </div>
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default ResearchAssistant;
