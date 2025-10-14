// Fix: Replaced placeholder content with a fully functional App component.
import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MovieGrid from './components/MovieGrid';
import About from './components/About';
import Footer from './components/Footer';
import MovieDetailModal from './components/MovieDetailModal';
import AdminLoginModal from './components/AdminLoginModal';
import { Movie, Genre } from './types';

// Mock data for Christmas movies
const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Die Hard',
    posterUrl: 'https://image.tmdb.org/t/p/w500/yFihWxQcmqcaBR31R6vcz3V2ehb.jpg',
    trailerUrl: 'https://www.youtube.com/embed/jaJuwKCmJbY',
    genres: [Genre.Action, Genre.Christmas],
    synopsis: 'An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.',
    year: 1988,
    director: 'John McTiernan',
    cast: ['Bruce Willis', 'Alan Rickman', 'Bonnie Bedelia'],
    duration: '132 min',
    language: 'English',
    subtitles: 'Icelandic'
  },
  {
    id: '2',
    title: 'Home Alone',
    posterUrl: 'https://image.tmdb.org/t/p/w500/uVwQ0QeXy0iC2hJsoag2ceh5Mv2.jpg',
    trailerUrl: 'https://www.youtube.com/embed/jEDaVHmw7r4',
    genres: [Genre.Comedy, Genre.Family, Genre.Christmas],
    synopsis: 'An eight-year-old troublemaker must protect his house from a pair of burglars when he is accidentally left home alone by his family during Christmas vacation.',
    year: 1990,
    director: 'Chris Columbus',
    cast: ['Macaulay Culkin', 'Joe Pesci', 'Daniel Stern'],
    duration: '103 min',
    language: 'English',
    subtitles: 'Icelandic'
  },
  {
    id: '3',
    title: 'The Grinch (2018)',
    posterUrl: 'https://image.tmdb.org/t/p/w500/1g84UaPgMev06gJNYs1nLpcJiuw.jpg',
    trailerUrl: 'https://www.youtube.com/embed/Bf6D-i8YpHg',
    genres: [Genre.Family, Genre.Comedy, Genre.Christmas, Genre.Fantasy],
    synopsis: 'A cynical grump goes on a mission to steal Christmas, only to have his heart changed by a young girl’s generous holiday spirit.',
    year: 2018,
    director: 'Scott Mosier, Yarrow Cheney',
    cast: ['Benedict Cumberbatch', 'Cameron Seely', 'Rashida Jones'],
    duration: '85 min',
    language: 'English',
    subtitles: 'Icelandic'
  },
  {
    id: '4',
    title: 'Klaus',
    posterUrl: 'https://image.tmdb.org/t/p/w500/q3k1Pj5M5y6sA4i82Tsc1c1kRfq.jpg',
    trailerUrl: 'https://www.youtube.com/embed/taE3PwurhYM',
    genres: [Genre.Family, Genre.Adventure, Genre.Christmas, Genre.Comedy],
    synopsis: 'A simple act of kindness always sparks another, even in a frozen, faraway place. When Smeerensburg\'s new postman, Jesper, befriends toymaker Klaus, their gifts melt an age-old feud and deliver a sleigh full of holiday traditions.',
    year: 2019,
    director: 'Sergio Pablos',
    cast: ['Jason Schwartzman', 'J.K. Simmons', 'Rashida Jones'],
    duration: '96 min',
    language: 'English',
    subtitles: 'Icelandic'
  },
  {
    id: '5',
    title: 'Elf',
    posterUrl: 'https://image.tmdb.org/t/p/w500/zDHF2KkMyb8Wd91b3V8p6x1I4kS.jpg',
    trailerUrl: 'https://www.youtube.com/embed/a54yC1etmVc',
    genres: [Genre.Comedy, Genre.Family, Genre.Christmas, Genre.Fantasy],
    synopsis: 'After discovering he is a human, a man raised as an elf at the North Pole decides to travel to New York City to locate his real father.',
    year: 2003,
    director: 'Jon Favreau',
    cast: ['Will Ferrell', 'James Caan', 'Zooey Deschanel'],
    duration: '97 min',
    language: 'English',
    subtitles: 'Icelandic'
  },
  {
    id: '6',
    title: 'The Nightmare Before Christmas',
    posterUrl: 'https://image.tmdb.org/t/p/w500/o3uF2A7I2d2QWOq4K8fG6kOq3a.jpg',
    trailerUrl: 'https://www.youtube.com/embed/wr6N_hZyBCk',
    genres: [Genre.Family, Genre.Fantasy, Genre.Christmas],
    synopsis: 'Jack Skellington, king of Halloween Town, discovers Christmas Town, but his attempts to bring Christmas to his home causes confusion.',
    year: 1993,
    director: 'Henry Selick',
    cast: ['Danny Elfman', 'Chris Sarandon', 'Catherine O\'Hara'],
    duration: '76 min',
    language: 'English',
    subtitles: 'Icelandic',
  },
];

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
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
      <Header 
        isMenuOpen={isMenuOpen}
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        onScrollToAbout={handleScrollToAbout}
        onAdminLoginClick={handleAdminLoginClick}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main>
        <Hero movie={mockMovies[0]} onSelectMovie={handleSelectMovie} />
        <MovieGrid movies={mockMovies} onSelectMovie={handleSelectMovie} isAdmin={isAdmin} />
        <About ref={aboutRef} />
      </main>
      <Footer isAdmin={isAdmin} />
      {selectedMovie && <MovieDetailModal movie={selectedMovie} onClose={handleCloseModal} />}
      {showAdminLogin && <AdminLoginModal onClose={() => setShowAdminLogin(false)} onLogin={handleAdminLogin} />}
    </div>
  );
};

export default App;
