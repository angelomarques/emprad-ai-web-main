
import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import ResearchAssistantSubmenu from './ResearchAssistantSubmenu';

const DesktopNavigation: React.FC = () => {
  return (
    <div className="hidden md:flex items-center justify-between flex-grow ml-8">
      <nav className="flex items-center space-x-8">
        <Link to="/" className="text-yellow-300 font-medium hover:text-white transition-colors">
          HOME
        </Link>
        <Link to="/articles" className="text-white font-medium hover:text-yellow-300 transition-colors">
          EDIÇÕES ANTERIORES
        </Link>
        <Link to="/articles" className="text-white font-medium hover:text-yellow-300 transition-colors">
          TRABALHOS
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-white font-medium bg-transparent hover:bg-blue-800 hover:text-yellow-300">
                ASSISTENTE DE PESQUISA
              </NavigationMenuTrigger>
              <ResearchAssistantSubmenu />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Link to="/about" className="text-white font-medium hover:text-yellow-300 transition-colors">
          ÁREAS
        </Link>
        <Link to="/about" className="text-white font-medium hover:text-yellow-300 transition-colors">
          CONTATO
        </Link>
        <button className="text-white" aria-label="Search">
          <Search size={20} />
        </button>
      </nav>

      <div>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold">
          LOGIN
        </Button>
      </div>
    </div>
  );
};

export default DesktopNavigation;
