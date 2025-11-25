import React from 'react';
import { Movie } from '../types';

interface HeroProps {
  movie: Movie;
  onScrollToGrid: () => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onScrollToGrid }) => {
  const backgroundImageUrl = movie.heroImageUrl || movie.posterUrl;
  
  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white pt-16">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      <div className="relative z-10 p-4 max-w-4xl mx-auto">
        <h2 className="font-orbitron text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider">
          Kósýbíó <br /> 10 desember
        </h2>
        <p className="mt-4 text-lg md:text-xl text-neutral-300">
          {movie.genres.join(' / ')}
        </p>
        <div className="mt-8">
          <button
            onClick={onScrollToGrid}
            className="bg-green-600 text-white font-bold uppercase tracking-wider py-3 px-8 border-2 border-green-600 hover:bg-transparent hover:text-green-500 transition-all duration-300"
          >
            Skoða sýningar
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;