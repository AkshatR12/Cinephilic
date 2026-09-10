/* Cinephilic - Movie Details Script (js/details.js) */
document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get('id') || params.get('movieId');
  
  const movie = await MovieService.getMovieById(movieId);

  if (movie) {
    renderMovieDetails(movie);
    initTrailerModal(movie.trailer_key);
  }
});

function renderMovieDetails(movie) {
  const hero = document.getElementById('details-hero');
  const layout = document.getElementById('details-layout');
  const castContainer = document.getElementById('cast-grid');
  const fallbackImg = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500';

  if (hero) hero.style.backgroundImage = `url('${movie.backdrop_path}')`;

  const isUpcoming = movie.status === 'coming_soon';

  if (layout) {
    layout.innerHTML = `
      <img src="${movie.poster_path}" alt="${movie.title}" class="details-poster" onerror="this.src='${fallbackImg}'">
      <div class="details-content">
        <p class="details-tagline">"${movie.tagline}"</p>
        <h1 class="details-title">${movie.title}</h1>
        <div class="details-meta-row">
          <span class="badge badge-gold">★ ${movie.rating} / 10</span>
          <span class="badge badge-red">${movie.language}</span>
          <span style="color: var(--text-muted); font-size: 0.92rem;">${movie.runtime} • ${movie.year}</span>
          <span style="color: var(--text-muted); font-size: 0.92rem;">Director: <strong style="color: #fff;">${movie.director}</strong></span>
          <span class="badge" style="background: rgba(255,255,255,0.1);">${movie.format || 'IMAX 4K'}</span>
        </div>
        <p class="details-overview">${movie.overview}</p>
        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
          ${!isUpcoming ? `
            <a href="theatres.html?movieId=${movie.id}" class="btn btn-primary" style="padding: 12px 24px;">🎟️ Book Tickets Now</a>
          ` : `
            <button class="btn btn-primary" style="padding: 12px 24px; cursor: default; background: var(--accent-gold); color: #000;">⏳ ${movie.releaseDate || 'Releasing Soon'}</button>
          `}
          <button id="open-trailer-btn" class="btn btn-secondary" style="padding: 12px 20px;">▶ Watch Trailer</button>
        </div>
      </div>
    `;
  }

  if (castContainer && movie.cast) {
    const defaultAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200';
    castContainer.innerHTML = movie.cast.map(c => `
      <div class="cast-card">
        <img src="${c.photo || defaultAvatar}" alt="${c.name}" class="cast-avatar" onerror="this.src='${defaultAvatar}'">
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
    iframe.src = `https://www.youtube.com/embed/${trailerKey || 'Way9Dexny3w'}?autoplay=1`;
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
