
import React from 'react';
import { Menu } from 'lucide-react';

interface MobileMenuButtonProps {
  onClick: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="text-white p-2 ml-2"
      aria-label="Toggle menu"
    >
      <Menu size={24} />
    </button>
  );
};

export default MobileMenuButton;
