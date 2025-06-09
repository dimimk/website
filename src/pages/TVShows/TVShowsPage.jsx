import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TVShowList from '../../components/TVShowList/TVShowList';
import SearchBar from '../../components/SearchBar/SearchBar';
import tmdbService from '../../services/tmdbService';

const TVShowsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tvShows, setTVShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await tmdbService.fetchTVGenres();
        setGenres(response.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchTVShows = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let response;
        
        if (searchQuery) {
          response = await tmdbService.searchTVShows(searchQuery, currentPage);
        } else if (selectedGenre !== 'All Genres') {
          const genreId = genres.find(genre => genre.name === selectedGenre)?.id;
          if (genreId) {
            response = await tmdbService.fetchTVShowsByGenre(genreId, currentPage);
          } else {
            response = await tmdbService.fetchPopularTVShows(currentPage);
          }
        } else {
          response = await tmdbService.fetchPopularTVShows(currentPage);
        }
        
        if (currentPage === 1) {
          setTVShows(response.results);
        } else {
          setTVShows(prevTVShows => [...prevTVShows, ...response.results]);
        }
        
        setTotalPages(response.total_pages);
      } catch (error) {
        console.error('Error fetching TV shows:', error);
        setError('Failed to fetch TV shows. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTVShows();
  }, [searchQuery, currentPage, selectedGenre, genres]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setSearchParams({ query });
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handleFilterChange = ({ genre }) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const pageTitle = searchQuery 
    ? `Search Results for "${searchQuery}"`
    : selectedGenre !== 'All Genres'
      ? `${selectedGenre} TV Shows`
      : 'Popular TV Shows';

  return (
    <div>
      <div className="container px-4 py-4 md:px-6 md:py-6">
        <SearchBar 
          onSearch={handleSearch} 
          initialQuery={searchQuery} 
          placeholder="Search TV shows..."
        />
      </div>
      
      <TVShowList 
        tvShows={tvShows}
        title={pageTitle}
        loading={loading}
        error={error}
        onLoadMore={handleLoadMore}
        hasMorePages={currentPage < totalPages}
        filters={{ genres }}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default TVShowsPage;

