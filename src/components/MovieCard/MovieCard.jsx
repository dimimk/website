import { Link } from 'react-router-dom';
import { Star, Info, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import config from '../../config/api';

const MovieCard = ({ movie }) => {
  const { id, title, release_date, vote_average, poster_path } = movie;
  const year = release_date ? new Date(release_date).getFullYear() : '';
  const posterUrl = poster_path 
    ? `${config.tmdb.imageBaseUrl}${config.tmdb.posterSize}${poster_path}`
    : '/placeholder-poster.jpg';

  return (
    <div className="group relative overflow-hidden rounded-lg bg-card transition-all hover:shadow-xl">
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={posterUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-white">{vote_average?.toFixed(1)}</span>
          </div>
          
          <h3 className="text-base font-bold text-white line-clamp-2">{title}</h3>
          <p className="text-sm text-white/80">{year}</p>
          
          <div className="flex gap-2 mt-2">
            <Button 
              asChild 
              variant="default" 
              size="sm" 
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Link to={`/movie/${id}/watch`} className="flex items-center gap-1">
                <Play className="h-3 w-3" />
                Watch
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="sm" 
              className="w-full border-white/20 text-white hover:bg-white/10"
            >
              <Link to={`/movie/${id}`} className="flex items-center gap-1">
                <Info className="h-3 w-3" />
                Info
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-medium line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{year}</p>
      </div>
    </div>
  );
};

export default MovieCard;

