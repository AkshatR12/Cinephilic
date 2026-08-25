/* Cinephilic - Checkout & Payment Script (js/checkout.js) */
let currentBooking = null;
let discount = 0;

document.addEventListener('DOMContentLoaded', () => {
  const data = localStorage.getItem('cinephilic_current_booking');
  if (!data) {
    alert('No active booking session found. Redirecting to movies.');
    window.location.href = 'movies.html';
    return;
  }

  currentBooking = JSON.parse(data);
  renderCheckoutSummary();
  initPromoCode();
  initPaymentForm();
});

function renderCheckoutSummary() {
  const movieTitleEl = document.getElementById('checkout-movie-title');
  const showInfoEl = document.getElementById('checkout-show-info');
  const seatsEl = document.getElementById('checkout-seats');
  const subtotalEl = document.getElementById('checkout-subtotal');
  const feeEl = document.getElementById('checkout-fee');
  const discountRowEl = document.getElementById('checkout-discount-row');
  const discountAmtEl = document.getElementById('checkout-discount');
  const totalEl = document.getElementById('checkout-total');

  if (movieTitleEl) movieTitleEl.textContent = currentBooking.movie.title;
  if (showInfoEl) showInfoEl.textContent = `Cinephilic IMAX • ${currentBooking.showTime}`;
  if (seatsEl) seatsEl.textContent = `${currentBooking.seats.join(', ')} (${currentBooking.seats.length} Tickets)`;

  const convenienceFee = 30;
  const grandTotal = currentBooking.totalAmount + convenienceFee - discount;

  if (subtotalEl) subtotalEl.textContent = `₹${currentBooking.totalAmount}`;
  if (feeEl) feeEl.textContent = `₹${convenienceFee}`;
  if (discountRowEl) discountRowEl.style.display = discount > 0 ? 'flex' : 'none';
  if (discountAmtEl) discountAmtEl.textContent = `-₹${discount}`;
  if (totalEl) totalEl.textContent = `₹${grandTotal}`;

  currentBooking.finalAmount = grandTotal;
}

function initPromoCode() {
  const applyBtn = document.getElementById('apply-promo-btn');
  const input = document.getElementById('promo-input');

  applyBtn?.addEventListener('click', () => {
    const code = input.value.trim().toUpperCase();
    if (code === 'CINE50' || code === 'VIP25') {
      discount = 50;
      alert('Promo code applied successfully! ₹50 Discount');
      renderCheckoutSummary();
    } else {
      alert('Invalid promo code. Try "CINE50"');
    }
  });
}

function initPaymentForm() {
  const payBtn = document.getElementById('pay-now-btn');
  const options = document.querySelectorAll('.payment-option');

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      options.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });

  payBtn?.addEventListener('click', () => {
    // Save to user bookings history
    const existingBookings = JSON.parse(localStorage.getItem('cinephilic_user_bookings') || '[]');
    const confirmedTicket = {
      ...currentBooking,
      bookingDate: new Date().toLocaleDateString(),
      status: 'Confirmed'
    };

    existingBookings.unshift(confirmedTicket);
    localStorage.setItem('cinephilic_user_bookings', JSON.stringify(existingBookings));
    localStorage.setItem('cinephilic_last_confirmed', JSON.stringify(confirmedTicket));

    alert('Payment successful! Generating E-ticket...');
    window.location.href = 'confirmation.html';
  });
}
