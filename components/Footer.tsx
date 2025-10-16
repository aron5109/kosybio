import React from 'react';

interface FooterProps {
  isAdmin: boolean;
}

const Footer: React.FC<FooterProps> = ({ isAdmin }) => {
  return (
    <footer className="bg-neutral-100 dark:bg-neutral-900 border-t-2 border-red-500">
      <div className="container mx-auto px-4 py-8 text-center text-neutral-500 dark:text-neutral-400">
        <h2 className="font-codystar text-2xl md:text-3xl font-bold tracking-widest uppercase mb-4">
          <span className="text-black dark:text-white">KÓSÝ</span>
          <span className="text-red-500">BÍÓ</span>
        </h2>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Kósýbíó. Allur réttur áskilinn.
        </p>
        <p className="text-xs mt-2">
          Þessi vefsíða er partur af Jólaþema Menningar- og þjónustusviðs. Engin réttur áskilin.
        </p>
        {isAdmin && (
            <p className="text-xs mt-4 p-2 bg-red-500/20 text-red-500 border border-red-500">
                Þú ert skráður inn sem stjórnandi.
            </p>
        )}
      </div>
    </footer>
  );
};

export default Footer;