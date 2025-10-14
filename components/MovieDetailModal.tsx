import React, { useState } from 'react';
import { Movie, Screening } from '../types';
import { CloseIcon, PlayIcon, TicketIcon, FacebookIcon, TwitterIcon } from './icons';

interface MovieDetailModalProps {
  movie: Movie;
  onClose: () => void;
}

const screenings: Screening[] = [
  { time: '10:00', subtitles: 'ÍSL TEXTI' },
  { time: '12:00', subtitles: 'ENS TEXTI' },
  { time: '14:00', subtitles: 'ÍSL TEXTI' },
];

const MovieDetailModal: React.FC<MovieDetailModalProps> = ({ movie, onClose }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  const handleBuyTicket = (time: string) => {
    alert(`Sýndarmiðinn þinn fyrir "${movie.title}" klukkan ${time} hefur verið bókaður! Gleðileg jól!`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="relative bg-white dark:bg-neutral-900 text-black dark:text-white w-full max-w-6xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
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
              <h3 className="text-2xl font-bold text-red-500 mb-4 uppercase tracking-wider">Sýningartímar</h3>
              <ul>
                {screenings.map(screening => (
                  <li key={screening.time} className="mb-2 group">
                     <div className='flex items-center justify-between bg-neutral-200 dark:bg-neutral-700 overflow-hidden'>
                        <div className='p-3'>
                            <div className='font-bold text-lg'>{screening.time}</div>
                            <div className='text-xs text-neutral-500 dark:text-neutral-400'>{screening.subtitles}</div>
                        </div>
                        <button onClick={() => handleBuyTicket(screening.time)} className='bg-green-600 text-white px-6 h-full flex items-center gap-2 font-bold uppercase tracking-wider transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300'>
                            KAUPA <TicketIcon />
                        </button>
                     </div>
                  </li>
                ))}
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
                <div className="grid grid-cols-2 gap-4">
                    <a href="#" className="flex items-center justify-center gap-2 bg-blue-600 text-white p-2 font-bold hover:bg-blue-700 transition-colors">
                        <FacebookIcon /> Facebook
                    </a>
                    <a href="#" className="flex items-center justify-center gap-2 bg-sky-500 text-white p-2 font-bold hover:bg-sky-600 transition-colors">
                        <TwitterIcon /> Twitter
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