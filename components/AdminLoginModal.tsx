import React, { useState } from 'react';
import { CloseIcon } from './icons';

interface AdminLoginModalProps {
  onClose: () => void;
  onLogin: (success: boolean) => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call.
    // Here, we just use hardcoded credentials.
    if (username === 'admin' && password === 'password') {
      onLogin(true);
    } else {
      onLogin(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="relative bg-white dark:bg-neutral-900 border-2 border-red-600 w-full max-w-md p-8 text-black dark:text-white"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-black dark:text-white hover:text-red-500">
          <CloseIcon />
        </button>
        <h2 className="font-orbitron text-3xl text-center font-bold uppercase text-red-500 mb-6">Innskráning stjórnanda</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2" htmlFor="username">
              Notandanafn
            </label>
            <input 
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-700 p-3 text-black dark:text-white focus:outline-none focus:border-red-500 transition-colors"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2" htmlFor="password">
              Lykilorð
            </label>
            <input 
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-700 p-3 text-black dark:text-white focus:outline-none focus:border-red-500 transition-colors"
              placeholder="password"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-red-600 text-white font-bold uppercase tracking-wider py-3 px-8 border-2 border-red-600 hover:bg-transparent hover:text-red-500 transition-all duration-300"
          >
            Skrá inn
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;