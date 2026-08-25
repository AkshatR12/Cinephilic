/* Cinephilic - Homepage Script (js/home.js) */
document.addEventListener('DOMContentLoaded', async () => {
  const movies = await TMDBService.getPopularMovies();
  renderHero(movies[0]);
  renderMovieGrids(movies);
  initGenreFilters(movies);
});

// Render Hero Section
function renderHero(movie) {
  const heroSection = document.getElementById('hero-section');
  const heroContent = document.getElementById('hero-content');
  if (!heroSection || !heroContent || !movie) return;

  heroSection.style.backgroundImage = `url('${movie.backdrop_path}')`;
  heroContent.innerHTML = `
    <span class="badge badge-gold">⭐ Featured Release</span>
    <h1 class="hero-title">${movie.title}</h1>
    <p class="hero-desc">${movie.overview}</p>
    <div class="hero-actions">
      <a href="movie-details.html?id=${movie.id}" class="btn btn-primary">Book Tickets</a>
      <a href="movie-details.html?id=${movie.id}" class="btn btn-secondary">View Details</a>
    </div>
  `;
}

// Render Movie Grids
function renderMovieGrids(movies) {
  const nowShowingGrid = document.getElementById('now-showing-grid');
  const comingSoonGrid = document.getElementById('coming-soon-grid');

  const nowShowing = movies.filter(m => m.status === 'now_showing' || !m.status);
  const comingSoon = movies.filter(m => m.status === 'coming_soon');

  if (nowShowingGrid) {
    nowShowingGrid.innerHTML = nowShowing.map(m => createMovieCardHTML(m)).join('');
  }

  if (comingSoonGrid) {
    comingSoonGrid.innerHTML = (comingSoon.length > 0 ? comingSoon : movies.slice(4)).map(m => createMovieCardHTML(m, true)).join('');
  }
}

// Helper to construct Movie Card HTML
function createMovieCardHTML(m, isUpcoming = false) {
  return `
    <div class="movie-card">
      <div class="movie-poster-wrap">
        <img src="${m.poster_path}" alt="${m.title}" class="movie-poster" loading="lazy">
        <span class="rating-badge">★ ${m.rating}</span>
      </div>
      <div class="movie-card-info">
        <h3 class="movie-card-title">${m.title}</h3>
        <div class="movie-card-meta">
          <span>${m.genre[0] || 'Drama'}</span>
          <span>${m.runtime || '2h 15m'}</span>
        </div>
        <a href="${isUpcoming ? 'movie-details.html?id=' + m.id : 'theatres.html?movieId=' + m.id}" class="btn ${isUpcoming ? 'btn-outline' : 'btn-primary'} movie-card-btn">
          ${isUpcoming ? 'View Info' : 'Book Seats'}
        </a>
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
