/* Cinephilic - TMDB API & Fallback Catalog (js/tmdb.js) */
const TMDB_CONFIG = {
  API_KEY: '8265a9442b630b91e5d7d4c2b9a7f3ec',
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500',
  BACKDROP_BASE_URL: 'https://image.tmdb.org/t/p/original'
};

const OFFLINE_MOVIES = [
  {
    id: 550,
    title: "Fight Club",
    tagline: "Mischief. Mayhem. Soap.",
    genre: ["Drama", "Action"],
    language: "English",
    rating: 8.4,
    runtime: "2h 19m",
    year: 1999,
    overview: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    poster_path: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/hZkgoQY85KGWFToRrmvC3hknA0L.jpg",
    director: "David Fincher",
    cast: [{ name: "Brad Pitt", character: "Tyler Durden" }, { name: "Edward Norton", character: "Narrator" }],
    trailer_key: "qtRKdVHc-cE",
    status: "now_showing",
    price: 220
  },
  {
    id: 823464,
    title: "Godzilla x Kong: The New Empire",
    tagline: "Rise together or fall alone.",
    genre: ["Action", "Sci-Fi", "Adventure"],
    language: "English",
    rating: 7.2,
    runtime: "1h 55m",
    year: 2024,
    overview: "Godzilla and Kong unite against a colossal undiscovered threat hidden within our world.",
    poster_path: "https://image.tmdb.org/t/p/w500/z1y5OYyP8SuodERFNj732jG9R88.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/b85bfg8zYVjLzY5g8S22y0t.jpg",
    director: "Adam Wingard",
    cast: [{ name: "Rebecca Hall", character: "Dr. Andrews" }, { name: "Brian Tyree Henry", character: "Bernie" }],
    trailer_key: "lV1OOlGwExM",
    status: "now_showing",
    price: 250
  },
  {
    id: 653346,
    title: "Kingdom of Planet of the Apes",
    tagline: "No one can stop the reign.",
    genre: ["Sci-Fi", "Adventure"],
    language: "English",
    rating: 7.8,
    runtime: "2h 25m",
    year: 2024,
    overview: "A young ape undertakes a harrowing journey that will lead him to question all that he has been taught.",
    poster_path: "https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/fqv8vILB4haWSrmflraWFjrzJxs.jpg",
    director: "Wes Ball",
    cast: [{ name: "Owen Teague", character: "Noa" }, { name: "Freya Allan", character: "Mae" }],
    trailer_key: "XtFI7SNtVpY",
    status: "now_showing",
    price: 200
  },
  {
    id: 786892,
    title: "Furiosa: A Mad Max Saga",
    tagline: "Out of the madness, she rises.",
    genre: ["Action", "Adventure"],
    language: "English",
    rating: 8.2,
    runtime: "2h 28m",
    year: 2024,
    overview: "Young Furiosa is snatched from the Green Place and falls into the hands of a Biker Horde.",
    poster_path: "https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xFiZ8ht.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/wNAleSCppIYpCxzm2SyA1i3N.jpg",
    director: "George Miller",
    cast: [{ name: "Anya Taylor-Joy", character: "Furiosa" }, { name: "Chris Hemsworth", character: "Dementus" }],
    trailer_key: "XJMuhwVlca4",
    status: "now_showing",
    price: 240
  },
  {
    id: 693134,
    title: "Dune: Part Two",
    tagline: "Long live the fighters.",
    genre: ["Sci-Fi", "Adventure"],
    language: "English",
    rating: 8.7,
    runtime: "2h 46m",
    year: 2024,
    overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators.",
    poster_path: "https://image.tmdb.org/t/p/w500/1pdfLPoLStZ1L2f9ovjFGlTs1E5.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s52B3Z.jpg",
    director: "Denis Villeneuve",
    cast: [{ name: "Timothée Chalamet", character: "Paul Atreides" }, { name: "Zendaya", character: "Chani" }],
    trailer_key: "Way9Dexny3w",
    status: "now_showing",
    price: 260
  },
  {
    id: 533535,
    title: "Deadpool & Wolverine",
    tagline: "Everyone deserves a happy ending.",
    genre: ["Action", "Comedy", "Sci-Fi"],
    language: "English",
    rating: 8.5,
    runtime: "2h 07m",
    year: 2024,
    overview: "Wade Wilson reluctantly suits-up again with an even more reluctant Wolverine.",
    poster_path: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/muth4OYamXf41G2evdrLEg8d3om.jpg",
    director: "Shawn Levy",
    cast: [{ name: "Ryan Reynolds", character: "Wade Wilson" }, { name: "Hugh Jackman", character: "Wolverine" }],
    trailer_key: "73_1biulkYk",
    status: "now_showing",
    price: 280
  },
  {
    id: 1022789,
    title: "Inside Out 2",
    tagline: "Make room for new emotions.",
    genre: ["Animation", "Comedy"],
    language: "English",
    rating: 7.9,
    runtime: "1h 36m",
    year: 2024,
    overview: "Teenager Riley's mind headquarters undergoes demolition to make room for new Emotions.",
    poster_path: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQp9CZaW98KHXvoh3.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/p2fRZBxYLEhFJ2C2n87.jpg",
    director: "Kelsey Mann",
    cast: [{ name: "Amy Poehler", character: "Joy" }, { name: "Maya Hawke", character: "Anxiety" }],
    trailer_key: "LEjhY15eCx0",
    status: "coming_soon",
    price: 180
  },
  {
    id: 519182,
    title: "Despicable Me 4",
    tagline: "Things just got a little more despicable.",
    genre: ["Animation", "Comedy"],
    language: "English",
    rating: 7.4,
    runtime: "1h 34m",
    year: 2024,
    overview: "Gru and Lucy welcome Gru Jr., who is intent on tormenting his dad.",
    poster_path: "https://image.tmdb.org/t/p/w500/wWba3TaojhK7NvYvUZM2M2o02hE.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/lg6f5f.jpg",
    director: "Chris Renaud",
    cast: [{ name: "Steve Carell", character: "Gru" }, { name: "Kristen Wiig", character: "Lucy" }],
    trailer_key: "qQlr9-rF32E",
    status: "coming_soon",
    price: 190
  }
];

