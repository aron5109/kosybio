import React from 'react';
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from './icons';

interface HeaderProps {
  isMenuOpen: boolean;
  onMenuClick: () => void;
  onScrollToAbout: () => void;
  onAdminLoginClick: () => void;
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, onMenuClick, onScrollToAbout, onAdminLoginClick, theme, toggleTheme }) => {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm p-4 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-orbitron text-2xl md:text-3xl font-bold tracking-widest text-red-500 uppercase">
            Kósístofan
          </h1>
          <nav className="hidden md:flex space-x-6 items-center">
            <button onClick={onScrollToAbout} className="text-black dark:text-white hover:text-red-500 transition-colors uppercase font-semibold">Um</button>
            <button onClick={onAdminLoginClick} className="text-black dark:text-white hover:text-red-500 transition-colors uppercase font-semibold">Stjórnandi</button>
            <button onClick={toggleTheme} className="text-black dark:text-white hover:text-red-500 transition-colors">
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </nav>
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="text-black dark:text-white">
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <button onClick={onMenuClick} className="text-black dark:text-white z-50">
              {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black bg-opacity-95 z-40 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center`}>
        <nav className="flex flex-col space-y-8 text-center">
          <button onClick={onScrollToAbout} className="text-white text-3xl font-orbitron hover:text-red-500 transition-colors uppercase">Um Kósístofuna</button>
          <button onClick={onAdminLoginClick} className="text-white text-3xl font-orbitron hover:text-red-500 transition-colors uppercase">Innskráning stjórnanda</button>
        </nav>
      </div>
    </>
  );
};

export default Header;