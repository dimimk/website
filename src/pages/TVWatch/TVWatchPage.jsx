import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import tmdbService from '../../services/tmdbService';
import config from '../../config/api';

const TVWatchPage = () => {
  const { id } = useParams();
  const [tvShow, setTVShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

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

  const handleSeasonChange = (e) => {
    setSelectedSeason(Number(e.target.value));
    setSelectedEpisode(1); // Reset to first episode when season changes
  };

  const handleEpisodeChange = (e) => {
    setSelectedEpisode(Number(e.target.value));
  };

  // Generate VidSrc embed URL for TV show
  const getEmbedUrl = () => {
    return `${config.vidsrc.baseUrl}${config.vidsrc.tvEndpoint}?tmdb=${id}&season=${selectedSeason}&episode=${selectedEpisode}`;
  };

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

  const { name, seasons } = tvShow;
  const currentSeason = seasons?.find(s => s.season_number === selectedSeason) || {};
  const episodeCount = currentSeason.episode_count || 0;

  return (
    <div className="container px-4 py-8 md:px-6">
      <Link to={`/tv/${id}`} className="inline-flex items-center gap-1 mb-6 text-sm hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to TV Show
      </Link>
      
      <h1 className="text-2xl md:text-3xl font-bold mb-4">{name}</h1>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="w-full md:w-auto">
          <label htmlFor="season" className="block text-sm font-medium mb-1">Season</label>
          <select
            id="season"
            value={selectedSeason}
            onChange={handleSeasonChange}
            className="w-full md:w-auto px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {seasons?.map((season) => (
              <option key={season.id} value={season.season_number}>
                Season {season.season_number}
              </option>
            ))}
          </select>
        </div>
        
        <div className="w-full md:w-auto">
          <label htmlFor="episode" className="block text-sm font-medium mb-1">Episode</label>
          <select
            id="episode"
            value={selectedEpisode}
            onChange={handleEpisodeChange}
            className="w-full md:w-auto px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {Array.from({ length: episodeCount }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                Episode {num}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-black mb-6">
        <iframe
          src={getEmbedUrl()}
          title={`${name} - Season ${selectedSeason} Episode ${selectedEpisode}`}
          frameBorder="0"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Season {selectedSeason}, Episode {selectedEpisode}
        </h2>
        <p className="text-muted-foreground">
          {currentSeason.overview || 'No overview available for this season.'}
        </p>
      </div>
    </div>
  );
};

export default TVWatchPage;

