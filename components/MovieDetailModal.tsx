import React, { useState } from 'react';
import { Movie } from '../types';
import { CloseIcon, PlayIcon, TicketIcon, FacebookIcon, TwitterIcon } from './icons';

interface MovieDetailModalProps {
  movie: Movie;
  onClose: () => void;
}

const DEFAULT_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwKQAopDOkmibPqL6WwuJpUHAdmoqH_hejd97NE-uScXEjMUFU1AiSGAiXzuaB90ss-/exec';

const SignupModal: React.FC<{ movie: Movie; onClose: () => void }> = ({ movie, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const sheetUrl = localStorage.getItem('googleSheetUrl') || DEFAULT_SHEET_URL;

    if (!sheetUrl) {
      setError('Stjórnandi hefur ekki sett upp skráningu. Vinsamlegast hafið samband.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Use a simple delimited string for robustness instead of JSON
      const DELIMITER = '|||';
      const bodyPayload = `${fullName}${DELIMITER}${movie.title}`;

      const response = await fetch(sheetUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: bodyPayload,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setIsSubmitted(true);
    } catch (e) {
      console.error('Signup submission error:', e);
      setError('Ekki tókst að senda skráningu. Vinsamlegast reynið aftur síðar.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="absolute inset-0 bg-black bg-opacity-95 z-30 flex items-center justify-center p-4">
      <div 
        className="relative bg-white dark:bg-neutral-900 border-2 border-green-600 w-full max-w-md p-8 text-black dark:text-white"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-black dark:text-white hover:text-red-500">
          <CloseIcon />
        </button>
        
        {!isSubmitted ? (
          <>
            <h2 className="font-orbitron text-2xl text-center font-bold uppercase text-green-500 mb-4">Skráning á {movie.title}</h2>
            <p className="text-center text-sm text-neutral-600 dark:text-neutral-300 mb-6">
              Skráðu þig til að eiga möguleika á jólaglaðning. Dregið verður út klukkan 15:30, 10. desember. Einn stór jólapottur er fyrir allar skráningar!
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2" htmlFor="fullName">
                  Fullt nafn
                </label>
                <input 
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-700 p-3 text-black dark:text-white focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Jón Jónsson"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white font-bold uppercase tracking-wider py-3 px-6 border-2 border-green-600 hover:bg-transparent hover:text-green-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sendir...' : 'Staðfesta skráningu'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Takk fyrir!</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mb-6">
              Þú hefur verið skráð(ur) á sýninguna á "{movie.title}". Gangi þér vel í jólapottinum!
            </p>
            <button 
              onClick={onClose}
              className="w-full bg-red-600 text-white font-bold uppercase tracking-wider py-3 px-8 border-2 border-red-600 hover:bg-transparent hover:text-red-500 transition-all duration-300"
            >
              Loka
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


const MovieDetailModal: React.FC<MovieDetailModalProps> = ({ movie, onClose }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="relative bg-white dark:bg-neutral-900 text-black dark:text-white w-full max-w-6xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {showSignup && <SignupModal movie={movie} onClose={() => setShowSignup(false)} />}
        
        <button onClick={onClose} className="absolute top-4 right-4 text-black dark:text-white hover:text-red-500 z-20">
          <CloseIcon size={32} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
          <div className="lg:col-span-3">
            <div className="relative w-full bg-black" style={{ aspectRatio: '16/9' }}>
              {!showTrailer ? (
                <>
                  <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <button onClick={() => setShowTrailer(true)} className="text-white hover:text-red-500 transition-colors">
                      <PlayIcon size={80} />
                    </button>
                  </div>
                </>
              ) : (
                <iframe
                  width="100%"
                  height="100%"
                  src={`${movie.trailerUrl}?autoplay=1`}
                  title={`${movie.title} trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            <div className="p-6 md:p-8">
              <h2 className="font-orbitron text-3xl md:text-4xl font-bold uppercase mb-4 text-black dark:text-white">{movie.title}</h2>
              <p className="text-neutral-600 dark:text-neutral-300">{movie.synopsis}</p>
            </div>
          </div>

          <div className="lg:col-span-2 bg-neutral-100 dark:bg-neutral-800 p-6 md:p-8">
            <div className="box nextShows">
              <h3 className="text-2xl font-bold text-red-500 mb-2 uppercase tracking-wider">Sýningartími</h3>
              <p className="text-lg font-semibold text-black dark:text-white mb-4">10. desember</p>
              <ul>
                  <li className="mb-2 group">
                     <div className='flex items-center justify-between bg-neutral-200 dark:bg-neutral-700 overflow-hidden'>
                        <div className='p-3'>
                            <div className='font-bold text-lg'>{movie.screeningTime}</div>
                            <div className='text-xs text-neutral-500 dark:text-neutral-400'>{movie.subtitles}</div>
                        </div>
                        <button onClick={() => setShowSignup(true)} className='bg-green-600 text-white px-4 h-full flex items-center gap-2 font-bold uppercase tracking-wider transform translate-x-0 transition-transform duration-300 text-center text-sm'>
                            Skrá mig á sýningu
                        </button>
                     </div>
                  </li>
              </ul>
            </div>

            <hr className="my-6 border-t-2 border-red-500" />

            <ul className="text-sm space-y-2 text-neutral-600 dark:text-neutral-300">
              <li><strong className="text-black dark:text-white">Frumsýnd:</strong> {movie.year}</li>
              <li><strong className="text-black dark:text-white">Leikstjórn:</strong> {movie.director}</li>
              <li><strong className="text-black dark:text-white">Leikarar:</strong> {movie.cast.join(', ')}</li>
              <li><strong className="text-black dark:text-white">Lengd:</strong> {movie.duration}</li>
              <li><strong className="text-black dark:text-white">Tungumál:</strong> {movie.language}</li>
              <li><strong className="text-black dark:text-white">Texti:</strong> {movie.subtitles}</li>
              <li><strong className="text-black dark:text-white">Tegund:</strong> {movie.genres.join(', ')}</li>
            </ul>

            <div className="mt-8">
                <div className="grid grid-cols-1 gap-4">
                    <a href="http://facebook.com/reykjanesbaer.is/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-blue-600 text-white p-2 font-bold hover:bg-blue-700 transition-colors">
                        <FacebookIcon /> Facebook
                    </a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailModal;