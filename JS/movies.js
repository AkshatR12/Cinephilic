/* Cinephilic - Movies Discovery Script (js/movies.js) */
let allCatalogMovies = [];

document.addEventListener('DOMContentLoaded', async () => {
  allCatalogMovies = await TMDBService.getPopularMovies();
  initFilters();
  applyFiltersAndRender();
});

function initFilters() {
  const searchInput = document.getElementById('search-input');
  const genreFilter = document.getElementById('genre-filter');
  const languageFilter = document.getElementById('language-filter');
  const sortFilter = document.getElementById('sort-filter');

  [searchInput, genreFilter, languageFilter, sortFilter].forEach(element => {
    element?.addEventListener('input', applyFiltersAndRender);
    element?.addEventListener('change', applyFiltersAndRender);
  });
}

function applyFiltersAndRender() {
  const searchVal = document.getElementById('search-input')?.value.toLowerCase().trim() || '';
  const genreVal = document.getElementById('genre-filter')?.value || 'all';
  const langVal = document.getElementById('language-filter')?.value || 'all';
  const sortVal = document.getElementById('sort-filter')?.value || 'rating-desc';

  let result = allCatalogMovies.filter(movie => {
    const matchSearch = movie.title.toLowerCase().includes(searchVal) || movie.overview.toLowerCase().includes(searchVal);
    const matchGenre = (genreVal === 'all') || movie.genre.some(g => g.toLowerCase() === genreVal.toLowerCase());
    const matchLang = (langVal === 'all') || movie.language.toLowerCase() === langVal.toLowerCase();
    return matchSearch && matchGenre && matchLang;
  });

  // Sorting
  if (sortVal === 'rating-desc') {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sortVal === 'title-asc') {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortVal === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  }

  renderMoviesCatalog(result);
}

function renderMoviesCatalog(movies) {
  const grid = document.getElementById('movies-catalog-grid');
  const emptyState = document.getElementById('empty-state');
  if (!grid) return;

  if (movies.length === 0) {
    grid.style.display = 'none';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  grid.style.display = 'grid';

  grid.innerHTML = movies.map(m => `
    <div class="movie-card">
      <div class="movie-poster-wrap">
        <img src="${m.poster_path}" alt="${m.title}" class="movie-poster" loading="lazy">
        <span class="rating-badge">★ ${m.rating}</span>
      </div>
      <div class="movie-card-info">
        <h3 class="movie-card-title">${m.title}</h3>
        <div class="movie-card-meta">
          <span>${m.genre[0]} • ${m.language}</span>
          <span>₹${m.price}</span>
        </div>
        <a href="theatres.html?movieId=${m.id}" class="btn btn-primary movie-card-btn">Book Tickets</a>
      </div>
    </div>
  `).join('');
}
