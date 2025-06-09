import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetail from '../../components/MovieDetail/MovieDetail';
import tmdbService from '../../services/tmdbService';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await tmdbService.fetchMovieDetails(id);
        setMovie(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movie details. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchMovieDetails();
  }, [id]);
  
  return (
    <MovieDetail
      movie={movie}
      loading={loading}
      error={error}
    />
  );
};

export default MovieDetailPage;

