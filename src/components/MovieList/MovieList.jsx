import { useState, useEffect } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Filter, X } from 'lucide-react';

const MovieList = ({ 
  movies, 
  title = 'Movies', 
  loading = false, 
  error = null,
  onLoadMore = null,
  hasMorePages = false,
  filters = null,
  onFilterChange = null
}) => {
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [selectedSort, setSelectedSort] = useState('Most Popular');

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    if (onFilterChange) {
      onFilterChange({ genre, sort: selectedSort });
    }
  };

  const handleSortChange = (sort) => {
    setSelectedSort(sort);
    if (onFilterChange) {
      onFilterChange({ genre: selectedGenre, sort });
    }
  };

  const handleClearFilters = () => {
    setSelectedGenre('All Genres');
    setSelectedSort('Most Popular');
    if (onFilterChange) {
      onFilterChange({ genre: 'All Genres', sort: 'Most Popular' });
    }
  };

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      
      {filters && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedGenre === 'All Genres' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleGenreChange('All Genres')}
            >
              All Genres
            </Button>
            
            {filters.genres?.map((genre) => (
              <Button
                key={genre.id}
                variant={selectedGenre === genre.name ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleGenreChange(genre.name)}
              >
                {genre.name}
              </Button>
            ))}
            
            <Button
              variant={selectedSort === 'Most Popular' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSortChange('Most Popular')}
            >
              Most Popular
            </Button>
            
            <Button
              variant="destructive"
              size="sm"
              onClick={handleClearFilters}
              className="ml-auto"
            >
              <X className="h-4 w-4 mr-1" />
              Clear Filters
            </Button>
          </div>
        </div>
      )}
      
      {loading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          <p>{error}</p>
        </div>
      )}
      
      {!loading && !error && movies?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No movies found</p>
        </div>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      {hasMorePages && onLoadMore && (
        <div className="flex justify-center mt-8">
          <Button onClick={onLoadMore} disabled={loading}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default MovieList;

