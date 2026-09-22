/* Cinephilic - Cine Dashboard & Profile Management Script (js/profile.js) */

let currentUserData = null;
let currentOTPCode = "492815";
let otpTimerInterval = null;
let pendingProfileChanges = null;
let selectedAvatarPath = "assets/images/avatars/avatar_1.png";

// Total 18 avatars metadata array
const AVATAR_LIST = [
  { id: 1, path: 'assets/images/avatars/avatar_1.png', label: 'Sunglasses Hoodie Boy' },
  { id: 2, path: 'assets/images/avatars/avatar_2.png', label: 'Headphones Gamer Boy' },
  { id: 3, path: 'assets/images/avatars/avatar_3.png', label: 'Winking Hoodie Boy' },
  { id: 4, path: 'assets/images/avatars/avatar_4.png', label: 'Baseball Cap Boy' },
  { id: 5, path: 'assets/images/avatars/avatar_5.png', label: 'Classic Glasses Boy' },
  { id: 6, path: 'assets/images/avatars/avatar_6.png', label: 'Cute Hoodie Boy' },
  { id: 7, path: 'assets/images/avatars/avatar_7.png', label: 'Cheerful Hoodie Boy' },
  { id: 8, path: 'assets/images/avatars/avatar_8.png', label: 'Backpack Cap Boy' },
  { id: 9, path: 'assets/images/avatars/avatar_9.png', label: 'Iced Coffee Glasses Boy' },

  { id: 10, path: 'assets/images/avatars/avatar_10.png', label: 'Sunglasses Long Hair Girl' },
  { id: 11, path: 'assets/images/avatars/avatar_11.png', label: 'Headphones Music Girl' },
  { id: 12, path: 'assets/images/avatars/avatar_12.png', label: 'Winking Long Hair Girl' },
  { id: 13, path: 'assets/images/avatars/avatar_13.png', label: 'Baseball Cap Girl' },
  { id: 14, path: 'assets/images/avatars/avatar_14.png', label: 'Cute Glasses Girl' },
  { id: 15, path: 'assets/images/avatars/avatar_15.png', label: 'Bun Hair Hoodie Girl' },
  { id: 16, path: 'assets/images/avatars/avatar_16.png', label: 'Smiling Aesthetic Girl' },
  { id: 17, path: 'assets/images/avatars/avatar_17.png', label: 'Blue Cap Girl' },
  { id: 18, path: 'assets/images/avatars/avatar_18.png', label: 'Pink Hoodie Coffee Girl' }
];

document.addEventListener('DOMContentLoaded', () => {
  initUserData();
  renderAvatarGrid();
  initDashboardTabs();
  initOTPInputListeners();
  renderAllPassCategories();
});

function initUserData() {
  let user = JSON.parse(localStorage.getItem('cinephilic_user') || 'null');
  
  if (!user) {
    window.location.href = 'auth.html?mode=login';
    return;
  }

  if (!user.avatar) {
    user.avatar = 'assets/images/avatars/avatar_1.png';
    localStorage.setItem('cinephilic_user', JSON.stringify(user));
  }

  // Ensure default stats object exists
  if (!user.stats) {
    user.stats = { totalPasses: 0, activeShows: 0 };
    localStorage.setItem('cinephilic_user', JSON.stringify(user));
  }

  currentUserData = user;
  selectedAvatarPath = user.avatar;

  // Header Avatar Img & Details
  const avatarImgEl = document.getElementById('user-avatar-img');
  const nameEl = document.getElementById('user-name');
  const emailEl = document.getElementById('user-email-val');
  const phoneEl = document.getElementById('user-phone');
  const badgeEl = document.getElementById('user-badge');
  const locBadgeEl = document.getElementById('user-location-badge');

  if (avatarImgEl) avatarImgEl.src = user.avatar;
  if (nameEl) nameEl.textContent = (user.name || 'User').toUpperCase();
  if (emailEl) emailEl.textContent = user.email || '';
  if (phoneEl) phoneEl.textContent = user.phone || '';
  if (badgeEl) badgeEl.textContent = `VIP CINEPHILE MEMBER • Joined ${user.joined || '2026'}`;
  if (locBadgeEl) locBadgeEl.textContent = `${user.city || localStorage.getItem('cinephilic_location') || 'Delhi NCR'}`;


  // Edit Section Active Preview
  const previewImgEl = document.getElementById('edit-avatar-preview-img');
  if (previewImgEl) previewImgEl.src = user.avatar;

  // Fill edit form inputs
  const editName = document.getElementById('edit-user-name');
  const editEmail = document.getElementById('edit-user-email');
  const editPhone = document.getElementById('edit-user-phone');
  const editCity = document.getElementById('edit-user-city');
  const editGender = document.getElementById('edit-user-gender');
  const editDob = document.getElementById('edit-user-dob');

  if (editName) editName.value = user.name || '';
  if (editEmail) editEmail.value = user.email || '';
  if (editPhone) editPhone.value = user.phone || '';
  if (editCity) editCity.value = user.city || localStorage.getItem('cinephilic_location') || 'Delhi NCR';
  if (editGender) editGender.value = user.gender || 'Male';
  if (editDob) editDob.value = user.dob || '2000-01-01';
}

