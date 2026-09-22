/* Cinephilic - Theatre Selection Script (js/theatres.js) */
const CITY_THEATRES = {
  'Delhi NCR': [
    { 
      id: 'th-1', 
      name: "Cinephilic IMAX 4K - Grand Plaza", 
      location: "Downtown Mall, Sector 18, Noida", 
      format: "IMAX 3D • Dolby Atmos", 
      distance: "2.4 km",
      times: ['10:30 AM', '02:15 PM', '06:45 PM', '09:30 PM'],
      execPrice: 280,
      vipPrice: 480
    },
    { 
      id: 'th-2', 
      name: "Cinephilic Luxe Multiplex", 
      location: "Select Citywalk, Saket, New Delhi", 
      format: "4DX • Dolby 7.1", 
      distance: "4.1 km",
      times: ['11:00 AM', '03:30 PM', '07:15 PM', '10:15 PM'],
      execPrice: 320,
      vipPrice: 550
    },
    { 
      id: 'th-3', 
      name: "Cinephilic Royal Cinema", 
      location: "Connaught Place, Central Delhi", 
      format: "2D • Standard", 
      distance: "5.8 km",
      times: ['09:45 AM', '01:15 PM', '05:00 PM', '08:45 PM'],
      execPrice: 240,
      vipPrice: 420
    },
    { 
      id: 'th-4', 
      name: "Cinephilic Cineplex PVR", 
      location: "Ambience Mall, NH-8, Gurugram", 
      format: "IMAX 2D • ScreenX", 
      distance: "7.2 km",
      times: ['12:30 PM', '04:00 PM', '07:45 PM', '11:00 PM'],
      execPrice: 300,
      vipPrice: 500
    }
  ],
  'Mumbai': [
    { 
      id: 'th-5', 
      name: "Cinephilic Phoenix Palladium IMAX", 
      location: "High Street Phoenix, Lower Parel, Mumbai", 
      format: "IMAX Laser • Dolby Atmos", 
      distance: "1.8 km",
      times: ['10:15 AM', '01:45 PM', '06:30 PM', '09:45 PM'],
      execPrice: 350,
      vipPrice: 650
    },
    { 
      id: 'th-6', 
      name: "Cinephilic Bandra Luxe", 
      location: "Linking Road, Bandra West, Mumbai", 
      format: "4DX • Dolby Atmos", 
      distance: "3.2 km",
      times: ['11:30 AM', '03:00 PM', '07:30 PM', '10:45 PM'],
      execPrice: 320,
      vipPrice: 580
    },
    { 
      id: 'th-7', 
      name: "Cinephilic R-City Multiplex", 
      location: "LBS Marg, Ghatkopar West, Mumbai", 
      format: "2D • Dolby 7.1", 
      distance: "6.5 km",
      times: ['09:30 AM', '01:00 PM', '05:15 PM', '08:30 PM'],
      execPrice: 260,
      vipPrice: 450
    }
  ],
  'Bengaluru': [
    { 
      id: 'th-8', 
      name: "Cinephilic Forum IMAX", 
      location: "Hosur Road, Koramangala, Bengaluru", 
      format: "IMAX 3D • Dolby Atmos", 
      distance: "2.1 km",
      times: ['10:00 AM', '01:30 PM', '06:00 PM', '09:15 PM'],
      execPrice: 300,
      vipPrice: 520
    },
    { 
      id: 'th-9', 
      name: "Cinephilic Orion Luxe", 
      location: "Brigade Gateway, Rajajinagar, Bengaluru", 
      format: "4DX • Dolby 7.1", 
      distance: "4.8 km",
      times: ['11:15 AM', '03:45 PM', '07:00 PM', '10:30 PM'],
      execPrice: 310,
      vipPrice: 540
    }
  ],
  'Chandigarh': [
    { 
      id: 'th-10', 
      name: "Cinephilic Elante Multiplex", 
      location: "Industrial Area Phase 1, Chandigarh", 
      format: "IMAX 4K • Dolby Atmos", 
      distance: "1.5 km",
      times: ['10:30 AM', '02:00 PM', '06:15 PM', '09:30 PM'],
      execPrice: 250,
      vipPrice: 450
    },
    { 
      id: 'th-11', 
      name: "Cinephilic Sector 17 Cineplex", 
      location: "City Centre, Sector 17, Chandigarh", 
      format: "2D • Standard", 
      distance: "3.0 km",
      times: ['11:00 AM', '03:15 PM', '07:30 PM', '10:00 PM'],
      execPrice: 220,
      vipPrice: 380
    }
  ],
  'Hyderabad': [
    { 
      id: 'th-12', 
      name: "Cinephilic Inorbit IMAX", 
      location: "HITEC City, Madhapur, Hyderabad", 
      format: "IMAX Laser • Dolby Atmos", 
      distance: "2.8 km",
      times: ['10:45 AM', '02:30 PM', '06:45 PM', '10:15 PM'],
      execPrice: 290,
      vipPrice: 500
    },
    { 
      id: 'th-13', 
      name: "Cinephilic GVK One Luxe", 
      location: "Road No 1, Banjara Hills, Hyderabad", 
      format: "4DX • Dolby 7.1", 
      distance: "5.2 km",
      times: ['11:30 AM', '03:15 PM', '07:45 PM', '11:00 PM'],
      execPrice: 310,
      vipPrice: 530
    }
  ],
  'Pune': [
    { 
      id: 'th-14', 
      name: "Cinephilic Phoenix Marketcity", 
      location: "Viman Nagar, Nagar Road, Pune", 
      format: "IMAX 3D • Dolby Atmos", 
      distance: "2.0 km",
      times: ['10:00 AM', '01:45 PM', '06:30 PM', '09:45 PM'],
      execPrice: 270,
      vipPrice: 470
    },
    { 
      id: 'th-15', 
      name: "Cinephilic Westend Mall Cinema", 
      location: "Aundh, Pune", 
      format: "4DX • Dolby 7.1", 
      distance: "4.5 km",
      times: ['11:00 AM', '03:00 PM', '07:15 PM', '10:30 PM'],
      execPrice: 280,
      vipPrice: 490
    }
  ]
};

