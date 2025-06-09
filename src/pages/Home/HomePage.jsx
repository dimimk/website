import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MovieCard from '../../components/MovieCard/MovieCard';
import TVShowCard from '../../components/TVShowCard/TVShowCard';
import { Button } from '@/components/ui/button';
import tmdbService from '../../services/tmdbService';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        
        // Fetch trending movies
        const trendingData = await tmdbService.fetchTrendingMovies('day');
        setTrendingMovies(trendingData.results.slice(0, 6));
        
        // Fetch popular movies
        const popularData = await tmdbService.fetchPopularMovies();
        setPopularMovies(popularData.results.slice(0, 6));
        
        // Fetch popular TV shows
        const popularTVData = await tmdbService.fetchPopularTVShows();
        setPopularTVShows(popularTVData.results.slice(0, 6));
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch content. Please try again later.');
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="container px-4 py-8 md:px-6">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 md:p-8 lg:p-12">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Unlimited Movies & TV Shows
            </h1>
            <p className="mt-4 text-lg text-white/90 md:text-xl">
              Stream your favorite content anytime, anywhere. Discover the latest movies and TV shows.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-white/90"
              >
                <Link to="/movies">Browse Movies</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                className="bg-blue-800 text-white hover:bg-blue-900"
              >
                <Link to="/tv-shows">Browse TV Shows</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Movies Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Trending Today</h2>
          <Button asChild variant="ghost" size="sm">
            <Link to="/movies" className="flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {trendingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      {/* Popular Movies Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Popular Movies</h2>
          <Button asChild variant="ghost" size="sm">
            <Link to="/movies" className="flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {popularMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      {/* Popular TV Shows Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Popular TV Shows</h2>
          <Button asChild variant="ghost" size="sm">
            <Link to="/tv-shows" className="flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {popularTVShows.map((tvShow) => (
              <TVShowCard key={tvShow.id} tvShow={tvShow} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;

