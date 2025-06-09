# StreamVibe - Movie & TV Show Streaming Website

A modern, responsive streaming website built with React that integrates with TMDB API for movie/TV show data and VidSrc API for streaming content.

![StreamVibe Preview](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=StreamVibe+Movie+Streaming+Website)

## 🚀 Features

- **Browse Content**: Discover popular and trending movies & TV shows
- **Search Functionality**: Search across movies and TV shows with real-time results
- **Detailed Information**: View comprehensive details, cast, crew, and ratings
- **Streaming Integration**: Watch content directly through VidSrc API
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between dark and light modes
- **Genre Filtering**: Filter content by genres
- **Season/Episode Selection**: Navigate TV show seasons and episodes

## 🛠️ Technologies Used

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Routing**: React Router DOM
- **APIs**: TMDB API (movie data), VidSrc API (streaming)
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm
- TMDB API key (free registration at [themoviedb.org](https://www.themoviedb.org/))

## 🔧 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/streamvibe-website.git
   cd streamvibe-website
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. **Start the development server**:
   ```bash
   pnpm run dev
   # or
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:5173`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign up/login
   - Click "New Project" and import your GitHub repository
   - Add environment variable: `VITE_TMDB_API_KEY`
   - Deploy!

### Build for Production

```bash
pnpm run build
# or
npm run build
```

The built files will be in the `dist` directory.

## 🔑 API Configuration

### TMDB API Setup

1. Create an account at [themoviedb.org](https://www.themoviedb.org/)
2. Go to Settings → API
3. Request an API key (choose "Developer" option)
4. Add your API key to the environment variables

### VidSrc API

The VidSrc API is used for streaming content and doesn't require authentication. The integration is already configured in the project.

## 📁 Project Structure

```
streamvibe-website/
├── public/
│   └── placeholder-poster.jpg
├── src/
│   ├── components/
│   │   ├── MovieCard/
│   │   ├── TVShowCard/
│   │   ├── Navbar/
│   │   └── ui/
│   ├── pages/
│   │   ├── Home/
│   │   ├── Movies/
│   │   ├── TVShows/
│   │   ├── Search/
│   │   └── Watch/
│   ├── services/
│   │   └── tmdbService.js
│   ├── config/
│   │   └── api.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Usage

### Browsing Content
- **Homepage**: View trending movies and popular content
- **Movies Page**: Browse all movies with filtering options
- **TV Shows Page**: Explore TV shows by popularity and genre

### Searching
- Use the search bar in the navigation to find specific content
- Results are organized by movies and TV shows
- Filter results using the tab interface

### Watching Content
- Click "Watch Now" on any movie or TV show
- For TV shows, select season and episode
- Content streams directly in the browser

## 🔧 Configuration

### API Endpoints

The application uses these API endpoints:

- **TMDB Base URL**: `https://api.themoviedb.org/3`
- **VidSrc Base URL**: `https://vidsrc.xyz/embed`

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_TMDB_API_KEY` | Your TMDB API key | Yes |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is for demonstration purposes only and not intended for commercial use.

## ⚠️ Disclaimer

This project is created for educational purposes. Please ensure you comply with the terms of service of the APIs used (TMDB, VidSrc) and respect copyright laws in your jurisdiction.

## 🙏 Acknowledgements

- [TMDB](https://www.themoviedb.org/) for providing the movie database API
- [VidSrc](https://vidsrc.me/) for streaming API
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Made with ❤️ for movie and TV show enthusiasts**

