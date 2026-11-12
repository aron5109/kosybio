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
const initialHeroMovie: Movie = {
  id: 'elf',
  title: 'Elf',
  posterUrl: 'elf.jpg',
  heroImageUrl: 'https://awolvision.com/cdn/shop/articles/holiday-movie-night-projector-family.jpg',
  trailerUrl: 'https://www.youtube.com/embed/gW9wRNqQ_P8',
  genres: [Genre.Comedy, Genre.Family, Genre.Christmas],
  synopsis: 'Buddy ólst upp meðal álfa jólasveinsins á Norðurpólnum en kemst að því að hann er í raun maður. Hann heldur til New York í leit að föður sínum og breiðir út jólagleði hvert sem hann fer.',
  year: 2003,
  director: 'Jon Favreau',
  cast: ['Will Ferrell', 'James Caan', 'Zooey Deschanel'],
  duration: '97 min',
  language: 'English',
  subtitles: 'Icelandic',
  screeningTime: '10:00'
};

// Data for the movies displayed in the grid
const gridMovies: Movie[] = [
  {
    id: 'loveactually',
    title: 'Love Actually',
    posterUrl: 'love-actually.jpg',
    trailerUrl: 'https://www.youtube.com/embed/H9Z3_ifFheQ',
    genres: [Genre.Comedy, Genre.Drama, Genre.Christmas],
    synopsis: 'Átta ólíkar ástarsögur fléttast saman í London vikurnar fyrir jól, þar sem ástin birtist í öllum sínum myndum – fyndin, sár og óvænt.',
    year: 2003,
    director: 'Richard Curtis',
    cast: ['Hugh Grant', 'Emma Thompson', 'Liam Neeson'],
    duration: '135 min',
    language: 'English',
    subtitles: 'Icelandic',
    screeningTime: '12:00'
  },
  {
    id: 'diehard',
    title: 'Die Hard',
    posterUrl: 'diehard1.jpg',
    trailerUrl: 'https://www.youtube.com/embed/jaJuwKCmJbY',
    genres: [Genre.Action, Genre.Christmas],
    synopsis: 'Lögreglumaðurinn John McClane ætlar að sættast við eiginkonu sína í jólaboði í háhýsi í Los Angeles þegar hryðjuverkamenn taka gestina í gíslingu. Hann er sá eini sem getur stöðvað þá.',
    year: 1988,
    director: 'John McTiernan',
    cast: ['Bruce Willis', 'Alan Rickman', 'Bonnie Bedelia'],
    duration: '132 min',
    language: 'English',
    subtitles: 'Icelandic',
    screeningTime: '14:00'
  },
];

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSnowing, setIsSnowing] = useState(true); // Snow is on by default
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [heroMovie, setHeroMovie] = useState<Movie>(initialHeroMovie);

  useEffect(() => {
    const savedHeroUrl = localStorage.getItem('heroImageUrl');
    if (savedHeroUrl) {
      setHeroMovie(prevMovie => ({ ...prevMovie, heroImageUrl: savedHeroUrl }));
    }
  }, []);

  const aboutRef = useRef<HTMLDivElement>(null);
  const movieGridRef = useRef<HTMLDivElement>(null);
  
  // Combine the hero movie with the other grid movies
  const allMoviesForGrid = [heroMovie, ...gridMovies];

  const handleHeroImageChange = (url: string) => {
    if (url) {
      setHeroMovie(prev => ({ ...prev, heroImageUrl: url }));
    } else {
      // Revert to default if URL is empty
      setHeroMovie(prev => ({ ...prev, heroImageUrl: initialHeroMovie.heroImageUrl }));
    }
  };

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

  const handleAdminLogout = () => {
    setIsAdmin(false);
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
        isAdmin={isAdmin}
        onAdminLogoutClick={handleAdminLogout}
      />
      <main>
        <Hero movie={heroMovie} onScrollToGrid={handleScrollToGrid} />
        <MovieGrid ref={movieGridRef} movies={allMoviesForGrid} onSelectMovie={handleSelectMovie} isAdmin={isAdmin} />
        {isAdmin && <AdminPanel onLogout={handleAdminLogout} onHeroImageChange={handleHeroImageChange} />}
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