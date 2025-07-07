import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Crown, Users } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Crown className="h-8 w-8 text-purple-600 group-hover:text-purple-700 transition-colors" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Miss Mister 2025
            </span>
          </Link>
          
          <nav className="flex space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Crown className="h-4 w-4" />
              <span>Accueil</span>
            </Link>
            <Link
              to="/vote"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/vote'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Vote</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;