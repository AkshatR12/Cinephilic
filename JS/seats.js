/* Cinephilic - Interactive Seat Selection Script (js/seats.js) */
let selectedSeats = [];
let ticketPrice = 220;
let currentMovie = null;
let currentShowTime = "05:15 PM";

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get('movieId') || 550;
  ticketPrice = parseInt(params.get('price')) || 220;
  currentShowTime = params.get('time') || "05:15 PM";

  currentMovie = await TMDBService.getMovieById(movieId);
  renderSeatsHeader(currentMovie, currentShowTime);
  generateSeatingGrid();
  initProceedButton(movieId);
});

function renderSeatsHeader(movie, showTime) {
  const banner = document.getElementById('seats-movie-info');
  if (banner && movie) {
    banner.innerHTML = `
      <h2 style="font-size: 1.3rem; font-weight: 800;">${movie.title}</h2>
      <p style="color: var(--text-muted); font-size: 0.88rem;">Cinephilic IMAX • Today at ${showTime}</p>
    `;
  }
}

function generateSeatingGrid() {
  const container = document.getElementById('seats-container');
  if (!container) return;

  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsPerRow = 10;
  const occupiedSeats = ['A3', 'A4', 'C7', 'C8', 'D2', 'E5', 'E6'];

  container.innerHTML = rows.map(row => {
    let seatsHTML = '';
    for (let i = 1; i <= seatsPerRow; i++) {
      const seatId = `${row}${i}`;
      const isOccupied = occupiedSeats.includes(seatId);
      seatsHTML += `<button class="seat ${isOccupied ? 'occupied' : ''}" data-seat="${seatId}">${i}</button>`;
    }
    return `
      <div class="seat-row">
        <span class="row-label">${row}</span>
        <div class="row-seats">${seatsHTML}</div>
      </div>
    `;
  }).join('');

  // Seat Click Events
  container.querySelectorAll('.seat:not(.occupied)').forEach(seatBtn => {
    seatBtn.addEventListener('click', () => {
      const seatId = seatBtn.getAttribute('data-seat');
      if (selectedSeats.includes(seatId)) {
        selectedSeats = selectedSeats.filter(s => s !== seatId);
        seatBtn.classList.remove('selected');
      } else {
        selectedSeats.push(seatId);
        seatBtn.classList.add('selected');
      }
      updateBookingBar();
    });
  });
}

function updateBookingBar() {
  const countEl = document.getElementById('selected-count');
  const priceEl = document.getElementById('total-price');
  const seatsListEl = document.getElementById('selected-seats-list');
  const btn = document.getElementById('proceed-checkout-btn');

  const total = selectedSeats.length * ticketPrice;

  if (countEl) countEl.textContent = selectedSeats.length;
  if (priceEl) priceEl.textContent = `₹${total}`;
  if (seatsListEl) seatsListEl.textContent = selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None';

  if (btn) {
    btn.disabled = selectedSeats.length === 0;
    btn.style.opacity = selectedSeats.length === 0 ? '0.5' : '1';
  }
}

function initProceedButton(movieId) {
  const btn = document.getElementById('proceed-checkout-btn');
  btn?.addEventListener('click', () => {
    if (selectedSeats.length === 0) return alert('Please select at least one seat.');

    const bookingData = {
      movie: currentMovie,
      showTime: currentShowTime,
      seats: selectedSeats,
      ticketPrice: ticketPrice,
      totalAmount: selectedSeats.length * ticketPrice,
      bookingRef: 'CP' + Math.floor(100000 + Math.random() * 900000)
    };

    localStorage.setItem('cinephilic_current_booking', JSON.stringify(bookingData));
    window.location.href = 'checkout.html';
  });
}
