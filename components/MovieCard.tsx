import React from 'react';
import { Movie } from '../types';
import { EditIcon } from './icons';

interface MovieCardProps {
  movie: Movie;
  onSelectMovie: (movie: Movie) => void;
  isAdmin: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelectMovie, isAdmin }) => {
  return (
    <div 
      className="group relative overflow-hidden border-2 border-neutral-200 dark:border-neutral-800 cursor-pointer"
      onClick={() => onSelectMovie(movie)}
    >
      {isAdmin && (
        <div className="absolute top-2 right-2 bg-red-600 p-2 rounded-full z-20 text-white">
          <EditIcon />
        </div>
      )}
      <img 
        src={movie.posterUrl} 
        alt={`Poster for ${movie.title}`} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        style={{ aspectRatio: '2 / 3' }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-500 flex items-end p-6">
        <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
          <h3 className="font-orbitron text-2xl font-bold text-white uppercase">{movie.title}</h3>
          <p className="text-red-500 font-semibold">{movie.genres.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;