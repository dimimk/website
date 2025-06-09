import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoPlayer from '../../components/MovieDetail/VideoPlayer';
import tmdbService from '../../services/tmdbService';

const WatchPage = () => {
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
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container px-4 py-8 md:px-6">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-background">
      <div className="container px-4 py-4 md:px-6">
        <div className="flex items-center gap-4 mb-4">
          <Button asChild variant="ghost" size="sm">
            <Link to={`/movie/${id}`} className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to details
            </Link>
          </Button>
          
          {movie && (
            <h1 className="text-xl font-bold truncate">
              {movie.title}
              <span className="ml-2 text-muted-foreground font-normal">
                {movie.release_date ? `(${new Date(movie.release_date).getFullYear()})` : ''}
              </span>
            </h1>
          )}
        </div>
      </div>
      
      {movie && (
        <VideoPlayer
          movieId={id}
          tmdbId={movie.id}
          imdbId={movie.imdb_id}
        />
      )}
    </div>
  );
};

export default WatchPage;

