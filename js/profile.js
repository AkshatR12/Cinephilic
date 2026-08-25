/* Cinephilic - Profile & Bookings History Script (js/profile.js) */
document.addEventListener('DOMContentLoaded', () => {
  renderUserProfile();
  renderBookingsHistory();
});

function renderUserProfile() {
  const user = JSON.parse(localStorage.getItem('cinephilic_user') || 'null');
  const avatarEl = document.getElementById('user-avatar');
  const nameEl = document.getElementById('user-name');
  const emailEl = document.getElementById('user-email');

  if (user) {
    if (avatarEl) avatarEl.textContent = user.name.charAt(0).toUpperCase();
    if (nameEl) nameEl.textContent = user.name;
    if (emailEl) emailEl.textContent = user.email;
  } else {
    if (nameEl) nameEl.textContent = 'Guest Cinephile';
    if (emailEl) emailEl.textContent = 'Sign in to sync your bookings across devices';
  }
}

function renderBookingsHistory() {
  const historyContainer = document.getElementById('bookings-history-list');
  const bookings = JSON.parse(localStorage.getItem('cinephilic_user_bookings') || '[]');

  if (!historyContainer) return;

  if (bookings.length === 0) {
    historyContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🎟️</div>
        <h3>No Bookings Yet</h3>
        <p style="margin-bottom: 20px;">You haven't reserved any movie tickets yet.</p>
        <a href="movies.html" class="btn btn-primary">Browse Movies</a>
      </div>
    `;
    return;
  }

  historyContainer.innerHTML = bookings.map((b, index) => `
    <div class="booking-card">
      <img src="${b.movie.poster_path}" alt="${b.movie.title}" class="booking-card-poster">
      <div class="booking-card-details">
        <span class="badge badge-gold" style="margin-bottom: 6px;">Ref: ${b.bookingRef}</span>
        <h3 class="booking-card-title">${b.movie.title}</h3>
        <div class="booking-meta">
          <span>🕒 ${b.showTime}</span>
          <span>💺 Seats: ${b.seats.join(', ')}</span>
          <span>💳 Amount: ₹${b.finalAmount || b.totalAmount}</span>
        </div>
      </div>
      <button onclick="cancelBooking(${index})" class="btn btn-outline" style="color: var(--accent-red); border-color: var(--accent-red);">Cancel</button>
    </div>
  `).join('');
}

function cancelBooking(index) {
  if (!confirm('Are you sure you want to cancel this ticket booking?')) return;

  const bookings = JSON.parse(localStorage.getItem('cinephilic_user_bookings') || '[]');
  bookings.splice(index, 1);
  localStorage.setItem('cinephilic_user_bookings', JSON.stringify(bookings));
  renderBookingsHistory();
}
