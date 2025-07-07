import React from 'react';
import logo from '../assets/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200/50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <img src={logo} alt="Miss Mister 2025 Logo" className="h-12 mb-4" />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Miss Mister 2025. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
