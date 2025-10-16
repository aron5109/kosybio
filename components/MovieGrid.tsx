import React, { useState } from 'react';
import { Movie, Genre } from '../types';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  isAdmin: boolean;
}

const allGenres = Object.values(Genre);

const MovieGrid = React.forwardRef<HTMLDivElement, MovieGridProps>(({ movies, onSelectMovie, isAdmin }, ref) => {
  const [activeGenre, setActiveGenre] = useState<Genre>(Genre.All);

  const filteredMovies = activeGenre === Genre.All 
    ? movies 
    : movies.filter(movie => movie.genres.includes(activeGenre));

  return (
    <section ref={ref} className="py-16 md:py-24 bg-neutral-100 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {allGenres.map(genre => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`px-4 py-2 text-sm md:text-base font-semibold uppercase tracking-wider border-2 transition-colors duration-300 ${
                activeGenre === genre 
                ? 'bg-green-600 border-green-600 text-white' 
                : 'bg-transparent border-neutral-300 dark:border-neutral-600 text-neutral-500 dark:text-neutral-400 hover:border-green-600 hover:text-black dark:hover:text-white'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} onSelectMovie={onSelectMovie} isAdmin={isAdmin} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default MovieGrid;