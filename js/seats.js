/* Cinephilic - BookMyShow Style Auditorium Seating Script (js/seats.js) */
let selectedSeats = [];
let currentMovie = null;
let currentShowTime = "06:45 PM";
let currentTheatreName = "Cinephilic IMAX 4K - Grand Plaza";

// Realistic 250-seat auditorium occupied seats pattern
const OCCUPIED_SEATS = [
  'A3', 'A4', 'A11', 'A12', 'B8', 'B9', 'B10',
  'C5', 'C6', 'C7', 'C14', 'C15', 'C16',
  'D2', 'D3', 'D10', 'D11', 'D12', 'D19', 'D20',
  'E8', 'E9', 'E14', 'E15', 'F4', 'F5', 'F11', 'F12', 'F13',
  'G7', 'G8', 'G9', 'G18', 'G19',
  'H3', 'H4', 'H10', 'H11', 'H12', 'H15', 'H16',
  'I6', 'I7', 'I8', 'I13', 'I14',
  'J2', 'J3', 'J11', 'J12', 'J19', 'J20',
  'K8', 'K9', 'K10', 'K15', 'K16',
  'L4', 'L5', 'L11', 'L12', 'L13'
];

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get('movieId') || params.get('id') || 'm-1';
  currentShowTime = params.get('time') || "06:45 PM";
  
  const theatreId = params.get('theatreId');
  if (theatreId === 'th-2') currentTheatreName = "Cinephilic Luxe Multiplex";
  else if (theatreId === 'th-3') currentTheatreName = "Cinephilic Royal Cinema";
  else if (theatreId === 'th-4') currentTheatreName = "Cinephilic Cineplex PVR";

  currentMovie = await MovieService.getMovieById(movieId) || (await MovieService.getAllMovies())[0];

  if (currentMovie) {
    renderSeatsHeader(currentMovie, currentShowTime, currentTheatreName);
    generateAuditoriumGrid();
    initProceedButton();
  }
});

function renderSeatsHeader(movie, showTime, theatreName) {
  const infoEl = document.getElementById('seats-movie-info');
  if (infoEl && movie) {
    infoEl.innerHTML = `
      <div style="text-align: right;">
        <h2 style="font-size: 1.15rem; font-weight: 800; color: #fff; margin-bottom: 2px;">${movie.title}</h2>
        <p style="color: #94a3b8; font-size: 0.8rem;">${theatreName} • <span style="color: var(--accent-red); font-weight: 700;">${showTime}</span></p>
      </div>
    `;
  }
}

