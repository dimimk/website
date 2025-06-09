import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../config/api';

const VideoPlayer = ({ movieId, tmdbId, imdbId }) => {
  const [selectedSource, setSelectedSource] = useState('vidsrc');
  const [loading, setLoading] = useState(true);
  
  const sources = [
    { id: 'vidsrc', name: 'VidSrc', priority: 1 },
    { id: 'vidsrc_pro', name: 'VidSrc Pro', priority: 2 },
    { id: 'warezcdn', name: 'WarezCDN', priority: 3 },
    { id: 'moviee', name: 'Moviee', priority: 4 },
    { id: 'embedflix', name: 'EmbedFlix', priority: 5 },
    { id: 'movieapi', name: 'MovieAPI', priority: 6 },
  ];
  
  // Generate embed URL based on selected source and movie ID
  const getEmbedUrl = () => {
    // For now, we'll just use the VidSrc API with TMDB ID
    // In a real implementation, you would handle different sources differently
    return `${config.vidsrc.baseUrl}${config.vidsrc.movieEndpoint}?tmdb=${tmdbId || movieId}`;
  };
  
  const handleSourceChange = (sourceId) => {
    setSelectedSource(sourceId);
    setLoading(true);
  };
  
  const handleIframeLoad = () => {
    setLoading(false);
  };
  
  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      <div className="bg-card rounded-lg overflow-hidden shadow-lg">
        <div className="p-4 md:p-6">
          <h2 className="text-xl font-bold mb-4">Choose a video source to start watching.</h2>
          <p className="text-muted-foreground mb-4">Sources are ordered by reliability.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
            {sources.map((source) => (
              <button
                key={source.id}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-colors ${
                  selectedSource === source.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card hover:bg-muted border-border'
                }`}
                onClick={() => handleSourceChange(source.id)}
              >
                <span className="text-sm font-medium">{source.name}</span>
                <div className="mt-1 text-xs opacity-70">
                  Priority #{source.priority}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="relative aspect-video w-full bg-black">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}
          
          <iframe
            src={getEmbedUrl()}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
            onLoad={handleIframeLoad}
            title="Movie Player"
          ></iframe>
        </div>
        
        <div className="p-4 md:p-6 bg-muted/50">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-sm">
              {selectedSource === 'vidsrc' ? 'VidSrc' : sources.find(s => s.id === selectedSource)?.name}
            </span>
            <span className="text-xs text-muted-foreground">
              TV Shows: {selectedSource === 'vidsrc' ? 'Yes' : 'Yes'}
            </span>
            <span className="text-xs text-muted-foreground">
              TMDB: {selectedSource === 'vidsrc' ? 'Yes' : 'Yes'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;

