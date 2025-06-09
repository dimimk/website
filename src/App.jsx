import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/Home/HomePage'
import MoviesPage from './pages/Movies/MoviesPage'
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage'
import WatchPage from './pages/Watch/WatchPage'
import TVShowsPage from './pages/TVShows/TVShowsPage'
import TVShowDetailPage from './pages/TVShowDetail/TVShowDetailPage'
import TVWatchPage from './pages/TVWatch/TVWatchPage'
import SearchPage from './pages/Search/SearchPage'
import './App.css'

function AppContent() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar 
        onSearch={handleSearch} 
        toggleTheme={toggleTheme} 
        isDarkMode={isDarkMode} 
      />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/movie/:id/watch" element={<WatchPage />} />
          <Route path="/tv-shows" element={<TVShowsPage />} />
          <Route path="/tv/:id" element={<TVShowDetailPage />} />
          <Route path="/tv/:id/watch" element={<TVWatchPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </main>
      
      <footer className="border-t border-border py-6 mt-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} StreamVibe. All rights reserved.
            </p>
            <p className="text-center text-sm text-muted-foreground md:text-right">
              This is a demo project. Not for commercial use.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
