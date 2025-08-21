import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { useLogoutMutation } from "@/services/auth/mutations";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated, user } = useAuthStore();
  const logoutMutation = useLogoutMutation();

  const handleLogout = () => {
    logoutMutation.mutate();
    onClose();
  };

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

        {/* TODO: implement it */}
        {/* <Link 
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
        </Link> */}

        {/* Authentication Section */}
        <div className="border-t border-blue-800 pt-4">
          {isAuthenticated ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-white px-4">
                <User size={16} />
                <span className="text-sm">{user?.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="text-white hover:text-yellow-300 hover:bg-blue-800 w-full justify-start"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link to="/login" onClick={onClose}>
                <Button
                  variant="ghost"
                  className="text-white hover:text-yellow-300 hover:bg-blue-800 w-full"
                >
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MobileMenu;
