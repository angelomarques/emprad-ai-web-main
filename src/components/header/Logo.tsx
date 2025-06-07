
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/lovable-uploads/97179c6a-6538-4ec3-8c93-b4d8f74455e3.png" 
        alt="EMPRAD Logo" 
        className="h-10 md:h-12 bg-white p-1 rounded"
      />
    </Link>
  );
};

export default Logo;
