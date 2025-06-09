import config from '../config/api';

const API_TOKEN = config.tmdb.apiKey;
const BASE_URL = config.tmdb.baseUrl;

/**
 * Common fetch function with authorization header
 * @param {string} endpoint - API endpoint
 * @returns {Promise} - Promise with fetch response
 */
const fetchWithAuth = async (endpoint) => {
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };
  
  return fetch(`${BASE_URL}${endpoint}`, options);
};

/**
 * Fetch popular movies
 * @param {number} page - Page number for pagination
 * @returns {Promise} - Promise with movie data
 */
export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await fetchWithAuth(
      `/movie/popular?language=en-US&page=${page}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch popular movies');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

/**
 * Fetch movie details by ID
 * @param {number} id - Movie ID
 * @returns {Promise} - Promise with movie details
 */
export const fetchMovieDetails = async (id) => {
  try {
    const response = await fetchWithAuth(
      `/movie/${id}?language=en-US&append_to_response=credits,videos`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

/**
 * Search for movies
 * @param {string} query - Search query
 * @param {number} page - Page number for pagination
 * @returns {Promise} - Promise with search results
 */
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetchWithAuth(
      `/search/movie?language=en-US&query=${encodeURIComponent(
        query
      )}&page=${page}&include_adult=false`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search movies');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

/**
 * Fetch movie genres
 * @returns {Promise} - Promise with genre data
 */
export const fetchGenres = async () => {
  try {
    const response = await fetchWithAuth(
      `/genre/movie/list?language=en-US`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch genres');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

/**
 * Fetch movies by genre
 * @param {number} genreId - Genre ID
 * @param {number} page - Page number for pagination
 * @returns {Promise} - Promise with movie data
 */
export const fetchMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await fetchWithAuth(
      `/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movies by genre');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw error;
  }
};

/**
 * Fetch trending movies
 * @param {string} timeWindow - Time window for trending (day or week)
 * @param {number} page - Page number for pagination
 * @returns {Promise} - Promise with trending movie data
 */
export const fetchTrendingMovies = async (timeWindow = 'day', page = 1) => {
  try {
    const response = await fetchWithAuth(
      `/trending/movie/${timeWindow}?page=${page}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch trending movies');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

/**
 * Fetch popular TV shows
 * @param {number} page - Page number for pagination
 * @returns {Promise} - Promise with TV show data
 */
export const fetchPopularTVShows = async (page = 1) => {
  try {
    const response = await fetchWithAuth(
      `/tv/popular?language=en-US&page=${page}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch popular TV shows');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching popular TV shows:', error);
    throw error;
  }
};

/**
 * Fetch TV show details by ID
 * @param {number} id - TV show ID
 * @returns {Promise} - Promise with TV show details
 */
export const fetchTVShowDetails = async (id) => {
  try {
    const response = await fetchWithAuth(
      `/tv/${id}?language=en-US&append_to_response=credits,videos`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch TV show details');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching TV show details:', error);
    throw error;
  }
};

/**
 * Search for TV shows
 * @param {string} query - Search query
 * @param {number} page - Page number for pagination
 * @returns {Promise} - Promise with search results
 */
export const searchTVShows = async (query, page = 1) => {
  try {
    const response = await fetchWithAuth(
      `/search/tv?language=en-US&query=${encodeURIComponent(
        query
      )}&page=${page}&include_adult=false`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search TV shows');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching TV shows:', error);
    throw error;
  }
};

/**
 * Fetch TV show genres
 * @returns {Promise} - Promise with genre data
 */
export const fetchTVGenres = async () => {
  try {
    const response = await fetchWithAuth(
      `/genre/tv/list?language=en-US`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch TV genres');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching TV genres:', error);
    throw error;
  }
};

/**
 * Fetch TV shows by genre
 * @param {number} genreId - Genre ID
 * @param {number} page - Page number for pagination
 * @returns {Promise} - Promise with TV show data
 */
export const fetchTVShowsByGenre = async (genreId, page = 1) => {
  try {
    const response = await fetchWithAuth(
      `/discover/tv?language=en-US&sort_by=popularity.desc&include_adult=false&page=${page}&with_genres=${genreId}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch TV shows by genre');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching TV shows by genre:', error);
    throw error;
  }
};

/**
 * Fetch trending TV shows
 * @param {string} timeWindow - Time window for trending (day or week)
 * @param {number} page - Page number for pagination
 * @returns {Promise} - Promise with trending TV show data
 */
export const fetchTrendingTVShows = async (timeWindow = 'day', page = 1) => {
  try {
    const response = await fetchWithAuth(
      `/trending/tv/${timeWindow}?page=${page}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch trending TV shows');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching trending TV shows:', error);
    throw error;
  }
};

const tmdbService = {
  fetchPopularMovies,
  fetchMovieDetails,
  searchMovies,
  fetchGenres,
  fetchMoviesByGenre,
  fetchTrendingMovies,
  fetchPopularTVShows,
  fetchTVShowDetails,
  searchTVShows,
  fetchTVGenres,
  fetchTVShowsByGenre,
  fetchTrendingTVShows
};

export default tmdbService;

