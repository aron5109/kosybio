import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Movie, Genre } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import MovieGrid from './components/MovieGrid';
import MovieDetailModal from './components/MovieDetailModal';
import About from './components/About';
import Footer from './components/Footer';
import AdminLoginModal from './components/AdminLoginModal';

const Snowfall: React.FC = () => {
  const snowflakes = Array.from({ length: 150 }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}vw`,
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      animationDelay: `${Math.random() * 10}s`,
      animationDuration: `${Math.random() * 10 + 5}s`,
    };
    return <div key={i} className="snowflake" style={style}></div>;
  });

  return (
    <>
      <style>{`
        .snowflake {
          position: fixed;
          top: -10px;
          background-color: white;
          border-radius: 50%;
          opacity: 0.8;
          pointer-events: none;
          z-index: 9999;
          animation: fall linear infinite;
        }
        @keyframes fall {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(105vh) translateX(${Math.random() * 40 - 20}px); }
        }
      `}</style>
      <div className="snow-container">{snowflakes}</div>
    </>
  );
};


const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'TRON: ARES',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BYzk0NjE4NzYtZjc5Ni00MTkxLTgyY2QtZjliOTA5N2U2YzM1XkEyXkFqcGc@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    synopsis: 'A sophisticated Program, Ares, is sent from the digital world into our world on a dangerous mission, marking humankind’s first encounter with A.I. beings.',
    year: 2025,
    duration: '125 min',
    director: 'Joachim Rønning',
    cast: ['Jared Leto', 'Greta Lee', 'Evan Peters', 'Cameron Monaghan'],
    language: 'English',
    subtitles: 'Icelandic',
    genres: [Genre.SciFi, Genre.Action, Genre.Thriller],
  },
  {
    id: 2,
    title: 'Cyber Santa\'s Sleigh',
    posterUrl: 'https://picsum.photos/seed/cyberpunkchristmas/1000/1500',
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    synopsis: 'In a neon-drenched future, a rogue AI has stolen Christmas. Only a grizzled detective and his cybernetically-enhanced reindeer can get it back.',
    year: 2024,
    duration: '110 min',
    director: 'Klaus Kinski',
    cast: ['RoboClaus', 'Unit 734', 'Glitch the Elf'],
    language: 'Binary',
    subtitles: 'English, Icelandic',
    genres: [Genre.SciFi, Genre.Festive, Genre.Action],
  },
  {
    id: 3,
    title: 'The Last Gingerbread',
    posterUrl: 'https://picsum.photos/seed/gingerman/1000/1500',
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    synopsis: 'In a post-apocalyptic winter wasteland, a single, sentient gingerbread man must protect the last oven from the frostbitten hordes.',
    year: 2024,
    duration: '95 min',
    director: 'Ginger Snap',
    cast: ['Crispin Glover', 'Tilda Swinton (voice)'],
    language: 'English',
    subtitles: 'Icelandic',
    genres: [Genre.Thriller, Genre.Festive],
  },
];


const App: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };
  
  const aboutRef = useRef<HTMLDivElement>(null);

  const handleSelectMovie = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  const handleScrollToAbout = useCallback(() => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  }, []);

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      alert('Admin mode activated!');
    } else {
      alert('Invalid credentials.');
    }
  };
  
  const handleToggleAdminLogin = () => {
    setShowAdminLogin(prev => !prev);
    setIsMenuOpen(false);
  }

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen transition-colors duration-500">
      <Snowfall />
      <Header 
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
        onScrollToAbout={handleScrollToAbout}
        onAdminLoginClick={handleToggleAdminLogin}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      
      <main>
        <Hero movie={mockMovies[0]} onSelectMovie={handleSelectMovie} />
        <MovieGrid movies={mockMovies} onSelectMovie={handleSelectMovie} isAdmin={isAdmin} />
        <About ref={aboutRef} />
      </main>

      <Footer isAdmin={isAdmin} />

      {selectedMovie && (
        <MovieDetailModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
      {showAdminLogin && (
        <AdminLoginModal onClose={() => setShowAdminLogin(false)} onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;