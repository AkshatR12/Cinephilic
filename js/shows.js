/* Cinephilic - Showtimes Selection Script (js/shows.js) */
const SHOWTIMES = [
  { id: 'st-1', time: "10:30 AM", type: "2D Standard", price: 200, status: "available" },
  { id: 'st-2', time: "01:45 PM", type: "IMAX 3D", price: 280, status: "filling_fast" },
  { id: 'st-3', time: "05:15 PM", type: "Dolby Atmos", price: 250, status: "available" },
  { id: 'st-4', time: "08:30 PM", type: "IMAX 3D", price: 290, status: "available" },
  { id: 'st-5', time: "11:00 PM", type: "4DX Experience", price: 260, status: "available" }
];

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get('movieId') || params.get('id');
  const theatreId = params.get('theatreId') || 'th-1';

  const movie = await MovieService.getMovieById(movieId);
  if (movie) {
    renderShowHeader(movie, theatreId);
    initDateTabs(movie.id, theatreId);
    renderShowtimes(SHOWTIMES, movie.id, theatreId);
  }
});

function renderShowHeader(movie, theatreId) {
  const header = document.getElementById('show-header');
  const fallbackImg = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500';

  if (header && movie) {
    header.innerHTML = `
      <div style="background: var(--bg-card); padding: 20px; border-radius: var(--radius); border: 1px solid var(--border-color); margin-top: 25px; margin-bottom: 25px; display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
        <img src="${movie.poster_path}" alt="${movie.title}" style="width: 60px; border-radius: 6px; aspect-ratio: 2/3; object-fit: cover;" onerror="this.src='${fallbackImg}'">
        <div style="flex: 1;">
          <span class="badge badge-red" style="margin-bottom: 6px;">Step 2: Select Date & Show Time</span>
          <h2 style="font-size: 1.4rem; font-weight: 800; margin: 2px 0;">${movie.title}</h2>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Cinema: <strong style="color: #fff;">Cinephilic IMAX Plaza</strong> • ${movie.language}</p>
        </div>
      </div>
    `;
  }
}

function initDateTabs(movieId, theatreId) {
  const dateContainer = document.getElementById('date-tabs');
  if (!dateContainer) return;

  const today = new Date();
  const options = { month: 'short', day: 'numeric' };
  const weekdayOptions = { weekday: 'short' };

  const dates = [];
  for (let i = 0; i < 4; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push({
      label: i === 0 ? "Today" : (i === 1 ? "Tomorrow" : d.toLocaleDateString('en-US', weekdayOptions)),
      date: d.toLocaleDateString('en-US', options)
    });
  }

  dateContainer.innerHTML = dates.map((d, index) => `
    <button class="date-btn ${index === 0 ? 'active' : ''}" data-date="${d.date}">
      <div style="font-size: 0.8rem; text-transform: uppercase;">${d.label}</div>
      <div style="font-size: 1.1rem; font-weight: 700;">${d.date}</div>
    </button>
  `).join('');

  const btns = dateContainer.querySelectorAll('.date-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function renderShowtimes(slots, movieId, theatreId) {
  const grid = document.getElementById('showtimes-grid');
  if (!grid) return;

  grid.innerHTML = slots.map(s => `
    <a href="seats.html?movieId=${movieId}&theatreId=${theatreId}&showId=${s.id}&time=${encodeURIComponent(s.time)}&price=${s.price}" class="time-slot">
      <div style="font-size: 1.1rem; font-weight: 700;">${s.time}</div>
      <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 500; margin-top: 4px;">${s.type} • ₹${s.price}</div>
    </a>
  `).join('');
}
