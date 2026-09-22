# 👤 Member 2: Movie Discovery & Catalog Specialist

## 🎯 Role Overview
You are responsible for the entry point of the application: the Homepage, the Discover Movies catalog, filtering and search mechanics, the rich Movie Details showcase, trailer popups, and the Help & Info center.

---

## 📂 Assigned Files & Directory
```
Member_2_Movie_Catalog_Discovery/
├── index.html            # Homepage (Hero carousel, Now Showing / Coming Soon)
├── movies.html           # Full Discover Movies catalog with filter sidebar
├── movie-details.html    # Detailed movie overview, cast cards & trailer modal
├── info.html             # Help Center, FAQ accordion, format guide
├── attributes/           # Movie posters, backdrops & actor avatars
├── css/
│   ├── style.css         # Global design tokens, navbar, footer & typography
│   ├── home.css          # Homepage hero slider & trending section styles
│   ├── movies.css        # Search & multi-filter grid layout
│   ├── details.css       # Cast cards, backdrop header & trailer modal styles
│   └── ai-assistant.css  # AI assistant widget styles
└── js/
    ├── movies-data.js    # Central movie catalog data structure & MovieService
    ├── home.js           # Hero slider & homepage render logic
    ├── movies.js         # Search bar, genre filter, language filter & sort logic
    ├── details.js        # Movie details rendering, cast lists & YouTube modal
    └── ai-assistant.js   # Interactive AI movie recommender widget
```

---

## 📋 Detailed Responsibilities & Tasks

### 1. Homepage & Hero Section (`index.html`, `js/home.js`, `css/home.css`)
- Dynamic auto-playing hero banner highlighting trending releases.
- "Now Showing" and "Coming Soon" quick carousels with smooth scroll transitions.

### 2. Search & Multi-Criteria Filtering (`movies.html`, `js/movies.js`, `css/movies.css`)
- Keyword search by title, actor, or genre.
- Filter chips: Genre (Action, Sci-Fi, Drama, Horror, Romance), Language (Hindi, English, etc.), Status.
- Sort dropdown: Highest Rated, Release Date, Price.

### 3. Movie Detail Showcase (`movie-details.html`, `js/details.js`, `css/details.css`)
- Dynamic query parameter reading (`?id=...`) to load specific movie details.
- High-res banner backdrop with format badges (IMAX, 4DX, Dolby Atmos).
- Starring cast carousel with actor photos, names, and character roles.
- Official YouTube trailer modal with auto-play and close triggers.
- "Book Tickets" CTA routing users to `theatres.html?id=...`.

### 4. Help Center & FAQs (`info.html`)
- Interactive FAQ accordions and cinema format guides.
