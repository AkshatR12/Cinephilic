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
  const badgeEl = document.getElementById('user-badge');
  const actionHolder = document.getElementById('auth-action-holder');

  if (user) {
    if (avatarEl) avatarEl.textContent = user.name.charAt(0).toUpperCase();
    if (nameEl) nameEl.textContent = user.name;
    if (emailEl) emailEl.textContent = user.email;
    if (badgeEl) badgeEl.textContent = `VIP Member • Joined ${user.joined || '2026'}`;
    if (actionHolder) actionHolder.innerHTML = '';
  } else {
    if (avatarEl) avatarEl.textContent = '👤';
    if (nameEl) nameEl.textContent = 'Guest Cinephile';
    if (emailEl) emailEl.textContent = 'Sign in to save your tickets and sync across devices';
    if (badgeEl) badgeEl.textContent = 'Guest Account';
    if (actionHolder) {
      actionHolder.innerHTML = `
        <a href="auth.html?mode=login" class="btn btn-primary" style="padding: 4px 12px; font-size: 0.8rem;">Sign In</a>
      `;
    }
  }
}

function renderBookingsHistory() {
  const historyContainer = document.getElementById('bookings-history-list');
  const bookings = JSON.parse(localStorage.getItem('cinephilic_user_bookings') || '[]');

  if (!historyContainer) return;

  if (bookings.length === 0) {
    historyContainer.innerHTML = `
      <div class="empty-state" style="background: var(--bg-card); padding: 40px; border-radius: var(--radius); border: 1px solid var(--border-color); text-align: center;">
        <div class="empty-icon" style="font-size: 3rem; margin-bottom: 12px;">🎟️</div>
        <h3 style="font-size: 1.3rem; margin-bottom: 8px;">No Bookings Found</h3>
        <p style="color: var(--text-muted); margin-bottom: 20px;">You haven't reserved any movie tickets yet.</p>
        <a href="movies.html" class="btn btn-primary">Browse Movie Catalog</a>
      </div>
    `;
    return;
  }

  historyContainer.innerHTML = bookings.map((b, index) => {
    const qrData = encodeURIComponent(`CINEPHILIC-REF:${b.bookingRef}|MOVIE:${b.movie.title}|SEATS:${b.seats.join(',')}|TIME:${b.showTime}`);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${qrData}&color=ffffff&bgcolor=161b29`;

    return `
      <div class="booking-card" style="display: flex; gap: 20px; align-items: center; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius); padding: 20px; margin-bottom: 20px; flex-wrap: wrap;">
        <img src="${b.movie.poster_path}" alt="${b.movie.title}" style="width: 80px; height: 120px; object-fit: cover; border-radius: 8px;" onerror="this.src='https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400'">
        
        <div class="booking-card-details" style="flex: 1; min-width: 240px;">
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 6px;">
            <span class="badge badge-gold">REF: ${b.bookingRef}</span>
            <span class="badge badge-red">${b.status || 'Confirmed'}</span>
          </div>
          <h3 class="booking-card-title" style="font-size: 1.25rem; font-weight: 700; margin-bottom: 6px;">${b.movie.title}</h3>
          <div class="booking-meta" style="display: flex; flex-direction: column; gap: 4px; font-size: 0.88rem; color: var(--text-muted);">
            <span>📍 Cinephilic IMAX Plaza</span>
            <span>🕒 Showtime: <strong style="color: #fff;">${b.showTime}</strong></span>
            <span>💺 Seats: <strong style="color: var(--accent-red);">${b.seats.join(', ')}</strong> (${b.seats.length} Tickets)</span>
            <span>💳 Total Paid: <strong style="color: var(--accent-gold);">₹${b.finalAmount || b.totalAmount}</strong></span>
          </div>
        </div>

        <div style="text-align: center; padding: 10px; background: rgba(0,0,0,0.3); border-radius: 8px; border: 1px solid var(--border-color);">
          <img src="${qrUrl}" alt="Booking QR" style="width: 85px; height: 85px; display: block; border-radius: 4px;" onerror="this.style.display='none'">
          <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">Gate QR Code</div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          <button onclick="viewTicketConfirmation(${index})" class="btn btn-secondary" style="padding: 8px 14px; font-size: 0.85rem;">View E-Ticket</button>
          <button onclick="cancelBooking(${index})" class="btn btn-outline" style="color: var(--accent-red); border-color: rgba(255,42,95,0.3); padding: 8px 14px; font-size: 0.85rem;">Cancel Ticket</button>
        </div>
      </div>
    `;
  }).join('');
}

function viewTicketConfirmation(index) {
  const bookings = JSON.parse(localStorage.getItem('cinephilic_user_bookings') || '[]');
  if (bookings[index]) {
    localStorage.setItem('cinephilic_last_confirmed', JSON.stringify(bookings[index]));
    window.location.href = 'confirmation.html';
  }
}

function cancelBooking(index) {
  if (!confirm('Are you sure you want to cancel this ticket booking? Full refund will be processed.')) return;

  const bookings = JSON.parse(localStorage.getItem('cinephilic_user_bookings') || '[]');
  bookings.splice(index, 1);
  localStorage.setItem('cinephilic_user_bookings', JSON.stringify(bookings));
  renderBookingsHistory();
}
