/* Cinephilic - Theatre Selection Script (js/theatres.js) */
const THEATRES = [
  { id: 'th-1', name: "Cinephilic IMAX 4K - Grand Plaza", location: "Downtown Mall, Sector 18", format: "IMAX 3D • Dolby Atmos", distance: "2.4 km" },
  { id: 'th-2', name: "Cinephilic Luxe Multiplex", location: "Central Heights, Avenue 5", format: "4DX • Dolby 7.1", distance: "4.1 km" },
  { id: 'th-3', name: "Cinephilic Royal Cinema", location: "Heritage Square, Main Street", format: "2D • Standard", distance: "5.8 km" },
  { id: 'th-4', name: "Cinephilic Cineplex PVR", location: "Metropolis Galleria", format: "IMAX 2D • ScreenX", distance: "7.2 km" }
];

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get('movieId') || params.get('id');
  
  const movie = await MovieService.getMovieById(movieId);

  if (movie) {
    renderMovieBanner(movie);
    renderTheatres(THEATRES, movie.id);
  }
});

function renderMovieBanner(movie) {
  const banner = document.getElementById('selected-movie-banner');
  const fallbackImg = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500';

  if (banner && movie) {
    banner.innerHTML = `
      <div style="display: flex; align-items: center; gap: 20px; background: var(--bg-card); padding: 20px; border-radius: var(--radius); border: 1px solid var(--border-color); margin-top: 25px; margin-bottom: 30px; flex-wrap: wrap;">
        <img src="${movie.poster_path}" alt="${movie.title}" style="width: 70px; border-radius: 8px; aspect-ratio: 2/3; object-fit: cover;" onerror="this.src='${fallbackImg}'">
        <div style="flex: 1;">
          <span class="badge badge-red" style="margin-bottom: 6px;">Step 1: Select Cinema</span>
          <h2 style="font-size: 1.5rem; font-weight: 800; margin: 2px 0;">${movie.title}</h2>
          <p style="color: var(--text-muted); font-size: 0.88rem;">${movie.genre.join(', ')} • ${movie.language} • ${movie.runtime}</p>
        </div>
        <div>
          <a href="movies.html" class="btn btn-outline" style="font-size: 0.82rem; padding: 6px 12px;">Change Movie</a>
        </div>
      </div>
    `;
  }
}

function renderTheatres(theatres, movieId) {
  const list = document.getElementById('theatres-list');
  if (!list) return;

  list.innerHTML = theatres.map(t => `
    <div class="theatre-card">
      <div>
        <div class="theatre-name">${t.name}</div>
        <div class="theatre-info">
          <span>📍 ${t.location} (${t.distance})</span>
          <span class="facility-tag">${t.format}</span>
        </div>
      </div>
      <a href="shows.html?movieId=${movieId}&theatreId=${t.id}" class="btn btn-primary">Select Showtimes →</a>
    </div>
  `).join('');
}
