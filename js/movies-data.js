/* Cinephilic - Comprehensive Movie Catalog & Data Service (js/movies-data.js) */

const MOVIE_CATALOG = [
  {
    id: 101,
    title: "Dune: Part Two",
    tagline: "Long live the fighters.",
    genre: ["Sci-Fi", "Adventure", "Action"],
    language: "English",
    rating: 8.8,
    runtime: "2h 46m",
    year: 2024,
    price: 260,
    status: "now_showing",
    format: "IMAX 4K • Dolby Atmos",
    overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future only he can foresee in this visual and philosophical sci-fi masterpiece.",
    poster_path: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
    backdrop_path: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1400&auto=format&fit=crop&q=80",
    director: "Denis Villeneuve",
    trailer_key: "Way9Dexny3w",
    cast: [
      {
        name: "Timothée Chalamet",
        character: "Paul Atreides",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Zendaya",
        character: "Chani",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Rebecca Ferguson",
        character: "Lady Jessica",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Austin Butler",
        character: "Feyd-Rautha",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: 102,
    title: "Deadpool & Wolverine",
    tagline: "Everyone deserves a happy ending.",
    genre: ["Action", "Comedy", "Sci-Fi"],
    language: "English",
    rating: 8.5,
    runtime: "2h 07m",
    year: 2024,
    price: 280,
    status: "now_showing",
    format: "3D • 4DX • Dolby 7.1",
    overview: "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary behind him. But when an existential threat endangers his home timeline, Wade must reluctantly suit up again alongside an even more hesitant and brooding Wolverine in an explosive, hilarious multiverse adventure.",
    poster_path: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80",
    backdrop_path: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1400&auto=format&fit=crop&q=80",
    director: "Shawn Levy",
    trailer_key: "73_1biulkYk",
    cast: [
      {
        name: "Ryan Reynolds",
        character: "Wade Wilson / Deadpool",
        photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Hugh Jackman",
        character: "Logan / Wolverine",
        photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Emma Corrin",
        character: "Cassandra Nova",
        photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Morena Baccarin",
        character: "Vanessa",
        photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: 103,
    title: "Kalki 2898 AD",
    tagline: "The future begins in the past.",
    genre: ["Sci-Fi", "Action", "Drama"],
    language: "Hindi",
    rating: 8.4,
    runtime: "3h 01m",
    year: 2024,
    price: 250,
    status: "now_showing",
    format: "IMAX 3D • Dolby Atmos",
    overview: "Set in a post-apocalyptic world in the year 2898 AD, the dystopian city of Kasi is ruled by the totalitarian Supreme Yaskin. As prophecies foretell the birth of the tenth avatar of Vishnu to end cosmic darkness, an immortal warrior Ashwatthama emerges to protect the unborn child against relentless bounty hunters.",
    poster_path: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80",
    backdrop_path: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1400&auto=format&fit=crop&q=80",
    director: "Nag Ashwin",
    trailer_key: "kQDd1AhGIHk",
    cast: [
      {
        name: "Prabhas",
        character: "Bhairava",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Amitabh Bachchan",
        character: "Ashwatthama",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Deepika Padukone",
        character: "SUM-80 / Sumathi",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Kamal Haasan",
        character: "Supreme Yaskin",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: 104,
    title: "Godzilla x Kong: The New Empire",
    tagline: "Rise together or fall alone.",
    genre: ["Action", "Sci-Fi", "Adventure"],
    language: "English",
    rating: 7.6,
    runtime: "1h 55m",
    year: 2024,
    price: 240,
    status: "now_showing",
    format: "IMAX 3D • 4DX",
    overview: "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden deep within the Hollow Earth. This colossal challenge threatens not only their existence but the very survival of the human species, forcing human allies to delve into the untold ancient history of the Titans.",
    poster_path: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80",
    backdrop_path: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1400&auto=format&fit=crop&q=80",
    director: "Adam Wingard",
    trailer_key: "lV1OOlGwExM",
    cast: [
      {
        name: "Rebecca Hall",
        character: "Dr. Ilene Andrews",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Brian Tyree Henry",
        character: "Bernie Hayes",
        photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Dan Stevens",
        character: "Trapper",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Kaylee Hottle",
        character: "Jia",
        photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: 105,
    title: "Furiosa: A Mad Max Saga",
    tagline: "Out of the madness, she rises.",
    genre: ["Action", "Adventure", "Sci-Fi"],
    language: "English",
    rating: 8.2,
    runtime: "2h 28m",
    year: 2024,
    price: 230,
    status: "now_showing",
    format: "IMAX 2D • Dolby Atmos",
    overview: "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland, they come across the Citadel presided over by Immortan Joe. While the two Tyrants war for dominance, Furiosa must survive many trials to find her way home.",
    poster_path: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    backdrop_path: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1400&auto=format&fit=crop&q=80",
    director: "George Miller",
    trailer_key: "XJMuhwVlca4",
    cast: [
      {
        name: "Anya Taylor-Joy",
        character: "Imperator Furiosa",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Chris Hemsworth",
        character: "Warlord Dementus",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Tom Burke",
        character: "Praetorian Jack",
        photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Lachy Hulme",
        character: "Immortan Joe",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: 106,
    title: "Stree 2: Sarkate Ka Aatank",
    tagline: "Terror returns with a vengeance.",
    genre: ["Comedy", "Horror"],
    language: "Hindi",
    rating: 8.3,
    runtime: "2h 27m",
    year: 2024,
    price: 220,
    status: "now_showing",
    format: "2D • Dolby 7.1",
    overview: "The town of Chanderi is haunted once again, this time by a headless ghost named Sarkata who abducts modern and independent women. Vicky along with his quirky band of loyal friends must reunite with the mysterious woman with supernatural powers to protect their beloved hometown from total destruction.",
    poster_path: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&auto=format&fit=crop&q=80",
    backdrop_path: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1400&auto=format&fit=crop&q=80",
    director: "Amar Kaushik",
    trailer_key: "kv138wN1h4A",
    cast: [
      {
        name: "Rajkummar Rao",
        character: "Vicky",
        photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Shraddha Kapoor",
        character: "The Mystery Woman",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Pankaj Tripathi",
        character: "Rudra",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Aparshakti Khurana",
        character: "Bittu",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: 107,
    title: "Inside Out 2",
    tagline: "Make room for new emotions.",
    genre: ["Animation", "Comedy", "Family"],
    language: "English",
    rating: 8.0,
    runtime: "1h 36m",
    year: 2024,
    price: 210,
    status: "coming_soon",
    releaseDate: "Coming Next Month",
    format: "3D • 2D Standard",
    overview: "Disney and Pixar's Inside Out 2 returns to the mind of newly minted teenager Riley just as headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear, and Disgust aren't sure how to feel when Anxiety, Envy, Ennui, and Embarrassment show up.",
    poster_path: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
    backdrop_path: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1400&auto=format&fit=crop&q=80",
    director: "Kelsey Mann",
    trailer_key: "LEjhY15eCx0",
    cast: [
      {
        name: "Amy Poehler",
        character: "Joy",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Maya Hawke",
        character: "Anxiety",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Phyllis Smith",
        character: "Sadness",
        photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Lewis Black",
        character: "Anger",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: 108,
    title: "Gladiator II",
    tagline: "What we do in life echoes in eternity.",
    genre: ["Action", "Drama", "Adventure"],
    language: "English",
    rating: 8.6,
    runtime: "2h 30m",
    year: 2024,
    price: 270,
    status: "coming_soon",
    releaseDate: "Releasing Diwali 2024",
    format: "IMAX 4K • Dolby Atmos",
    overview: "Years after witnessing the heroic death of Maximus at the hands of his uncle, Lucius must enter the Colosseum after his home is conquered by the tyrannical Emperors who now lead Rome with an iron fist. With rage in his heart and the future of the Empire at stake, Lucius must look to his past to find strength and honor to return glory to Rome.",
    poster_path: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80",
    backdrop_path: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1400&auto=format&fit=crop&q=80",
    director: "Ridley Scott",
    trailer_key: "4rgYUipGJNo",
    cast: [
      {
        name: "Paul Mescal",
        character: "Lucius",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Pedro Pascal",
        character: "Marcus Acacius",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Denzel Washington",
        character: "Macrinus",
        photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Connie Nielsen",
        character: "Lucilla",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: 109,
    title: "Pushpa 2: The Rule",
    tagline: "The rule begins worldwide.",
    genre: ["Action", "Drama", "Thriller"],
    language: "Hindi",
    rating: 8.7,
    runtime: "2h 55m",
    year: 2024,
    price: 260,
    status: "coming_soon",
    releaseDate: "December 6, 2024",
    format: "IMAX 2D • Dolby Atmos",
    overview: "Pushpa Raj has solidified his control over the red sandalwood smuggling syndicate, but his clash with SP Bhanwar Singh Shekhawat escalates into an all-out war of vengeance, politics, and power that spans borders and turns Pushpa into a legendary national figure.",
    poster_path: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80",
    backdrop_path: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1400&auto=format&fit=crop&q=80",
    director: "Sukumar",
    trailer_key: "g3JUbgkWn34",
    cast: [
      {
        name: "Allu Arjun",
        character: "Pushpa Raj",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Rashmika Mandanna",
        character: "Srivalli",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
      },
      {
        name: "Fahadh Faasil",
        character: "SP Bhanwar Singh Shekhawat",
        photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80"
      }
    ]
  }
];

class MovieService {
  static getAllMovies() {
    return Promise.resolve(MOVIE_CATALOG);
  }

  static getPopularMovies() {
    return Promise.resolve(MOVIE_CATALOG);
  }

  static getNowShowing() {
    return Promise.resolve(MOVIE_CATALOG.filter(m => m.status === 'now_showing'));
  }

  static getComingSoon() {
    return Promise.resolve(MOVIE_CATALOG.filter(m => m.status === 'coming_soon'));
  }

  static getMovieById(id) {
    if (!id) return Promise.resolve(MOVIE_CATALOG[0]);
    const numId = parseInt(id, 10);
    const found = MOVIE_CATALOG.find(m => m.id === numId);
    return Promise.resolve(found || MOVIE_CATALOG[0]);
  }
}

// Attach globally
window.MOVIE_CATALOG = MOVIE_CATALOG;
window.MovieService = MovieService;
