
import React, { useState } from 'react';
import Logo from './header/Logo';
import DesktopNavigation from './header/DesktopNavigation';
import MobileMenuButton from './header/MobileMenuButton';
import MobileMenu from './header/MobileMenu';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-blue-900 shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <Logo />
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <MobileMenuButton onClick={toggleMenu} />
        </div>
        
        {/* Desktop Navigation */}
        <DesktopNavigation />
      </div>
      
      {/* Mobile Navigation */}
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </header>
  );
};

export default Header;