/* Render Simple Horizontal Scrollbar Presets (All 18 Avatars) */
function renderAvatarGrid() {
  const container = document.getElementById('avatars-grid-container');
  if (!container) return;

  container.innerHTML = AVATAR_LIST.map(item => {
    const isSelected = item.path === selectedAvatarPath;
    return `
      <div class="avatar-option-card ${isSelected ? 'selected' : ''}" 
           onclick="selectAvatarChoice('${item.path}')" 
           title="${item.label}">
        <img src="${item.path}" alt="${item.label}">
      </div>
    `;
  }).join('');
}

function selectAvatarChoice(avatarPath) {
  selectedAvatarPath = avatarPath;

  // Highlight active option
  const allAvatarCards = document.querySelectorAll('.avatar-option-card');
  allAvatarCards.forEach(card => {
    const img = card.querySelector('img');
    if (img && img.getAttribute('src') === avatarPath) {
      card.classList.add('selected');
    } else {
      card.classList.remove('selected');
    }
  });

  // Update Edit Section Preview Box
  const previewImg = document.getElementById('edit-avatar-preview-img');
  if (previewImg) previewImg.src = avatarPath;
}

/* Custom Upload from Phone / PC Folder */
function handleCustomAvatarUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    selectAvatarChoice(dataUrl);

    // Prepend custom avatar option to row if not already added
    const container = document.getElementById('avatars-grid-container');
    if (container) {
      const customOption = document.createElement('div');
      customOption.className = 'avatar-option-card selected';
      customOption.setAttribute('onclick', `selectAvatarChoice('${dataUrl}')`);
      customOption.setAttribute('title', 'Custom Uploaded Picture');
      customOption.innerHTML = `<img src="${dataUrl}" alt="Custom Upload">`;
      
      container.insertBefore(customOption, container.firstChild);
    }

    alert('Custom picture selected! Click "Save Profile Changes" below to apply.');
  };
  reader.readAsDataURL(file);
}

function switchTabToSecurity() {
  const tabs = document.querySelectorAll('.dash-tab-btn');
  const views = document.querySelectorAll('.dash-view-section');

  tabs.forEach(t => {
    if (t.getAttribute('data-tab') === 'security') t.classList.add('active');
    else t.classList.remove('active');
  });

  views.forEach(v => {
    if (v.id === 'security-view') v.classList.add('active');
    else v.classList.remove('active');
  });

  window.scrollTo({ top: 350, behavior: 'smooth' });
}

function initDashboardTabs() {
  const tabs = document.querySelectorAll('.dash-tab-btn');
  const views = document.querySelectorAll('.dash-view-section');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      views.forEach(view => {
        if (view.id === `${targetTab}-passes-view` || view.id === `${targetTab}-view`) {
          view.classList.add('active');
        } else {
          view.classList.remove('active');
        }
      });
    });
  });
}

