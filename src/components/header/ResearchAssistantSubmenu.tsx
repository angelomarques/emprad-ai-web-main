
import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const ResearchAssistantSubmenu: React.FC = () => {
  return (
    <NavigationMenuContent className="bg-blue-950 min-w-[220px] p-2">
      <ul className="flex flex-col">
        <li>
          <NavigationMenuLink asChild>
            <Link to="/research-assistant" className="block py-2 px-4 text-white hover:text-yellow-300 transition-colors">
              Assistente de Pesquisa
            </Link>
          </NavigationMenuLink>
        </li>
        <li>
          <NavigationMenuLink asChild>
            <Link to="/smart-search" className="block py-2 px-4 text-white hover:text-yellow-300 transition-colors">
              Pesquisa Inteligente
            </Link>
          </NavigationMenuLink>
        </li>
        <li>
          <NavigationMenuLink asChild>
            <Link to="/direct-download" className="block py-2 px-4 text-white hover:text-yellow-300 transition-colors">
              Download Direto
            </Link>
          </NavigationMenuLink>
        </li>
        <li>
          <NavigationMenuLink asChild>
            <Link to="/indexed-articles" className="block py-2 px-4 text-white hover:text-yellow-300 transition-colors">
              Artigos Indexados
            </Link>
          </NavigationMenuLink>
        </li>
      </ul>
    </NavigationMenuContent>
  );
};

export default ResearchAssistantSubmenu;