function generateAuditoriumGrid() {
  const container = document.getElementById('seats-container');
  if (!container) return;

  // 12 Rows A to L
  const tiers = [
    {
      name: "ROYAL VIP RECLINER — ₹480",
      type: "recliner",
      rows: ['A', 'B'],
      price: 480
    },
    {
      name: "EXECUTIVE PRIME — ₹320",
      type: "executive",
      rows: ['C', 'D', 'E', 'F', 'G'],
      price: 320
    },
    {
      name: "CLUB STANDARD — ₹240",
      type: "club",
      rows: ['H', 'I', 'J', 'K', 'L'],
      price: 240
    }
  ];

  let fullHTML = '';

  tiers.forEach(tier => {
    fullHTML += `
      <div class="tier-header-divider ${tier.type}">
        <span>${tier.name}</span>
        <span style="font-size: 0.76rem; font-weight: 600; opacity: 0.8;">Both Single & Group Seating Available</span>
      </div>
    `;

    tier.rows.forEach(row => {
      let leftBlock = '';
      let centerBlock = '';
      let rightBlock = '';

      // Left Block (Seats 1-5)
      for (let i = 1; i <= 5; i++) {
        const seatId = `${row}${i}`;
        const isOccupied = OCCUPIED_SEATS.includes(seatId);
        const extraClass = tier.type === 'recliner' ? 'seat-recliner' : '';
        leftBlock += `<button class="seat ${extraClass} ${isOccupied ? 'occupied' : ''}" data-seat="${seatId}" data-row="${row}" data-num="${i}" data-price="${tier.price}" ${isOccupied ? 'disabled' : ''}>${i}</button>`;
      }

      // Center Block (Seats 6-17)
      for (let i = 6; i <= 17; i++) {
        const seatId = `${row}${i}`;
        const isOccupied = OCCUPIED_SEATS.includes(seatId);
        const extraClass = tier.type === 'recliner' ? 'seat-recliner' : '';
        centerBlock += `<button class="seat ${extraClass} ${isOccupied ? 'occupied' : ''}" data-seat="${seatId}" data-row="${row}" data-num="${i}" data-price="${tier.price}" ${isOccupied ? 'disabled' : ''}>${i}</button>`;
      }

      // Right Block (Seats 18-22)
      for (let i = 18; i <= 22; i++) {
        const seatId = `${row}${i}`;
        const isOccupied = OCCUPIED_SEATS.includes(seatId);
        const extraClass = tier.type === 'recliner' ? 'seat-recliner' : '';
        rightBlock += `<button class="seat ${extraClass} ${isOccupied ? 'occupied' : ''}" data-seat="${seatId}" data-row="${row}" data-num="${i}" data-price="${tier.price}" ${isOccupied ? 'disabled' : ''}>${i}</button>`;
      }

      fullHTML += `
        <div class="seat-row">
          <span class="row-label">${row}</span>
          <div class="row-seats-group">
            ${leftBlock}
            <span class="aisle-gap"></span>
            ${centerBlock}
            <span class="aisle-gap"></span>
            ${rightBlock}
          </div>
          <span class="row-label">${row}</span>
        </div>
      `;
    });
  });

  container.innerHTML = fullHTML;

  // Seat Click Events - Let user pick their own seats freely
  container.querySelectorAll('.seat:not(.occupied)').forEach(seatBtn => {
    seatBtn.addEventListener('click', () => {
      const seatId = seatBtn.getAttribute('data-seat');
      const isAlreadySelected = seatBtn.classList.contains('selected');

      if (isAlreadySelected) {
        // Deselect clicked seat
        seatBtn.classList.remove('selected');
        selectedSeats = selectedSeats.filter(s => s !== seatId);
      } else {
        // Select clicked seat
        if (selectedSeats.length >= 10) {
          alert('You can select a maximum of 10 seats per transaction.');
          return;
        }
        seatBtn.classList.add('selected');
        if (!selectedSeats.includes(seatId)) {
          selectedSeats.push(seatId);
        }
      }
      updateBookingBar();
    });
  });
}

function getSeatPrice(seatId) {
  const row = seatId.charAt(0);
  if (row === 'A' || row === 'B') return 480;
  if (['C', 'D', 'E', 'F', 'G'].includes(row)) return 320;
  return 240;
}

function updateBookingBar() {
  const countEl = document.getElementById('selected-count');
  const priceEl = document.getElementById('total-price');
  const seatsListEl = document.getElementById('selected-seats-list');
  const btn = document.getElementById('proceed-checkout-btn');

  let grandTotal = 0;
  selectedSeats.forEach(seatId => {
    grandTotal += getSeatPrice(seatId);
  });

  if (countEl) countEl.textContent = selectedSeats.length;
  if (priceEl) priceEl.textContent = `₹${grandTotal}`;
  if (seatsListEl) seatsListEl.textContent = selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None';

  if (btn) {
    btn.disabled = selectedSeats.length === 0;
    btn.style.opacity = selectedSeats.length === 0 ? '0.5' : '1';
    btn.style.cursor = selectedSeats.length === 0 ? 'not-allowed' : 'pointer';
  }
}

function initProceedButton() {
  const btn = document.getElementById('proceed-checkout-btn');
  btn?.addEventListener('click', () => {
    if (selectedSeats.length === 0) return alert('Please select at least one seat to proceed.');

    // Check if user is signed in
    const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : JSON.parse(localStorage.getItem('cinephilic_user') || 'null');
    if (!user) {
      alert('Please sign in to proceed with your booking.');
      window.location.href = 'auth.html?mode=login';
      return;
    }

    let grandTotal = 0;
    selectedSeats.forEach(seatId => {
      grandTotal += getSeatPrice(seatId);
    });

    const bookingData = {
      movie: currentMovie,
      showTime: currentShowTime,
      theatre: currentTheatreName,
      seats: selectedSeats,
      totalAmount: grandTotal,
      bookingRef: 'CNV-' + Math.floor(100000 + Math.random() * 900000),
      bookingDate: 'Today, Sep 18'
    };

    window.activeBooking = bookingData;
    localStorage.setItem('cinephilic_current_booking', JSON.stringify(bookingData));
    window.location.href = 'checkout.html';
  });
}

window.getSeatPrice = getSeatPrice;
