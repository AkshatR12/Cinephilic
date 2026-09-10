/* Cinephilic - Homepage Script (js/home.js) */
document.addEventListener('DOMContentLoaded', async () => {
  const movies = await MovieService.getAllMovies();
  if (movies.length > 0) {
    renderHero(movies[0]);
    renderMovieGrids(movies);
    initGenreFilters(movies);
  }
});

// Render Hero Section
function renderHero(movie) {
  const heroSection = document.getElementById('hero-section');
  const heroContent = document.getElementById('hero-content');
  if (!heroSection || !heroContent || !movie) return;

  heroSection.style.backgroundImage = `url('${movie.backdrop_path}')`;
  heroContent.innerHTML = `
    <div style="display: flex; gap: 8px; margin-bottom: 12px; align-items: center; flex-wrap: wrap;">
      <span class="badge badge-gold">⭐ Featured Blockbuster</span>
      <span class="badge badge-red">${movie.language}</span>
      <span style="font-size: 0.85rem; color: #fff;">★ ${movie.rating} / 10</span>
    </div>
    <h1 class="hero-title">${movie.title}</h1>
    <p class="hero-desc">${movie.overview}</p>
    <div class="hero-actions">
      <a href="theatres.html?movieId=${movie.id}" class="btn btn-primary">Book Tickets</a>
      <a href="movie-details.html?id=${movie.id}" class="btn btn-secondary">Movie Info & Cast</a>
    </div>
  `;
}

// Render Movie Grids
function renderMovieGrids(movies) {
  const nowShowingGrid = document.getElementById('now-showing-grid');
  const comingSoonGrid = document.getElementById('coming-soon-grid');

  const nowShowing = movies.filter(m => m.status === 'now_showing');
  const comingSoon = movies.filter(m => m.status === 'coming_soon');

  if (nowShowingGrid) {
    nowShowingGrid.innerHTML = nowShowing.map(m => createMovieCardHTML(m, false)).join('');
  }

  if (comingSoonGrid) {
    comingSoonGrid.innerHTML = comingSoon.map(m => createMovieCardHTML(m, true)).join('');
  }
}

// Helper to construct Movie Card HTML
function createMovieCardHTML(m, isUpcoming = false) {
  const fallbackImg = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500';

  if (isUpcoming) {
    return `
      <div class="movie-card">
        <a href="movie-details.html?id=${m.id}" class="movie-poster-wrap">
          <img src="${m.poster_path}" alt="${m.title}" class="movie-poster" loading="lazy" onerror="this.src='${fallbackImg}'">
          <span class="rating-badge" style="background: rgba(255, 180, 0, 0.9); color: #000; font-weight: 800;">Upcoming</span>
        </a>
        <div class="movie-card-info">
          <a href="movie-details.html?id=${m.id}"><h3 class="movie-card-title">${m.title}</h3></a>
          <div class="movie-card-meta">
            <span>${m.genre[0] || 'Cinema'} • ${m.language}</span>
            <span style="color: var(--accent-gold); font-size: 0.8rem;">${m.releaseDate || 'Coming Soon'}</span>
          </div>
          <div style="display: flex; gap: 8px; margin-top: 12px;">
            <a href="movie-details.html?id=${m.id}" class="btn btn-outline" style="width: 100%; padding: 8px; font-size: 0.85rem;">View Info & Trailer</a>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="movie-card">
      <a href="movie-details.html?id=${m.id}" class="movie-poster-wrap">
        <img src="${m.poster_path}" alt="${m.title}" class="movie-poster" loading="lazy" onerror="this.src='${fallbackImg}'">
        <span class="rating-badge">★ ${m.rating}</span>
      </a>
      <div class="movie-card-info">
        <a href="movie-details.html?id=${m.id}"><h3 class="movie-card-title">${m.title}</h3></a>
        <div class="movie-card-meta">
          <span>${m.genre[0] || 'Drama'} • ${m.language}</span>
          <span>${m.runtime || '2h 15m'}</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 12px;">
          <a href="movie-details.html?id=${m.id}" class="btn btn-secondary" style="padding: 8px 4px; font-size: 0.82rem;">ℹ️ Info & Cast</a>
          <a href="theatres.html?movieId=${m.id}" class="btn btn-primary" style="padding: 8px 4px; font-size: 0.82rem;">🎟️ Book Seats</a>
        </div>
      </div>
    </div>
  `;
}

// Quick Genre Filter Pills
function initGenreFilters(allMovies) {
  const pills = document.querySelectorAll('.genre-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const selectedGenre = pill.getAttribute('data-genre');
      const filtered = (selectedGenre === 'All') 
        ? allMovies 
        : allMovies.filter(m => m.genre.some(g => g.toLowerCase().includes(selectedGenre.toLowerCase())));

      renderMovieGrids(filtered);
    });
  });
}
