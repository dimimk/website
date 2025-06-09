// API configuration
const config = {
  // TMDB API configuration
  tmdb: {
    baseUrl: 'https://api.themoviedb.org/3',
    apiKey: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjdkZDQ4OWMyMmE2ZTY4NWYxMWM0NmZiMGFkZDk4NSIsIm5iZiI6MTc0OTMxMzE1Ny4wNjQ5OTk4LCJzdWIiOiI2ODQ0NjY4NTI0MzVjNWNiOWQzMDExMjQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.YJZudrOgflDpsFj2Egk5ADOSb3liL0KsP4Y3bx9iiok', // Replace with actual API key
    imageBaseUrl: 'https://image.tmdb.org/t/p/',
    posterSize: 'w500',
    backdropSize: 'original',
  },
  
  // VidSrc API configuration
  vidsrc: {
    baseUrl: 'https://vidsrc.xyz/embed',
    movieEndpoint: '/movie',
    tvEndpoint: '/tv',
  }
};

export default config;

