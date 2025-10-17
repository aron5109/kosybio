import React, { useState, useEffect } from 'react';

interface AdminPanelProps {
  onLogout: () => void;
  onHeroImageChange: (url: string) => void;
}

const DEFAULT_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwKQAopDOkmibPqL6WwuJpUHAdmoqH_hejd97NE-uScXEjMUFU1AiSGAiXzuaB90ss-/exec';

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout, onHeroImageChange }) => {
  const [sheetUrl, setSheetUrl] = useState('');
  const [heroUrl, setHeroUrl] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    setSheetUrl(localStorage.getItem('googleSheetUrl') || DEFAULT_SHEET_URL);
    setHeroUrl(localStorage.getItem('heroImageUrl') || '');
  }, []);

  const handleSave = () => {
    try {
      if (sheetUrl) new URL(sheetUrl);
      if (heroUrl) new URL(heroUrl);
      
      localStorage.setItem('googleSheetUrl', sheetUrl);
      localStorage.setItem('heroImageUrl', heroUrl);
      onHeroImageChange(heroUrl);

      setSaveStatus('success');
    } catch (error) {
      setSaveStatus('error');
    } finally {
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  return (
    <section className="bg-white dark:bg-black py-12">
      <div className="container mx-auto px-4 max-w-3xl border-2 border-red-500 p-8">
        <h2 className="font-orbitron text-3xl font-bold uppercase text-red-500 mb-6 text-center">
          Stjórnborð
        </h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="heroImageUrl" className="block text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              Bakgrunnsmynd fyrir forsíðu (URL)
            </label>
            <input
              type="url"
              id="heroImageUrl"
              value={heroUrl}
              onChange={(e) => setHeroUrl(e.target.value)}
              className="w-full bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-700 p-3 text-black dark:text-white focus:outline-none focus:border-red-500 transition-colors"
              placeholder="https://daemi.is/mynd.jpg"
            />
             <p className="text-xs text-neutral-500 mt-2">
              Límdu inn slóð á mynd til að nota sem bakgrunn á forsíðu. Skildu eftir tómt til að nota sjálfgefnu myndina.
            </p>
          </div>
          <div>
            <label htmlFor="googleSheetUrl" className="block text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              Google Sheet Web App Slóð
            </label>
            <input
              type="url"
              id="googleSheetUrl"
              value={sheetUrl}
              onChange={(e) => setSheetUrl(e.target.value)}
              className="w-full bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-700 p-3 text-black dark:text-white focus:outline-none focus:border-red-500 transition-colors"
              placeholder="https://script.google.com/macros/s/..."
            />
            <p className="text-xs text-neutral-500 mt-2">
              Settu inn slóðina á Web App sem búið var til úr Google Apps Script. Skriftan þarf að geta tekið við POST beiðnum.
            </p>
          </div>
          <div className="space-y-4">
            <button
              onClick={handleSave}
              className="w-full bg-red-600 text-white font-bold uppercase tracking-wider py-3 px-6 border-2 border-red-600 hover:bg-transparent hover:text-red-500 transition-all duration-300"
            >
              Vista Stillingar
            </button>
            {saveStatus === 'success' && (
              <p className="text-green-500 text-center font-semibold">Stillingar vistaðar!</p>
            )}
            {saveStatus === 'error' && (
              <p className="text-red-500 text-center font-semibold">Ógild slóð. Gakktu úr skugga um að slóðirnar séu réttar.</p>
            )}
            <button
              onClick={onLogout}
              className="w-full bg-gray-600 text-white font-bold uppercase tracking-wider py-3 px-6 border-2 border-gray-600 hover:bg-transparent hover:text-gray-400 dark:hover:text-gray-400 transition-all duration-300"
            >
              Útskrá
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;