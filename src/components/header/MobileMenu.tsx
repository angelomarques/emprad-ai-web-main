
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <nav className="md:hidden bg-blue-950">
      <div className="flex flex-col p-4 space-y-3">
        <Link 
          to="/" 
          className="text-yellow-300 font-medium hover:text-white transition-colors py-2 px-4"
          onClick={onClose}
        >
          HOME
        </Link>
        <Link 
          to="/articles" 
          className="text-white font-medium hover:text-yellow-300 transition-colors py-2 px-4"
          onClick={onClose}
        >
          EDIÇÕES ANTERIORES
        </Link>
        <Link 
          to="/articles" 
          className="text-white font-medium hover:text-yellow-300 transition-colors py-2 px-4"
          onClick={onClose}
        >
          TRABALHOS
        </Link>
        <div className="py-2 px-4">
          <span className="text-white font-medium">ASSISTENTE DE PESQUISA</span>
          <div className="ml-4 mt-2 space-y-2">
            <Link 
              to="/research-assistant" 
              className="block text-white hover:text-yellow-300 transition-colors py-1"
              onClick={onClose}
            >
              Assistente de Pesquisa
            </Link>
            <Link 
              to="/smart-search" 
              className="block text-white hover:text-yellow-300 transition-colors py-1"
              onClick={onClose}
            >
              Pesquisa Inteligente
            </Link>
            <Link 
              to="/direct-download" 
              className="block text-white hover:text-yellow-300 transition-colors py-1"
              onClick={onClose}
            >
              Download Direto
            </Link>
            <Link 
              to="/indexed-articles" 
              className="block text-white hover:text-yellow-300 transition-colors py-1"
              onClick={onClose}
            >
              Artigos Indexados
            </Link>
          </div>
        </div>
        <Link 
          to="/about" 
          className="text-white font-medium hover:text-yellow-300 transition-colors py-2 px-4"
          onClick={onClose}
        >
          ÁREAS
        </Link>
        <Link 
          to="/about" 
          className="text-white font-medium hover:text-yellow-300 transition-colors py-2 px-4"
          onClick={onClose}
        >
          CONTATO
        </Link>
        <div className="py-2 px-4">
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold w-full">
            LOGIN
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default MobileMenu;
