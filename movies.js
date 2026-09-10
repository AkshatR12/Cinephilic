/* Cinephilic - Movies Discovery Script (js/movies.js) */
let allCatalogMovies = [];
let currentStatusFilter = 'all';

document.addEventListener('DOMContentLoaded', async () => {
  allCatalogMovies = await MovieService.getAllMovies();
  initUrlParams();
  initFilters();
  initStatusTabs();
  applyFiltersAndRender();
});

function initUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab') || params.get('status');
  if (tab === 'upcoming' || tab === 'coming_soon') {
    currentStatusFilter = 'coming_soon';
  } else if (tab === 'now_showing') {
    currentStatusFilter = 'now_showing';
  }
}

function initStatusTabs() {
  const tabs = document.querySelectorAll('.status-tab-btn');
  tabs.forEach(tab => {
    const status = tab.getAttribute('data-status');
    if (status === currentStatusFilter) {
      tabs.forEach(t => {
        t.classList.remove('active', 'btn-secondary');
        t.classList.add('btn-outline');
      });
      tab.classList.add('active', 'btn-secondary');
      tab.classList.remove('btn-outline');
    }

    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active', 'btn-secondary');
        t.classList.add('btn-outline');
      });
      tab.classList.add('active', 'btn-secondary');
      tab.classList.remove('btn-outline');
      currentStatusFilter = tab.getAttribute('data-status');
      applyFiltersAndRender();
    });
  });
}

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
    // Search text match
    const matchSearch = movie.title.toLowerCase().includes(searchVal) || 
                        movie.overview.toLowerCase().includes(searchVal) ||
                        movie.director.toLowerCase().includes(searchVal);

    // Status match (all / now_showing / coming_soon)
    const matchStatus = (currentStatusFilter === 'all') || (movie.status === currentStatusFilter);

    // Genre match
    const matchGenre = (genreVal === 'all') || movie.genre.some(g => g.toLowerCase() === genreVal.toLowerCase());

    // Language match (case-insensitive, handles EN / English / HI / Hindi)
    let matchLang = true;
    if (langVal !== 'all') {
      const selectedLower = langVal.toLowerCase();
      const movieLangLower = (movie.language || '').toLowerCase();
      matchLang = movieLangLower.includes(selectedLower) || 
                  (selectedLower === 'en' && movieLangLower === 'english') ||
                  (selectedLower === 'english' && movieLangLower === 'en') ||
                  (selectedLower === 'hi' && movieLangLower === 'hindi') ||
                  (selectedLower === 'hindi' && movieLangLower === 'hi');
    }

    return matchSearch && matchStatus && matchGenre && matchLang;
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

  const fallbackImg = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500';

  grid.innerHTML = movies.map(m => {
    const isUpcoming = m.status === 'coming_soon';

    return `
      <div class="movie-card">
        <a href="movie-details.html?id=${m.id}" class="movie-poster-wrap">
          <img src="${m.poster_path}" alt="${m.title}" class="movie-poster" loading="lazy" onerror="this.src='${fallbackImg}'">
          <span class="rating-badge">${isUpcoming ? 'Upcoming' : '★ ' + m.rating}</span>
        </a>
        <div class="movie-card-info">
          <a href="movie-details.html?id=${m.id}"><h3 class="movie-card-title">${m.title}</h3></a>
          <div class="movie-card-meta">
            <span>${m.genre[0]} • ${m.language}</span>
            <span>${isUpcoming ? (m.releaseDate || 'Coming Soon') : '₹' + m.price}</span>
          </div>
          <div style="display: grid; grid-template-columns: ${isUpcoming ? '1fr' : '1fr 1.2fr'}; gap: 8px; margin-top: 12px;">
            <a href="movie-details.html?id=${m.id}" class="btn ${isUpcoming ? 'btn-outline' : 'btn-secondary'}" style="padding: 8px 4px; font-size: 0.82rem; text-align: center;">
              ${isUpcoming ? 'View Info & Trailer' : 'ℹ️ Info'}
            </a>
            ${!isUpcoming ? `
              <a href="theatres.html?movieId=${m.id}" class="btn btn-primary" style="padding: 8px 4px; font-size: 0.82rem; text-align: center;">
                🎟️ Book
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function resetFilters() {
  const searchInput = document.getElementById('search-input');
  const genreFilter = document.getElementById('genre-filter');
  const languageFilter = document.getElementById('language-filter');
  const sortFilter = document.getElementById('sort-filter');

  if (searchInput) searchInput.value = '';
  if (genreFilter) genreFilter.value = 'all';
  if (languageFilter) languageFilter.value = 'all';
  if (sortFilter) sortFilter.value = 'rating-desc';
  currentStatusFilter = 'all';

  const tabs = document.querySelectorAll('.status-tab-btn');
  tabs.forEach((tab, index) => {
    if (index === 0) {
      tab.classList.add('active', 'btn-secondary');
      tab.classList.remove('btn-outline');
    } else {
      tab.classList.remove('active', 'btn-secondary');
      tab.classList.add('btn-outline');
    }
  });

  applyFiltersAndRender();
}

window.resetFilters = resetFilters;