class TMDBService {
  static async getPopularMovies() {
    try {
      const res = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/popular?api_key=${TMDB_CONFIG.API_KEY}`);
      if (res.ok) {
        const data = await res.json();
        if (data.results?.length > 0) return data.results.map(m => this.formatTMDBMovie(m));
      }
    } catch (e) {
      console.warn("Using offline movie catalog.");
    }
    return OFFLINE_MOVIES;
  }

  static async getMovieById(id) {
    const numId = parseInt(id, 10);
    try {
      const res = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${numId}?api_key=${TMDB_CONFIG.API_KEY}&append_to_response=credits,videos`);
      if (res.ok) {
        const data = await res.json();
        return this.formatTMDBMovie(data);
      }
    } catch (e) {
      console.warn("Fetching offline movie ID:", id);
    }
    return OFFLINE_MOVIES.find(m => m.id === numId) || OFFLINE_MOVIES[0];
  }

  static formatTMDBMovie(m) {
    const poster = m.poster_path ? (m.poster_path.startsWith('http') ? m.poster_path : `${TMDB_CONFIG.IMAGE_BASE_URL}${m.poster_path}`) : 'https://via.placeholder.com/500x750';
    const backdrop = m.backdrop_path ? (m.backdrop_path.startsWith('http') ? m.backdrop_path : `${TMDB_CONFIG.BACKDROP_BASE_URL}${m.backdrop_path}`) : 'https://via.placeholder.com/1200x800';

    return {
      id: m.id,
      title: m.title || m.original_title || "Untitled",
      tagline: m.tagline || "Experience cinema like never before.",
      genre: m.genres ? m.genres.map(g => g.name) : ["Action", "Drama"],
      language: (m.original_language || "en").toUpperCase(),
      rating: m.vote_average ? parseFloat(m.vote_average.toFixed(1)) : 8.0,
      runtime: m.runtime ? `${Math.floor(m.runtime / 60)}h ${m.runtime % 60}m` : "2h 15m",
      year: m.release_date ? new Date(m.release_date).getFullYear() : 2024,
      overview: m.overview || "No description available.",
      poster_path: poster,
      backdrop_path: backdrop,
      director: m.credits?.crew?.find(c => c.job === 'Director')?.name || "Director",
      cast: m.credits?.cast?.slice(0, 4).map(c => ({ name: c.name, character: c.character })) || OFFLINE_MOVIES[0].cast,
      trailer_key: m.videos?.results?.find(v => v.type === 'Trailer')?.key || "qtRKdVHc-cE",
      status: m.status || "now_showing",
      price: 220
    };
  }
}

window.TMDBService = TMDBService;
window.OFFLINE_MOVIES = OFFLINE_MOVIES;
