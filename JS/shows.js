/* Cinephilic - Showtimes Selection Script (js/shows.js) */
const SHOWTIMES = [
  { id: 'st-1', time: "10:30 AM", type: "2D", price: 200, status: "available" },
  { id: 'st-2', time: "01:45 PM", type: "IMAX 3D", price: 280, status: "filling_fast" },
  { id: 'st-3', time: "05:15 PM", type: "Dolby Atmos", price: 240, status: "available" },
  { id: 'st-4', time: "08:30 PM", type: "IMAX 3D", price: 290, status: "available" },
  { id: 'st-5', time: "11:00 PM", type: "2D", price: 180, status: "available" }
];

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get('movieId') || 550;
  const theatreId = params.get('theatreId') || 'th-1';

  const movie = await TMDBService.getMovieById(movieId);
  renderShowHeader(movie, theatreId);
  initDateTabs(movieId, theatreId);
  renderShowtimes(SHOWTIMES, movieId, theatreId);
});

function renderShowHeader(movie, theatreId) {
  const header = document.getElementById('show-header');
  if (header && movie) {
    header.innerHTML = `
      <div style="background: var(--bg-card); padding: 20px; border-radius: var(--radius); border: 1px solid var(--border-color); margin-top: 25px; margin-bottom: 25px;">
        <span class="badge badge-red" style="margin-bottom: 6px;">Step 2: Select Date & Show Time</span>
        <h2 style="font-size: 1.4rem;">${movie.title}</h2>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 4px;">Cinema: <strong>Cinephilic IMAX Plaza</strong></p>
      </div>
    `;
  }
}

function initDateTabs(movieId, theatreId) {
  const dateContainer = document.getElementById('date-tabs');
  if (!dateContainer) return;

  const dates = [
    { label: "Today", date: "Aug 21" },
    { label: "Tomorrow", date: "Aug 22" },
    { label: "Fri", date: "Aug 23" },
    { label: "Sat", date: "Aug 24" }
  ];

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
      <div>${s.time}</div>
      <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 400;">${s.type} • ₹${s.price}</div>
    </a>
  `).join('');
}
