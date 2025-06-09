import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import MovieCard from '../../components/MovieCard/MovieCard';
import TVShowCard from '../../components/TVShowCard/TVShowCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import tmdbService from '../../services/tmdbService';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [movies, setMovies] = useState([]);
  const [tvShows, setTVShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Search for both movies and TV shows
      const [movieResults, tvResults] = await Promise.all([
        tmdbService.searchMovies(query),
        tmdbService.searchTVShows(query)
      ]);

      setMovies(movieResults.results || []);
      setTVShows(tvResults.results || []);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
    }
  };

  const totalResults = movies.length + tvShows.length;

  return (
    <div className="container px-4 py-8 md:px-6">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Search</h1>
        
        <form onSubmit={handleSearch} className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search movies and TV shows..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" className="ml-2">
            Search
          </Button>
        </form>
      </div>

      {/* Search Results */}
      {searchParams.get('q') && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Search Results for "{searchParams.get('q')}"
            </h2>
            {!loading && (
              <p className="text-muted-foreground">
                Found {totalResults} result{totalResults !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {loading && (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}

          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && totalResults === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No results found for "{searchParams.get('q')}"
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Try searching with different keywords
              </p>
            </div>
          )}

          {!loading && !error && totalResults > 0 && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">
                  All ({totalResults})
                </TabsTrigger>
                <TabsTrigger value="movies">
                  Movies ({movies.length})
                </TabsTrigger>
                <TabsTrigger value="tv">
                  TV Shows ({tvShows.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="space-y-8">
                  {movies.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Movies</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                        {movies.slice(0, 12).map((movie) => (
                          <MovieCard key={movie.id} movie={movie} />
                        ))}
                      </div>
                    </div>
                  )}

                  {tvShows.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">TV Shows</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                        {tvShows.slice(0, 12).map((tvShow) => (
                          <TVShowCard key={tvShow.id} tvShow={tvShow} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="movies" className="mt-6">
                {movies.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                    {movies.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">
                      No movies found for "{searchParams.get('q')}"
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="tv" className="mt-6">
                {tvShows.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                    {tvShows.map((tvShow) => (
                      <TVShowCard key={tvShow.id} tvShow={tvShow} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">
                      No TV shows found for "{searchParams.get('q')}"
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      )}

      {/* Default state when no search query */}
      {!searchParams.get('q') && (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Search for Movies and TV Shows</h2>
          <p className="text-muted-foreground">
            Enter a search term above to find your favorite content
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;

