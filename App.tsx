// Fix: Replaced placeholder content with a fully functional App component.
import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MovieGrid from './components/MovieGrid';
import About from './components/About';
import Footer from './components/Footer';
import MovieDetailModal from './components/MovieDetailModal';
import AdminLoginModal from './components/AdminLoginModal';
import Snowfall from './components/Snowfall'; // Import the new Snowfall component
import { Movie, Genre } from './types';

// Data for the Hero section movie
const heroMovie: Movie = {
  id: 'grinch',
  title: 'How the Grinch Stole Christmas',
  posterUrl: 'https://www.originalfilmart.com/cdn/shop/products/grinch_2000_teaser_original_film_art_5000x.jpg?v=1635892741',
  heroImageUrl: 'https://www.hollywoodreporter.com/wp-content/uploads/2021/12/How-the-Grinch-Stole-Christmas-Everett-MSDDRSE_UV005-H-2021.jpg',
  trailerUrl: 'https://www.youtube.com/embed/DD0m9t4WHEQ',
  genres: [Genre.Family, Genre.Comedy, Genre.Christmas, Genre.Fantasy],
  synopsis: 'Í hinum duttlungafulla bæ Hver-bæ búa hinir kátu Hverjir sig undir jólin. En fyrir ofan bæinn trónir hinn gremjulegi, græni Grettir, sem hefur óbeit á hátíðinni og ætlar sér að stela henni frá þeim.',
  year: 2000,
  director: 'Ron Howard',
  cast: ['Jim Carrey', 'Taylor Momsen', 'Jeffrey Tambor'],
  duration: '104 min',
  language: 'English',
  subtitles: 'Icelandic'
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
    subtitles: 'Icelandic'
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
    subtitles: 'Icelandic'
  },
  {
    id: 'stuartlittle',
    title: 'Stuart Little',
    posterUrl: 'https://image.tmdb.org/t/p/w500/pIuQ2S2gY2mqr439TQAqgYI228g.jpg',
    trailerUrl: 'https://www.youtube.com/embed/lP_NsoAd3i4',
    genres: [Genre.Family, Genre.Adventure, Genre.Comedy, Genre.Fantasy],
    synopsis: 'Little-fjölskyldan ættleiðir heillandi unga mús að nafni Stuart, en heimiliskötturinn, Snowbell, er ekki hrifinn af honum og vill hann burt úr húsinu.',
    year: 1999,
    director: 'Rob Minkoff',
    cast: ['Michael J. Fox', 'Geena Davis', 'Hugh Laurie'],
    duration: '84 min',
    language: 'English',
    subtitles: 'Icelandic'
  },
];

// Combine the hero movie with the other grid movies
const allMoviesForGrid = [heroMovie, ...gridMovies];


const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Initialize theme from localStorage to persist user's choice
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);

  // Apply theme class to <html> and save choice to localStorage
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const handleScrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
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
      <Snowfall />
      <Header 
        isMenuOpen={isMenuOpen}
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        onScrollToAbout={handleScrollToAbout}
        onAdminLoginClick={handleAdminLoginClick}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main>
        <Hero movie={heroMovie} onSelectMovie={handleSelectMovie} />
        <MovieGrid movies={allMoviesForGrid} onSelectMovie={handleSelectMovie} isAdmin={isAdmin} />
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