let currentCity = 'Delhi NCR';
let selectedMovieObj = null;
let currentSelectedTime = '06:45 PM';

document.addEventListener('DOMContentLoaded', async () => {
  // Sync location from localStorage or user profile
  const savedLocation = localStorage.getItem('cinephilic_location');
  const user = JSON.parse(localStorage.getItem('cinephilic_user') || 'null');
  
  if (savedLocation && CITY_THEATRES[savedLocation]) {
    currentCity = savedLocation;
  } else if (user && user.city && CITY_THEATRES[user.city]) {
    currentCity = user.city;
  }

  const citySelect = document.getElementById('theatre-city-select');
  if (citySelect) {
    citySelect.value = currentCity;
  }

  const params = new URLSearchParams(window.location.search);
  const movieId = params.get('movieId') || params.get('id') || '101';
  
  selectedMovieObj = await MovieService.getMovieById(movieId) || (await MovieService.getAllMovies())[0];

  if (selectedMovieObj) {
    renderMovieBanner(selectedMovieObj);
    renderCurrentTheatres();
  }

  // Keyboard close modal on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeTicketModal();
  });
});

function changeCityLocation(city) {
  if (CITY_THEATRES[city]) {
    currentCity = city;
    localStorage.setItem('cinephilic_location', city);
    
    // Also update current logged in user profile city if exists
    const user = JSON.parse(localStorage.getItem('cinephilic_user') || 'null');
    if (user) {
      user.city = city;
      localStorage.setItem('cinephilic_user', JSON.stringify(user));
    }
    
    renderCurrentTheatres();
  }
}

function detectUserLocation() {
  const cities = Object.keys(CITY_THEATRES);
  // Pick next or random city / detect simulated
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  const citySelect = document.getElementById('theatre-city-select');
  if (citySelect) citySelect.value = randomCity;
  changeCityLocation(randomCity);
  alert(`Detected Location: ${randomCity}`);
}

function renderCurrentTheatres() {
  const list = CITY_THEATRES[currentCity] || CITY_THEATRES['Delhi NCR'];
  renderTheatres(list, selectedMovieObj ? selectedMovieObj.id : '101');
}

function renderMovieBanner(movie) {
  const banner = document.getElementById('selected-movie-banner');
  const fallbackImg = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500';

  if (banner && movie) {
    banner.innerHTML = `
      <div style="display: flex; align-items: center; gap: 20px; background: rgba(16, 20, 36, 0.75); backdrop-filter: blur(14px); padding: 22px 26px; border-radius: 18px; border: 1px solid rgba(255, 255, 255, 0.08); margin-top: 25px; margin-bottom: 30px; flex-wrap: wrap; box-shadow: 0 10px 25px rgba(0,0,0,0.4);">
        <img src="${movie.poster_path}" alt="${movie.title}" style="width: 75px; border-radius: 10px; aspect-ratio: 2/3; object-fit: cover; border: 1px solid rgba(255,255,255,0.15);" onerror="this.src='${fallbackImg}'">
        <div style="flex: 1;">
          <span class="badge badge-red" style="margin-bottom: 6px; font-weight: 700; text-transform: uppercase;">Step 1: Select Cinema & Showtime</span>
          <h2 style="font-size: 1.6rem; font-weight: 800; margin: 4px 0; color: #fff;">${movie.title}</h2>
          <p style="color: #94a3b8; font-size: 0.9rem;">${movie.genre ? movie.genre.join(', ') : 'Action'} • ${movie.language} • ${movie.runtime || '2h 30m'}</p>
        </div>
        <div>
          <a href="movies.html" class="btn btn-outline" style="font-size: 0.84rem; padding: 8px 16px; border-radius: 20px;">Change Movie</a>
        </div>
      </div>
    `;
  }
}

