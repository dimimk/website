import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Navbar = ({ onSearch, toggleTheme, isDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">
              Stream<span className="text-blue-500">Vibe</span>
            </span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/movies" className="text-sm font-medium hover:text-primary transition-colors">
            Movies
          </Link>
          <Link to="/tv-shows" className="text-sm font-medium hover:text-primary transition-colors">
            TV Shows
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative hidden md:flex">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search movies, TV shows..."
              className="w-[200px] lg:w-[300px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

