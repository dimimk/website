import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Calendar, Clock, Play, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import tmdbService from '../../services/tmdbService';
import config from '../../config/api';

const TVShowDetailPage = () => {
  const { id } = useParams();
  const [tvShow, setTVShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTVShowDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await tmdbService.fetchTVShowDetails(id);
        setTVShow(data);
      } catch (error) {
        console.error('Error fetching TV show details:', error);
        setError('Failed to fetch TV show details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTVShowDetails();
    }
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

  if (!tvShow) {
    return (
      <div className="container px-4 py-8 md:px-6">
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">TV show not found</p>
        </div>
      </div>
    );
  }

  const {
    name,
    overview,
    poster_path,
    backdrop_path,
    first_air_date,
    vote_average,
    genres,
    episode_run_time,
    number_of_seasons,
    number_of_episodes,
    created_by,
    networks,
    status,
    credits
  } = tvShow;

  const posterUrl = poster_path 
    ? `${config.tmdb.imageBaseUrl}${config.tmdb.posterSize}${poster_path}`
    : '/placeholder-poster.jpg';
    
  const backdropUrl = backdrop_path 
    ? `${config.tmdb.imageBaseUrl}${config.tmdb.backdropSize}${backdrop_path}`
    : null;
    
  const year = first_air_date ? new Date(first_air_date).getFullYear() : '';
  const runtime = episode_run_time && episode_run_time.length > 0 ? episode_run_time[0] : 0;
  const directors = created_by?.slice(0, 3) || [];
  const cast = credits?.cast?.slice(0, 6) || [];

  return (
    <div>
      {backdropUrl && (
        <div className="relative h-[50vh] w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30"></div>
          <img
            src={backdropUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      
      <div className="container px-4 py-8 md:px-6">
        <Link to="/tv-shows" className="inline-flex items-center gap-1 mb-6 text-sm hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to TV Shows
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <div>
            <div className="aspect-[2/3] overflow-hidden rounded-lg">
              <img
                src={posterUrl}
                alt={name}
                className="h-full w-full object-cover"
              />
            </div>
            
            <div className="mt-4 space-y-3">
              <Button 
                asChild 
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Link to={`/tv/${id}/watch`} className="flex items-center justify-center gap-2">
                  <Play className="h-4 w-4" />
                  Watch Now
                </Link>
              </Button>
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{name}</h1>
            
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {year && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{year}</span>
                </div>
              )}
              
              {runtime > 0 && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{runtime} min</span>
                </div>
              )}
              
              {vote_average > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">{vote_average.toFixed(1)}</span>
                </div>
              )}
              
              {status && (
                <Badge variant="outline" className="text-xs">
                  {status}
                </Badge>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {genres?.map((genre) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-muted-foreground">{overview || 'No overview available.'}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Details</h2>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Seasons</dt>
                    <dd>{number_of_seasons}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Episodes</dt>
                    <dd>{number_of_episodes}</dd>
                  </div>
                  {networks && networks.length > 0 && (
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Network</dt>
                      <dd>{networks.map(n => n.name).join(', ')}</dd>
                    </div>
                  )}
                </dl>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">Cast & Crew</h2>
                {directors.length > 0 && (
                  <div className="mb-3">
                    <h3 className="text-sm font-medium text-muted-foreground">Created by</h3>
                    <p>{directors.map(d => d.name).join(', ')}</p>
                  </div>
                )}
                
                {cast.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Cast</h3>
                    <p>{cast.map(c => c.name).join(', ')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVShowDetailPage;