function renderTheatres(theatres, movieId) {
  const list = document.getElementById('theatres-list');
  if (!list) return;

  list.innerHTML = theatres.map(t => `
    <div class="theatre-card" onclick="openTicketModal('${t.id}')">
      <div style="flex: 1;">
        <div class="theatre-name">
          <span>${t.name}</span>
        </div>
        <div class="theatre-info">
          <span>${t.location} (${t.distance})</span>
          <span class="facility-tag">${t.format}</span>
        </div>
        <div class="card-showtime-pills">
          ${t.times.map(time => `
            <span class="card-time-pill" onclick="event.stopPropagation(); openTicketModal('${t.id}', '${time}')">
              ${time}
            </span>
          `).join('')}
        </div>
      </div>
      <div style="padding-left: 20px;">
        <button class="btn btn-primary" onclick="event.stopPropagation(); openTicketModal('${t.id}')" style="border-radius: 12px; padding: 10px 20px; font-weight: 700;">
          Select Showtimes →
        </button>
      </div>
    </div>
  `).join('');
}

function getAllTheatresList() {
  const all = [];
  Object.values(CITY_THEATRES).forEach(arr => all.push(...arr));
  return all;
}

function openTicketModal(theatreId, preferredTime = null) {
  const allTheatres = getAllTheatresList();
  const theatre = allTheatres.find(t => t.id === theatreId) || allTheatres[0];
  const movie = selectedMovieObj || { id: 101, title: 'Mirzapur: The Movie', poster_path: 'attributes/posters/mirzapur.jpg', language: 'Hindi' };

  if (preferredTime) {
    currentSelectedTime = preferredTime;
  } else {
    currentSelectedTime = theatre.times[0];
  }

  const overlay = document.getElementById('ticket-modal-overlay');
  if (!overlay) return;

  const fallbackImg = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500';

  overlay.innerHTML = `
    <div class="ticket-card-box" onclick="event.stopPropagation()">
      <button class="ticket-close-btn" onclick="closeTicketModal()">✕</button>
      
      <div class="ticket-header">
        <img src="${movie.poster_path}" alt="${movie.title}" class="ticket-poster-thumb" onerror="this.src='${fallbackImg}'">
        <div class="ticket-header-info">
          <div class="ticket-gold-badge">OFFICIAL CINEMA PASS</div>
          <div class="ticket-movie-title">${movie.title}</div>
          <div class="ticket-theatre-name">${theatre.name}</div>
          <div class="ticket-location">${theatre.location} (${theatre.distance}) • ${theatre.format}</div>
        </div>
      </div>

      <div class="ticket-body">
        <div class="ticket-section-label">
          <span>Choose Showtime Slot</span>
          <span style="color: var(--accent-red); font-weight: 800;">Today</span>
        </div>
        <div class="ticket-showtime-grid" id="ticket-time-grid">
          ${theatre.times.map(t => `
            <button class="ticket-time-btn ${t === currentSelectedTime ? 'active' : ''}" onclick="selectModalTime(this, '${t}')">
              ${t}
            </button>
          `).join('')}
        </div>

        <div class="ticket-section-label">Ticket Tier Options</div>
        <div class="ticket-pricing-row">
          <div class="ticket-price-chip">
            <span>Executive Seats</span>
            <span class="ticket-price-val">₹${theatre.execPrice}</span>
          </div>
          <div class="ticket-price-chip">
            <span>VIP Recliner</span>
            <span class="ticket-price-val">₹${theatre.vipPrice}</span>
          </div>
        </div>
      </div>

      <div class="ticket-perforated-line"></div>

      <div class="ticket-stub-footer" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
        <div style="font-size: 0.82rem; color: #94a3b8;">
          City: <strong style="color: #fff;">${currentCity}</strong>
        </div>
        <button class="btn-proceed-seats" onclick="proceedToSeats('${movie.id}', '${theatre.id}')">
          Proceed to Seats →
        </button>
      </div>
    </div>
  `;

  overlay.onclick = (e) => {
    if (e.target === overlay) closeTicketModal();
  };

  overlay.classList.add('active');
}

function selectModalTime(btnEl, timeStr) {
  currentSelectedTime = timeStr;
  const allBtns = document.querySelectorAll('.ticket-time-btn');
  allBtns.forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');
}

function closeTicketModal() {
  const overlay = document.getElementById('ticket-modal-overlay');
  if (overlay) overlay.classList.remove('active');
}

function proceedToSeats(movieId, theatreId) {
  window.location.href = `seats.html?movieId=${movieId}&theatreId=${theatreId}&time=${encodeURIComponent(currentSelectedTime)}`;
}

window.openTicketModal = openTicketModal;
window.closeTicketModal = closeTicketModal;
window.selectModalTime = selectModalTime;
window.proceedToSeats = proceedToSeats;
window.changeCityLocation = changeCityLocation;
window.detectUserLocation = detectUserLocation;

