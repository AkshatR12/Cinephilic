# Member 1: Prince
**Role**: Movie Catalog Architecture, Data Layer & Movie Discovery

---

## Assigned Responsibilities & Deliverables

1. **Movie Catalog & Data Service (`movies-data.js`)**:
   - Replaced fragile external TMDB API calls with a clean, high-performance, asynchronous `MovieService` API (`getAllMovies()`, `getNowShowing()`, `getComingSoon()`, `getMovieById()`).
   - Integrated full metadata for 9+ blockbuster films: genres, language tags, ratings, runtimes, format specifications, YouTube trailer keys, and high-resolution poster & backdrop image URLs.
   - Built comprehensive starring cast data with actor portrait URLs, character names, and fallback avatars.
   - Authored expanded, captivating movie descriptions for every film in the catalog.

2. **Movie Discovery & Catalog Page (`movies.html` & `movies.js`)**:
   - Implemented real-time multi-dimensional search & filtering (by text keyword, genre, and language).
   - Fixed the language filter to accurately match English, Hindi, and regional cinema without mismatches.
   - Added interactive status tabs: *All Movies*, *Now Showing*, and *Coming Soon*.
   - Added sorting functionality (by rating descending, title ascending, and ticket price ascending).

3. **Homepage Integration (`index.html` & `home.js`)**:
   - Built the dynamic Hero Section with background backdrop imagery and quick action buttons.
   - Created the Now Showing and Coming Soon movie grids with dual actions (*Info & Cast* and *Book Seats*).
   - Routed the "Explore upcoming →" link to automatically filter for upcoming releases (`movies.html?tab=upcoming`).
   - Added quick genre pill filter buttons for instant movie filtering.

---

## Files in this Module
- `movies-data.js` – Core movie data catalog and async `MovieService`
- `home.js` – Homepage dynamic rendering logic
- `movies.js` – Catalog filtering, sorting, and status tab logic
- `index.html` – Homepage structure
- `movies.html` – Discover movies catalog page
