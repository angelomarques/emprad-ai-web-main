import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/services/auth/mutations";
import { useAuthStore } from "@/stores/auth-store";
import { LogOut, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const DesktopNavigation: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const logoutMutation = useLogoutMutation();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="hidden md:flex items-center justify-between flex-grow ml-8">
      <nav className="flex items-center space-x-8">
        <Link
          to="/"
          className="text-yellow-300 font-medium hover:text-white transition-colors"
        >
          HOME
        </Link>

        {/* TODO: implement it */}
        {/* <Link to="/articles" className="text-white font-medium hover:text-yellow-300 transition-colors">
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
        </button> */}
      </nav>

      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <div className="flex items-center space-x-2 text-white">
              <User size={16} />
              <span className="text-sm">{user?.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="text-white hover:text-yellow-300 hover:bg-blue-800"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </>
        ) : (
          <div className="flex items-center space-x-2">
            <Link to="/login">
              <Button
                variant="ghost"
                className="text-white hover:text-yellow-300 hover:bg-blue-800"
              >
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopNavigation;