function handleProfileSubmit(e) {
  e.preventDefault();

  const newName = document.getElementById('edit-user-name').value.trim();
  const newEmail = document.getElementById('edit-user-email').value.trim();
  const newPhone = document.getElementById('edit-user-phone').value.trim();
  const newCity = document.getElementById('edit-user-city')?.value || 'Delhi NCR';
  const newGender = document.getElementById('edit-user-gender').value;
  const newDob = document.getElementById('edit-user-dob').value;

  if (!newName || !newEmail || !newPhone) {
    alert('Please fill out all required profile fields.');
    return;
  }

  pendingProfileChanges = { 
    name: newName, 
    email: newEmail, 
    phone: newPhone,
    city: newCity,
    gender: newGender,
    dob: newDob,
    avatar: selectedAvatarPath
  };

  openOTPModal(newEmail);
}

function openOTPModal(targetEmail) {
  currentOTPCode = Math.floor(100000 + Math.random() * 900000).toString();

  const targetEl = document.getElementById('otp-target-contact');
  const codeEl = document.getElementById('simulated-otp-code');
  const modal = document.getElementById('otp-verification-modal');

  if (targetEl) targetEl.textContent = targetEmail;
  if (codeEl) codeEl.textContent = currentOTPCode;

  const inputs = document.querySelectorAll('.otp-digit-input');
  inputs.forEach(i => i.value = '');
  if (inputs[0]) inputs[0].focus();

  if (modal) modal.classList.add('active');
  startOTPTimer();
}

function closeOTPModal() {
  const modal = document.getElementById('otp-verification-modal');
  if (modal) modal.classList.remove('active');
  if (otpTimerInterval) clearInterval(otpTimerInterval);
}

function startOTPTimer() {
  let seconds = 59;
  const timerEl = document.getElementById('otp-timer-count');
  if (otpTimerInterval) clearInterval(otpTimerInterval);

  otpTimerInterval = setInterval(() => {
    if (seconds <= 0) {
      clearInterval(otpTimerInterval);
      if (timerEl) timerEl.textContent = '00:00 (Expired)';
      return;
    }
    seconds--;
    const displaySec = seconds < 10 ? `0${seconds}` : seconds;
    if (timerEl) timerEl.textContent = `00:${displaySec}`;
  }, 1000);
}

