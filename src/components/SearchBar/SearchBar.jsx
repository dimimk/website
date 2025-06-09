import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="w-full px-4 py-3 md:hidden">
      <form onSubmit={handleSearch} className="relative flex w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search movies..."
          className="w-full pl-9 pr-16"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button 
          type="submit" 
          size="sm" 
          className="absolute right-1 top-1/2 -translate-y-1/2"
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;

