import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Star, Clock, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import config from '../../config/api';

const MovieDetail = ({ movie, loading, error }) => {
  const { id } = useParams();
  
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
  
  if (!movie) {
    return (
      <div className="container px-4 py-8 md:px-6">
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">Movie not found</p>
        </div>
      </div>
    );
  }
  
  const {
    title,
    overview,
    poster_path,
    backdrop_path,
    vote_average,
    release_date,
    runtime,
    genres
  } = movie;
  
  const year = release_date ? new Date(release_date).getFullYear() : '';
  const posterUrl = poster_path 
    ? `${config.tmdb.imageBaseUrl}${config.tmdb.posterSize}${poster_path}`
    : '/placeholder-poster.jpg';
  const backdropUrl = backdrop_path 
    ? `${config.tmdb.imageBaseUrl}${config.tmdb.backdropSize}${backdrop_path}`
    : null;
  
  const formatRuntime = (minutes) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  return (
    <>
      <div 
        className="relative h-[70vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none',
          backgroundColor: !backdropUrl ? 'var(--card)' : 'transparent'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/50"></div>
        
        <div className="container relative z-10 h-full px-4 md:px-6">
          <div className="flex h-full flex-col justify-end pb-12 md:pb-16">
            <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12">
              <div className="hidden md:block">
                <img
                  src={posterUrl}
                  alt={title}
                  className="aspect-[2/3] w-full rounded-lg object-cover shadow-xl"
                />
              </div>
              
              <div>
                <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">{title}</h1>
                
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  {vote_average && (
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-medium">{vote_average.toFixed(1)}</span>
                    </div>
                  )}
                  
                  {year && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{year}</span>
                    </div>
                  )}
                  
                  {runtime && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{formatRuntime(runtime)}</span>
                    </div>
                  )}
                </div>
                
                {genres && genres.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {genres.map((genre) => (
                      <Badge key={genre.id} variant="secondary">
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                )}
                
                <p className="mt-6 text-muted-foreground md:text-lg">{overview}</p>
                
                <div className="mt-8">
                  <Button 
                    asChild 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Link to={`/movie/${id}/watch`} className="flex items-center gap-2">
                      <Play className="h-5 w-5" />
                      Watch Now
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container px-4 py-8 md:px-6">
        <h2 className="text-2xl font-bold mb-6">Cast</h2>
        {/* Cast would be implemented here */}
        <div className="text-muted-foreground">Cast information not available</div>
      </div>
    </>
  );
};

export default MovieDetail;

