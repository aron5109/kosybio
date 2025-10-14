import React, { useState } from 'react';
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon, EditIcon } from './icons';

interface FooterProps {
  isAdmin: boolean;
}

const initialLogos = [
  "https://bioparadis.is/wp-content/themes/bioparadis/library/nordisk.svg",
  "https://bioparadis.is/wp-content/themes/bioparadis/library/images/logos/logo-europe-media.svg",
  "https://bioparadis.is/wp-content/themes/bioparadis/library/images/logos/logo-europe-cinema.svg",
  "https://www.reykjanesbaer.is/static/files/Stjornsyslusvid/Merki/2025/rbn-merki-1x1-skjoldur-hvitt.svg"
];

const Footer: React.FC<FooterProps> = ({ isAdmin }) => {
  const [footerText, setFooterText] = useState("Kósýbíó is a digital-first cinema experience dedicated to the art of film. We celebrate storytelling in all its forms. All rights reserved.");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <footer className="bg-neutral-100 dark:bg-neutral-900 border-t-4 border-red-600 text-neutral-500 dark:text-neutral-400 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-orbitron text-2xl font-bold text-red-500 uppercase">Kósýbíó</h3>
            <div className="relative mt-4">
              {isEditing ? (
                <textarea 
                  value={footerText}
                  onChange={(e) => setFooterText(e.target.value)}
                  onBlur={() => setIsEditing(false)}
                  className="bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white p-2 w-full h-24"
                  autoFocus
                />
              ) : (
                 <p className="text-sm">{footerText}</p>
              )}
               {isAdmin && !isEditing && (
                <button onClick={() => setIsEditing(true)} className="absolute -top-2 -right-2 bg-red-600 p-1 rounded-full text-white">
                  <EditIcon size={12} />
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="font-semibold text-black dark:text-white uppercase tracking-wider mb-4">Fylgdu okkur</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-red-500 transition-colors"><FacebookIcon /></a>
              <a href="#" className="hover:text-red-500 transition-colors"><TwitterIcon /></a>
              <a href="#" className="hover:text-red-500 transition-colors"><InstagramIcon /></a>
              <a href="#" className="hover:text-red-500 transition-colors"><YoutubeIcon /></a>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-semibold text-black dark:text-white uppercase tracking-wider mb-4">Samstarfsaðilar</h4>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 items-center">
              {initialLogos.map((logo, index) => (
                <img 
                  key={index} 
                  src={logo} 
                  alt={`Partner logo ${index + 1}`} 
                  className="h-8 invert dark:invert-0 transition-all" 
                />
              ))}
            </div>
          </div>
        </div>
        <div className="text-center text-xs mt-12 border-t border-neutral-200 dark:border-neutral-700 pt-6">
          &copy; {new Date().getFullYear()} Kósýbíó Virtual Cinema. Project for fun.
        </div>
      </div>
    </footer>
  );
};

export default Footer;