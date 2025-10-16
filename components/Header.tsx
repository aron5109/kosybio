import React from 'react';
import { CloseIcon, HamburgerIcon, SnowflakeIcon, SnowflakeOffIcon } from './icons';

interface HeaderProps {
  isMenuOpen: boolean;
  onMenuClick: () => void;
  onScrollToAbout: () => void;
  onAdminLoginClick: () => void;
  isSnowing: boolean;
  toggleSnow: () => void;
  isAdmin: boolean;
  onAdminLogoutClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, onMenuClick, onScrollToAbout, onAdminLoginClick, isSnowing, toggleSnow, isAdmin, onAdminLogoutClick }) => {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm p-4 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-codystar text-3xl md:text-4xl font-bold tracking-widest uppercase">
            <span className="text-white">KÓSÝ</span>
            <span className="text-red-500">BÍÓ</span>
          </h1>
          <nav className="hidden md:flex space-x-6 items-center">
            <button onClick={onScrollToAbout} className="text-white hover:text-red-500 transition-colors uppercase font-semibold">Um</button>
            {isAdmin ? (
              <button onClick={onAdminLogoutClick} className="text-white hover:text-red-500 transition-colors uppercase font-semibold">Útskrá</button>
            ) : (
              <button onClick={onAdminLoginClick} className="text-white hover:text-red-500 transition-colors uppercase font-semibold">Stjórnandi</button>
            )}
            <button onClick={toggleSnow} className="text-white hover:text-red-500 transition-colors">
              {isSnowing ? <SnowflakeIcon /> : <SnowflakeOffIcon />}
            </button>
          </nav>
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleSnow} className="text-white">
              {isSnowing ? <SnowflakeIcon /> : <SnowflakeOffIcon />}
            </button>
            <button onClick={onMenuClick} className="text-white z-50">
              {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black bg-opacity-95 z-40 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center`}>
        <nav className="flex flex-col space-y-8 text-center">
          <button onClick={onScrollToAbout} className="text-white text-3xl font-orbitron hover:text-red-500 transition-colors uppercase">Um Kósýbíó</button>
          {isAdmin ? (
             <button onClick={() => { onAdminLogoutClick(); onMenuClick(); }} className="text-white text-3xl font-orbitron hover:text-red-500 transition-colors uppercase">Útskrá</button>
          ) : (
            <button onClick={onAdminLoginClick} className="text-white text-3xl font-orbitron hover:text-red-500 transition-colors uppercase">Innskráning stjórnanda</button>
          )}
        </nav>
      </div>
    </>
  );
};

export default Header;