/* Cinephilic - Movie Details Script (js/details.js) */
document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get('id') || 550;
  const movie = await TMDBService.getMovieById(movieId);

  if (movie) {
    renderMovieDetails(movie);
    initTrailerModal(movie.trailer_key);
  }
});

function renderMovieDetails(movie) {
  const hero = document.getElementById('details-hero');
  const layout = document.getElementById('details-layout');
  const castContainer = document.getElementById('cast-grid');
  const bookBtn = document.getElementById('book-btn');

  if (hero) hero.style.backgroundImage = `url('${movie.backdrop_path}')`;
  if (bookBtn) bookBtn.href = `theatres.html?movieId=${movie.id}`;

  if (layout) {
    layout.innerHTML = `
      <img src="${movie.poster_path}" alt="${movie.title}" class="details-poster">
      <div class="details-content">
        <p class="details-tagline">"${movie.tagline}"</p>
        <h1 class="details-title">${movie.title}</h1>
        <div class="details-meta-row">
          <span class="badge badge-gold">★ ${movie.rating} / 10</span>
          <span class="badge badge-red">${movie.language}</span>
          <span style="color: var(--text-muted);">${movie.runtime} • ${movie.year}</span>
          <span style="color: var(--text-muted);">Director: <strong>${movie.director}</strong></span>
        </div>
        <p class="details-overview">${movie.overview}</p>
        <div style="display: flex; gap: 15px;">
          <a href="theatres.html?movieId=${movie.id}" class="btn btn-primary">Book Tickets Now</a>
          <button id="open-trailer-btn" class="btn btn-secondary">▶ Watch Trailer</button>
        </div>
      </div>
    `;
  }

  if (castContainer && movie.cast) {
    castContainer.innerHTML = movie.cast.map(c => `
      <div class="cast-card">
        <div class="cast-name">${c.name}</div>
        <div class="cast-role">${c.character}</div>
      </div>
    `).join('');
  }
}

function initTrailerModal(trailerKey) {
  const openBtn = document.getElementById('open-trailer-btn');
  const modal = document.getElementById('trailer-modal');
  const closeBtn = document.getElementById('close-modal-btn');
  const iframe = document.getElementById('trailer-iframe');

  if (!modal || !iframe) return;

  openBtn?.addEventListener('click', () => {
    iframe.src = `https://www.youtube.com/embed/${trailerKey || 'qtRKdVHc-cE'}?autoplay=1`;
    modal.classList.add('active');
  });

  closeBtn?.addEventListener('click', () => {
    iframe.src = '';
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      iframe.src = '';
      modal.classList.remove('active');
    }
  });
}
