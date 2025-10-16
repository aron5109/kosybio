// Fix: Replaced placeholder content with a fully functional App component.
import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MovieGrid from './components/MovieGrid';
import About from './components/About';
import Footer from './components/Footer';
import MovieDetailModal from './components/MovieDetailModal';
import AdminLoginModal from './components/AdminLoginModal';
import AdminPanel from './components/AdminPanel';
import Snowfall from './components/Snowfall';
import { Movie, Genre } from './types';

// Data for the Hero section movie
const heroMovie: Movie = {
  id: 'holiday',
  title: 'The Holiday',
  posterUrl: 'https://m.media-amazon.com/images/M/MV5BZmEwNDg0M2QtMDdiNy00YTliLTk4ZjctOThjZjczODVmMTdkXkEyXkFqcGc@._V1_.jpg',
  heroImageUrl: 'https://awolvision.com/cdn/shop/articles/holiday-movie-night-projector-family.jpg',
  trailerUrl: 'https://www.youtube.com/embed/BDi5zH18vxU',
  genres: [Genre.Comedy, Genre.Drama, Genre.Christmas],
  synopsis: 'Tvær konur, önnur frá Ameríku og hin frá Bretlandi, skipta á heimilum yfir jólin eftir að hafa lent í slæmum sambandsslitum. Báðar finna þær óvænt ástina með heimamanni en uppgötva fljótt að endir frísins gæti sett strik í reikninginn.',
  year: 2006,
  director: 'Nancy Meyers',
  cast: ['Kate Winslet', 'Cameron Diaz', 'Jude Law'],
  duration: '136 min',
  language: 'English',
  subtitles: 'Icelandic',
  screeningTime: '10:00'
};

// Data for the movies displayed in the grid
const gridMovies: Movie[] = [
  {
    id: 'vacation',
    title: 'National Lampoon\'s Christmas Vacation',
    posterUrl: 'https://www.originalfilmart.com/cdn/shop/products/NationalLampoon_sChristmasVacation_1989_linen_original_film_art_f_1600x.webp',
    trailerUrl: 'https://www.youtube.com/embed/NBTTipJX-h4',
    genres: [Genre.Comedy, Genre.Christmas],
    synopsis: 'Áætlanir Griswold-fjölskyldunnar um stór fjölskyldujól breytast fyrirsjáanlega í stórslys.',
    year: 1989,
    director: 'Jeremiah S. Chechik',
    cast: ['Chevy Chase', 'Beverly D\'Angelo', 'Juliette Lewis'],
    duration: '97 min',
    language: 'English',
    subtitles: 'Icelandic',
    screeningTime: '12:00'
  },
  {
    id: 'homealone',
    title: 'Home Alone',
    posterUrl: 'https://www.originalfilmart.com/cdn/shop/products/HomeAlone_1990_original_film_art_5000x.jpg',
    trailerUrl: 'https://www.youtube.com/embed/jEDaVHmw7r4',
    genres: [Genre.Comedy, Genre.Family, Genre.Christmas],
    synopsis: 'Átta ára stríðnispúki þarf að verja hús sitt fyrir innbrotsþjófum þegar hann er óvart skilinn eftir einn heima af fjölskyldu sinni yfir jólin.',
    year: 1990,
    director: 'Chris Columbus',
    cast: ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern'],
    duration: '103 min',
    language: 'English',
    subtitles: 'Icelandic',
    screeningTime: '10:00'
  },
];

// Combine the hero movie with the other grid movies
const allMoviesForGrid = [heroMovie, ...gridMovies];


const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSnowing, setIsSnowing] = useState(true); // Snow is on by default
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const movieGridRef = useRef<HTMLDivElement>(null);

  const toggleSnow = () => {
    setIsSnowing(prev => !prev);
  };

  const handleScrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleScrollToGrid = () => {
    movieGridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleAdminLoginClick = () => {
    setShowAdminLogin(true);
    setIsMenuOpen(false);
  };

  const handleAdminLogin = (success: boolean) => {
    if (success) {
      setIsAdmin(true);
      setShowAdminLogin(false);
    } else {
      alert('Wrong username or password');
    }
  };

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white">
      <Snowfall isVisible={isSnowing} />
      <Header 
        isMenuOpen={isMenuOpen}
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        onScrollToAbout={handleScrollToAbout}
        onAdminLoginClick={handleAdminLoginClick}
        isSnowing={isSnowing}
        toggleSnow={toggleSnow}
      />
      <main>
        <Hero movie={heroMovie} onScrollToGrid={handleScrollToGrid} />
        <MovieGrid ref={movieGridRef} movies={allMoviesForGrid} onSelectMovie={handleSelectMovie} isAdmin={isAdmin} />
        {isAdmin && <AdminPanel />}
        {/* Fix: Corrected ref passing syntax for forwardRef component. */}
        <About ref={aboutRef} />
      </main>
      <Footer isAdmin={isAdmin} />
      {selectedMovie && <MovieDetailModal movie={selectedMovie} onClose={handleCloseModal} />}
      {showAdminLogin && <AdminLoginModal onClose={() => setShowAdminLogin(false)} onLogin={handleAdminLogin} />}
    </div>
  );
};

export default App;