/* Cinephilic - Checkout & Payment Script (js/checkout.js) */
let currentBooking = null;
let discount = 0;
let selectedPaymentMethod = 'Credit / Debit Card';

document.addEventListener('DOMContentLoaded', () => {
  const data = localStorage.getItem('cinephilic_current_booking');
  if (!data) {
    alert('No active booking session found. Redirecting to movies catalog.');
    window.location.href = 'movies.html';
    return;
  }

  currentBooking = JSON.parse(data);
  renderCheckoutSummary();
  initPromoCode();
  initPaymentRadioButtons();
  initConfirmPayment();
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
  const payBtnAmountEl = document.getElementById('pay-btn-amount');

  if (movieTitleEl) movieTitleEl.textContent = currentBooking.movie.title;
  if (showInfoEl) showInfoEl.textContent = `${currentBooking.theatre || 'Cinephilic IMAX Plaza'} • ${currentBooking.showTime}`;
  if (seatsEl) seatsEl.textContent = `${currentBooking.seats.join(', ')} (${currentBooking.seats.length} Tickets)`;

  const convenienceFee = 30;
  const grandTotal = Math.max(0, currentBooking.totalAmount + convenienceFee - discount);

  if (subtotalEl) subtotalEl.textContent = `₹${currentBooking.totalAmount}`;
  if (feeEl) feeEl.textContent = `₹${convenienceFee}`;
  if (discountRowEl) discountRowEl.style.display = discount > 0 ? 'flex' : 'none';
  if (discountAmtEl) discountAmtEl.textContent = `-₹${discount}`;
  if (totalEl) totalEl.textContent = `₹${grandTotal}`;
  if (payBtnAmountEl) payBtnAmountEl.textContent = `${grandTotal}`;

  currentBooking.finalAmount = grandTotal;
}

function initPromoCode() {
  const applyBtn = document.getElementById('apply-promo-btn');
  const input = document.getElementById('promo-input');
  const statusEl = document.getElementById('promo-status');

  applyBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const code = input.value.trim().toUpperCase();
    if (code === 'CINE50' || code === 'VIP25') {
      discount = 50;
      if (statusEl) {
        statusEl.innerHTML = `<span style="color: #4ade80;">✓ Promo code "${code}" applied! ₹50 Discount</span>`;
      }
      renderCheckoutSummary();
    } else {
      if (statusEl) {
        statusEl.innerHTML = `<span style="color: var(--accent-red);">✗ Invalid code. Use "CINE50" for ₹50 off.</span>`;
      }
    }
  });
}

function initPaymentRadioButtons() {
  const radios = document.querySelectorAll('input[name="pay-method"]');
  const options = document.querySelectorAll('.payment-option');
  const cardFields = document.getElementById('card-fields');
  const upiFields = document.getElementById('upi-fields');
  const netbankingFields = document.getElementById('netbanking-fields');

  function updateActiveMethod(val) {
    options.forEach(opt => {
      const radioInside = opt.querySelector('input[type="radio"]');
      if (radioInside && radioInside.value === val) {
        opt.classList.add('active');
        radioInside.checked = true;
      } else {
        opt.classList.remove('active');
      }
    });

    if (cardFields) cardFields.style.display = (val === 'card') ? 'block' : 'none';
    if (upiFields) upiFields.style.display = (val === 'upi') ? 'block' : 'none';
    if (netbankingFields) netbankingFields.style.display = (val === 'netbanking') ? 'block' : 'none';

    if (val === 'card') selectedPaymentMethod = 'Credit / Debit Card';
    else if (val === 'upi') selectedPaymentMethod = 'UPI Instant';
    else if (val === 'netbanking') selectedPaymentMethod = 'Netbanking';
  }

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      updateActiveMethod(radio.value);
    });
  });

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      const radio = opt.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        updateActiveMethod(radio.value);
      }
    });
  });
}

function initConfirmPayment() {
  const payBtn = document.getElementById('pay-now-btn');

  payBtn?.addEventListener('click', async () => {
    payBtn.disabled = true;
    payBtn.textContent = 'Processing Payment...';

    const currentUser = JSON.parse(localStorage.getItem('cinephilic_user') || 'null');

    const confirmedTicket = {
      ...currentBooking,
      paymentMethod: selectedPaymentMethod,
      bookingDate: new Date().toLocaleDateString(),
      userEmail: currentUser ? currentUser.email : 'guest@cinephilic.com',
      userName: currentUser ? currentUser.name : 'Guest User',
      status: 'Confirmed'
    };

    // 1. Try sending to MySQL Backend API
    try {
      await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingRef: confirmedTicket.bookingRef,
          userId: currentUser?.id || null,
          userEmail: confirmedTicket.userEmail,
          movieTitle: confirmedTicket.movie.title,
          theatreName: confirmedTicket.theatre || 'Cinephilic IMAX Plaza',
          showTime: confirmedTicket.showTime,
          showDate: confirmedTicket.bookingDate,
          seats: confirmedTicket.seats,
          totalAmount: confirmedTicket.finalAmount,
          paymentMethod: selectedPaymentMethod
        })
      });
      console.log('[Checkout] Booking synchronized with MySQL Backend');
    } catch (e) {
      console.warn('[Checkout] MySQL Backend offline, stored locally:', e.message);
    }

    // 2. Store in local user bookings list
    const existingBookings = JSON.parse(localStorage.getItem('cinephilic_user_bookings') || '[]');
    existingBookings.unshift(confirmedTicket);
    localStorage.setItem('cinephilic_user_bookings', JSON.stringify(existingBookings));
    localStorage.setItem('cinephilic_last_confirmed', JSON.stringify(confirmedTicket));

    // 3. Redirect to Confirmation E-Ticket Page
    window.location.href = 'confirmation.html';
  });
}
