/* Cinephilic - Movies Discovery Script (js/movies.js) */
let allCatalogMovies = [];
let currentStatusFilter = 'all';
let currentCategoryFilter = 'all';

document.addEventListener('DOMContentLoaded', async () => {
  allCatalogMovies = await MovieService.getAllMovies();
  initUrlParams();
  initFilters();
  initCategoryTabs();
  initStatusTabs();
  applyFiltersAndRender();
});

function initUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab') || params.get('status');
  const cat = params.get('category');

  if (tab === 'upcoming' || tab === 'coming_soon') {
    currentStatusFilter = 'coming_soon';
  } else if (tab === 'now_showing') {
    currentStatusFilter = 'now_showing';
  }

  if (cat) {
    currentCategoryFilter = cat.toLowerCase();
  }
}

function initCategoryTabs() {
  const tabs = document.querySelectorAll('.category-tab-btn');
  tabs.forEach(tab => {
    const cat = tab.getAttribute('data-category');
    if (cat === currentCategoryFilter) {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    }

    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategoryFilter = tab.getAttribute('data-category');
      applyFiltersAndRender();
    });
  });
}

function initStatusTabs() {
  const tabs = document.querySelectorAll('.status-tab-btn');
  tabs.forEach(tab => {
    const status = tab.getAttribute('data-status');
    if (status === currentStatusFilter) {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    }

    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
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
                        (movie.director && movie.director.toLowerCase().includes(searchVal));

    // Category match (all / bollywood / hollywood / regional)
    const matchCategory = (currentCategoryFilter === 'all') || (movie.category === currentCategoryFilter);

    // Status match (all / now_showing / coming_soon)
    const matchStatus = (currentStatusFilter === 'all') || (movie.status === currentStatusFilter);

    // Genre match
    const matchGenre = (genreVal === 'all') || movie.genre.some(g => g.toLowerCase() === genreVal.toLowerCase());

    // Language match
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

    return matchSearch && matchCategory && matchStatus && matchGenre && matchLang;
  });

  // Sorting
  if (sortVal === 'rating-desc') {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sortVal === 'title-asc') {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortVal === 'price-asc') {
    result.sort((a, b) => (a.price || 280) - (b.price || 280));
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
    const categoryLabel = (m.category || 'CINEMA').toUpperCase();
    const genresText = m.genre ? m.genre.slice(0, 2).join(' • ') : 'Cinema';

    return `
      <div class="movie-card">
        <a href="movie-details.html?id=${m.id}" class="movie-poster-wrap">
          <img src="${m.poster_path}" alt="${m.title}" class="movie-poster" loading="lazy" onerror="this.src='${fallbackImg}'">
          <div class="poster-gradient-overlay"></div>
          <span class="category-badge-top">${categoryLabel}</span>
          <span class="movie-rating-badge ${isUpcoming ? 'upcoming' : ''}">
            ${isUpcoming ? 'Soon' : '★ ' + m.rating}
          </span>
        </a>
        <div class="movie-card-info">
          <div class="movie-card-genres">${genresText}</div>
          <a href="movie-details.html?id=${m.id}" class="movie-card-title">${m.title}</a>
          <div class="movie-card-meta-row">
            <span>${m.language || 'Hindi'}</span>
            <span class="movie-card-price">${isUpcoming ? (m.releaseDate || 'Coming Soon') : '₹' + (m.price || 280)}</span>
          </div>
          <div class="movie-card-actions">
            <a href="movie-details.html?id=${m.id}" class="btn-card-info">
              Details
            </a>
            ${!isUpcoming ? `
              <a href="theatres.html?movieId=${m.id}" class="btn-card-book">
                Book
              </a>
            ` : `
              <a href="movie-details.html?id=${m.id}" class="btn-card-info">
                Notify
              </a>
            `}
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
  currentCategoryFilter = 'all';

  const catTabs = document.querySelectorAll('.category-tab-btn');
  catTabs.forEach((tab, index) => {
    if (index === 0) tab.classList.add('active');
    else tab.classList.remove('active');
  });

  const statusTabs = document.querySelectorAll('.status-tab-btn');
  statusTabs.forEach((tab, index) => {
    if (index === 0) tab.classList.add('active');
    else tab.classList.remove('active');
  });

  applyFiltersAndRender();
}

window.resetFilters = resetFilters;