function initOTPInputListeners() {
  const inputs = document.querySelectorAll('.otp-digit-input');
  inputs.forEach((input, index) => {
    input.addEventListener('keyup', (e) => {
      if (input.value && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
      if (e.key === 'Backspace' && index > 0 && !input.value) {
        inputs[index - 1].focus();
      }
    });
  });
}

function verifyOTPCode() {
  const inputs = document.querySelectorAll('.otp-digit-input');
  let enteredCode = '';
  inputs.forEach(i => enteredCode += i.value.trim());

  if (enteredCode.length < 6) {
    alert('Please enter all 6 digits of the OTP code.');
    return;
  }

  if (enteredCode === currentOTPCode) {
    if (pendingProfileChanges) {
      currentUserData.name = pendingProfileChanges.name;
      currentUserData.email = pendingProfileChanges.email;
      currentUserData.phone = pendingProfileChanges.phone;
      currentUserData.city = pendingProfileChanges.city;
      currentUserData.gender = pendingProfileChanges.gender;
      currentUserData.dob = pendingProfileChanges.dob;
      currentUserData.avatar = pendingProfileChanges.avatar;

      localStorage.setItem('cinephilic_user', JSON.stringify(currentUserData));
      localStorage.setItem('cinephilic_location', currentUserData.city);
      initUserData();

      if (typeof window.initAuthState === 'function') {
        window.initAuthState();
      }
    }

    closeOTPModal();
    alert('Profile details & location updated successfully!');
  } else {
    alert('Invalid OTP Code. Please enter the demo code shown on screen (' + currentOTPCode + ').');
  }
}

let activePassesGlobal = [];
let memoryPassesGlobal = [];
let cancelledPassesGlobal = [];

/* Category Pass Filters & Rendering */
function renderAllPassCategories() {
  const activeList = document.getElementById('active-passes-list');
  const memoriesList = document.getElementById('memories-passes-list');
  const cancelledList = document.getElementById('cancelled-passes-list');

  let userBookings = [];
  try {
    userBookings = JSON.parse(localStorage.getItem('cinephilic_user_bookings') || '[]');
  } catch(e) {
    userBookings = [];
  }

  activePassesGlobal = userBookings.filter(b => b && !(b.status || '').includes('Cancelled') && !(b.status || '').includes('Completed'));
  cancelledPassesGlobal = userBookings.filter(b => b && (b.status || '').includes('Cancelled'));
  memoryPassesGlobal = userBookings.filter(b => b && (b.status || '').includes('Completed'));

  if (activeList) {
    if (activePassesGlobal.length > 0) {
      activeList.innerHTML = renderPassCardsHTML(activePassesGlobal, true);
    } else {
      activeList.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; background: rgba(255,255,255,0.02); border-radius: 14px; border: 1px dashed rgba(255,255,255,0.1);">
          <h4 style="color: #fff; margin-bottom: 4px;">No Active Passes Yet</h4>
          <p style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 16px;">Explore movies and book your first cinema ticket.</p>
          <a href="movies.html" class="btn btn-primary" style="padding: 8px 18px; border-radius: 20px; font-size: 0.85rem;">Browse Movies</a>
        </div>
      `;
    }
  }

  if (memoriesList) {
    if (memoryPassesGlobal.length > 0) {
      memoriesList.innerHTML = renderPassCardsHTML(memoryPassesGlobal, false);
    } else {
      memoriesList.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; background: rgba(255,255,255,0.02); border-radius: 14px; border: 1px dashed rgba(255,255,255,0.1);">
          <h4 style="color: #fff; margin-bottom: 4px;">No Booking History Yet</h4>
          <p style="color: #94a3b8; font-size: 0.85rem;">Your completed movies and past tickets will appear here.</p>
        </div>
      `;
    }
  }

  if (cancelledList) {
    if (cancelledPassesGlobal.length > 0) {
      cancelledList.innerHTML = renderPassCardsHTML(cancelledPassesGlobal, false);
    } else {
      cancelledList.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; background: rgba(255,255,255,0.02); border-radius: 14px; border: 1px dashed rgba(255,255,255,0.1);">
          <h4 style="color: #fff; margin-bottom: 4px;">No Cancelled Passes</h4>
          <p style="color: #94a3b8; font-size: 0.85rem;">All your active cinema reservations remain confirmed.</p>
        </div>
      `;
    }
  }

  const statTotal = document.getElementById('stat-total-passes');
  const statActive = document.getElementById('stat-active-shows');
  const badgeActive = document.getElementById('badge-count-active');
  const badgeMemories = document.getElementById('badge-count-memories');
  const badgeCancelled = document.getElementById('badge-count-cancelled');

  const totalCount = activePassesGlobal.length + memoryPassesGlobal.length + cancelledPassesGlobal.length;
  if (statTotal) statTotal.textContent = totalCount;
  if (statActive) statActive.textContent = activePassesGlobal.length;
  if (badgeActive) badgeActive.textContent = activePassesGlobal.length;
  if (badgeMemories) badgeMemories.textContent = memoryPassesGlobal.length;
  if (badgeCancelled) badgeCancelled.textContent = cancelledPassesGlobal.length;
}

function renderPassCardsHTML(passes, isCanCancel = false) {
  const fallbackImg = 'attributes/posters/mirzapur.jpg';

  return passes.map((b) => {
    if (!b) return '';
    
    const isCancelled = (b.status || '').includes('Cancelled');
    const movieTitle = b.movie?.title || b.movieTitle || 'Movie Pass';
    const posterPath = b.movie?.poster_path || b.poster || 'attributes/posters/mirzapur.jpg';
    const theatreName = b.theatre || b.theatreName || 'Cinephilic IMAX 4K';
    const showTime = b.showTime || b.time || '10:30 AM';
    const bookingDate = b.bookingDate || b.date || 'Today';
    const seatsList = Array.isArray(b.seats) ? b.seats.join(', ') : (b.seats || 'C9, C10');
    const seatsCount = Array.isArray(b.seats) ? b.seats.length : 2;
    const totalAmount = b.finalAmount || b.totalAmount || b.price || 670;
    const bookingRef = b.bookingRef || b.id || 'CNV-447254';

    return `
      <div class="booking-card">
        <img src="${posterPath}" alt="${movieTitle}" class="booking-card-poster" onerror="this.src='${fallbackImg}'">
        
        <div style="flex: 1; min-width: 240px;">
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 6px; flex-wrap: wrap;">
            <span class="badge badge-gold">REF: ${bookingRef}</span>
            <span class="badge ${isCancelled ? 'badge-secondary' : 'badge-red'}">${b.status || 'Confirmed'}</span>
          </div>
          <h3 class="booking-card-title">${movieTitle}</h3>
          <div class="booking-meta" style="display: flex; flex-direction: column; gap: 4px; font-size: 0.88rem; color: #94a3b8;">
            <span>Cinema: ${theatreName}</span>
            <span>Showtime: <strong style="color: #fff;">${showTime}</strong> (${bookingDate})</span>
            <span>Seats: <strong style="color: var(--dash-accent-red);">${seatsList}</strong> (${seatsCount} Tickets)</span>
            <span>Total Paid: <strong style="color: var(--dash-accent-gold);">₹${totalAmount}</strong></span>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${isCanCancel ? `
            <button onclick="viewEPassConfirmation('${bookingRef}')" class="btn btn-secondary" style="padding: 10px 18px; font-size: 0.85rem; border-radius: 12px; font-weight: 700;">
              View E-Ticket
            </button>
            ${!isCancelled ? `
              <button onclick="cancelUserPass('${bookingRef}')" class="btn btn-outline" style="color: var(--dash-accent-red); border-color: rgba(255,42,95,0.35); padding: 10px 18px; font-size: 0.85rem; border-radius: 12px; font-weight: 700;">
                Cancel Pass
              </button>
            ` : ''}
          ` : `
            <button onclick="viewPastBookingDetails('${bookingRef}')" class="btn btn-outline" style="padding: 10px 18px; font-size: 0.85rem; border-radius: 12px; font-weight: 700; color: #cbd5e1; border-color: rgba(255,255,255,0.25);">
              View Booking Details
            </button>
          `}
        </div>
      </div>
    `;
  }).join('');
}

function viewEPassConfirmation(refCode) {
  const allPasses = [...activePassesGlobal, ...memoryPassesGlobal, ...cancelledPassesGlobal];
  let targetTicket = allPasses.find(b => b.bookingRef === refCode || b.id === refCode);

  if (!targetTicket) return;

  const user = currentUserData || JSON.parse(localStorage.getItem('cinephilic_user') || '{}');
  targetTicket.userName = user.name || 'User';
  targetTicket.userEmail = user.email || '';
  targetTicket.userPhone = user.phone || '';

  localStorage.setItem('cinephilic_last_confirmed', JSON.stringify(targetTicket));
  window.location.href = 'confirmation.html';
}

function viewPastBookingDetails(refCode) {
  const allPasses = [...memoryPassesGlobal, ...cancelledPassesGlobal, ...activePassesGlobal];
  let found = allPasses.find(b => b.bookingRef === refCode || b.id === refCode);

  if (!found) return;

  const user = currentUserData || JSON.parse(localStorage.getItem('cinephilic_user') || '{}');

  const modal = document.getElementById('past-details-modal');
  if (!modal) return;

  const titleEl = document.getElementById('past-modal-title');
  const posterEl = document.getElementById('past-modal-poster');
  const badgeEl = document.getElementById('past-modal-status-badge');
  const refEl = document.getElementById('past-modal-ref');
  const userEl = document.getElementById('past-modal-username');
  const emailEl = document.getElementById('past-modal-email');
  const phoneEl = document.getElementById('past-modal-phone');
  const theatreEl = document.getElementById('past-modal-theatre');
  const timeEl = document.getElementById('past-modal-time');
  const seatsEl = document.getElementById('past-modal-seats');
  const amountEl = document.getElementById('past-modal-amount');

  if (titleEl) titleEl.textContent = found.movie?.title || found.movieTitle || 'Movie Pass';
  if (posterEl) posterEl.src = found.movie?.poster_path || found.poster || 'attributes/posters/mirzapur.jpg';
  if (badgeEl) badgeEl.textContent = (found.status || 'Completed').toUpperCase();
  if (refEl) refEl.textContent = found.bookingRef || refCode;
  if (userEl) userEl.textContent = user.name || 'User';
  if (emailEl) emailEl.textContent = user.email || '';
  if (phoneEl) phoneEl.textContent = user.phone || '';
  if (theatreEl) theatreEl.textContent = found.theatre || 'Cinephilic Cinema';
  if (timeEl) timeEl.textContent = `${found.showTime || '10:30 AM'} (${found.bookingDate || 'Today'})`;
  if (seatsEl) seatsEl.textContent = Array.isArray(found.seats) ? found.seats.join(', ') : (found.seats || '');
  if (amountEl) amountEl.textContent = `₹${found.finalAmount || found.totalAmount || 0} (Paid)`;

  modal.style.display = 'flex';
}

function closePastDetailsModal() {
  const modal = document.getElementById('past-details-modal');
  if (modal) modal.style.display = 'none';
}

function cancelUserPass(refCode) {
  let userBookings = [];
  try {
    userBookings = JSON.parse(localStorage.getItem('cinephilic_user_bookings') || '[]');
  } catch(e) {
    userBookings = [];
  }

  let found = false;
  let targetAmount = 0;
  let targetMovie = 'Movie Pass';

  userBookings = userBookings.map(b => {
    if (b && (b.bookingRef === refCode || b.id === refCode)) {
      found = true;
      targetAmount = b.finalAmount || b.totalAmount || b.price || 0;
      targetMovie = b.movie?.title || b.movieTitle || 'Movie Pass';
      return { ...b, status: 'Cancelled (Refunded)' };
    }
    return b;
  });

  if (found) {
    localStorage.setItem('cinephilic_user_bookings', JSON.stringify(userBookings));
  }

  // Update stats on user object if present
  const user = JSON.parse(localStorage.getItem('cinephilic_user') || 'null');
  if (user && user.stats) {
    user.stats.activeShows = Math.max(0, (user.stats.activeShows || 1) - 1);
    localStorage.setItem('cinephilic_user', JSON.stringify(user));
  }

  // Refresh pass tabs and counters
  renderAllPassCategories();

  // Show the refund initiated modal popup
  openCancelRefundModal(refCode, targetMovie, targetAmount);
}

function openCancelRefundModal(refCode, movieTitle, amount) {
  const modal = document.getElementById('cancel-refund-modal');
  if (!modal) return;

  const refEl = document.getElementById('cancel-modal-ref');
  const movieEl = document.getElementById('cancel-modal-movie');
  const amountEl = document.getElementById('cancel-modal-amount');

  if (refEl) refEl.textContent = refCode || 'CNV-447254';
  if (movieEl) movieEl.textContent = movieTitle || 'Movie Pass';
  if (amountEl) amountEl.textContent = `₹${amount || 670}`;

  modal.classList.add('active');
}

function closeCancelRefundModal() {
  const modal = document.getElementById('cancel-refund-modal');
  if (modal) modal.classList.remove('active');
}

// Global Exports
window.handleProfileSubmit = handleProfileSubmit;
window.closeOTPModal = closeOTPModal;
window.verifyOTPCode = verifyOTPCode;
window.viewEPassConfirmation = viewEPassConfirmation;
window.viewPastBookingDetails = viewPastBookingDetails;
window.closePastDetailsModal = closePastDetailsModal;
window.cancelUserPass = cancelUserPass;
window.openCancelRefundModal = openCancelRefundModal;
window.closeCancelRefundModal = closeCancelRefundModal;
window.selectAvatarChoice = selectAvatarChoice;
window.handleCustomAvatarUpload = handleCustomAvatarUpload;
window.switchTabToSecurity = switchTabToSecurity;
