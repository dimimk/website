import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import SearchBar from '../../components/SearchBar/SearchBar';
import tmdbService from '../../services/tmdbService';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  const searchQuery = searchParams.get('query') || '';
  const selectedGenre = searchParams.get('genre') || 'All Genres';
  const sortBy = searchParams.get('sort') || 'Most Popular';
  
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await tmdbService.fetchGenres();
        setGenres(data.genres);
      } catch (err) {
        console.error('Error fetching genres:', err);
      }
    };
    
    fetchGenres();
  }, []);
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let data;
        
        if (searchQuery) {
          // Search for movies
          data = await tmdbService.searchMovies(searchQuery, currentPage);
        } else if (selectedGenre !== 'All Genres') {
          // Find genre ID by name
          const genre = genres.find(g => g.name === selectedGenre);
          if (genre) {
            // Fetch movies by genre
            data = await tmdbService.fetchMoviesByGenre(genre.id, currentPage);
          } else {
            // Fallback to popular movies
            data = await tmdbService.fetchPopularMovies(currentPage);
          }
        } else {
          // Fetch popular movies
          data = await tmdbService.fetchPopularMovies(currentPage);
        }
        
        if (currentPage === 1) {
          setMovies(data.results);
        } else {
          setMovies(prevMovies => [...prevMovies, ...data.results]);
        }
        
        setTotalPages(data.total_pages);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, [searchQuery, selectedGenre, sortBy, currentPage, genres]);
  
  const handleSearch = (query) => {
    setCurrentPage(1);
    setSearchParams({ query });
  };
  
  const handleFilterChange = ({ genre, sort }) => {
    setCurrentPage(1);
    
    const params = {};
    if (searchQuery) params.query = searchQuery;
    if (genre !== 'All Genres') params.genre = genre;
    if (sort !== 'Most Popular') params.sort = sort;
    
    setSearchParams(params);
  };
  
  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };
  
  return (
    <>
      <SearchBar onSearch={handleSearch} />
      
      <MovieList
        movies={movies}
        title={searchQuery ? `Search Results for "${searchQuery}"` : 'Movies'}
        loading={loading}
        error={error}
        onLoadMore={handleLoadMore}
        hasMorePages={currentPage < totalPages}
        filters={{ genres }}
        onFilterChange={handleFilterChange}
      />
    </>
  );
};

export default MoviesPage;

