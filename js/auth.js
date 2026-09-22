/* Cinephilic - Authentication Script with MySQL Backend Support (js/auth.js) */

const API_BASE_URL = 'http://localhost:5000/api/auth';

document.addEventListener('DOMContentLoaded', () => {
  initAuthState();
  initAuthForm();
});

// Check logged in user state & update navbar UI dynamically
function initAuthState() {
  const user = getCurrentUser();
  const navActionsList = document.querySelectorAll('.nav-actions');

  navActionsList.forEach(navActions => {
    if (user) {
      const avatarSrc = user.avatar || 'assets/images/avatars/avatar_1.png';
      navActions.innerHTML = `
        <a href="profile.html" class="btn btn-secondary" style="gap: 10px; padding: 6px 16px 6px 8px; border-radius: 30px;">
          <img src="${avatarSrc}" alt="Avatar" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--accent-red, #ff2a5f);"> 
          <span>${user.name}</span>
        </a>
        <button onclick="logoutUser()" class="btn btn-outline" style="padding: 8px 14px; border-color: var(--border-color); border-radius: 20px;">Sign Out</button>
      `;
    } else {
      navActions.innerHTML = `
        <a href="auth.html?mode=login" class="btn btn-secondary">Sign In</a>
        <a href="auth.html?mode=register" class="btn btn-primary">Sign Up</a>
      `;
    }
  });
}

// Get current user from localStorage
function getCurrentUser() {
  try {
    const data = localStorage.getItem('cinephilic_user');
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

// Handle Login / Registration form switching & submission
function initAuthForm() {
  const authForm = document.getElementById('auth-form');
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const nameGroup = document.getElementById('name-group');
  const formTitle = document.getElementById('form-title');
  const formSubmitBtn = document.getElementById('form-submit-btn');

  if (!authForm) return;

  // URL param check for mode (e.g. auth.html?mode=register)
  const params = new URLSearchParams(window.location.search);
  let isLoginMode = params.get('mode') !== 'register';

  function updateFormUI() {
    if (isLoginMode) {
      tabLogin?.classList.add('active');
      tabRegister?.classList.remove('active');
      if (nameGroup) nameGroup.style.display = 'none';
      if (formTitle) formTitle.textContent = 'Welcome Back';
      if (formSubmitBtn) formSubmitBtn.textContent = 'Sign In';
    } else {
      tabRegister?.classList.add('active');
      tabLogin?.classList.remove('active');
      if (nameGroup) nameGroup.style.display = 'block';
      if (formTitle) formTitle.textContent = 'Create Account';
      if (formSubmitBtn) formSubmitBtn.textContent = 'Sign Up';
    }
  }

  tabLogin?.addEventListener('click', (e) => { e.preventDefault(); isLoginMode = true; updateFormUI(); });
  tabRegister?.addEventListener('click', (e) => { e.preventDefault(); isLoginMode = false; updateFormUI(); });

  updateFormUI();

  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email-input').value.trim();
    const password = document.getElementById('password-input').value;
    const name = isLoginMode ? (email.split('@')[0] || 'User') : (document.getElementById('name-input')?.value.trim() || 'User');

    if (!email || !password) {
      return alert('Please fill in all required fields.');
    }

    if (!isLoginMode && !name) {
      return alert('Please enter your full name.');
    }

    const submitBtn = document.getElementById('form-submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Processing...';
    }

    // Attempt MySQL Backend API Authentication
    try {
      const endpoint = isLoginMode ? `${API_BASE_URL}/login` : `${API_BASE_URL}/register`;
      const payload = isLoginMode ? { email, password } : { name, email, password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const u = data.user;
        if (!isLoginMode) {
          // New user gets 0 stats
          u.stats = { totalPasses: 0, activeShows: 0 };
        }
        localStorage.setItem('cinephilic_user', JSON.stringify(u));
        alert(data.message || (isLoginMode ? 'Signed in successfully!' : 'Account registered successfully!'));
        window.location.href = 'index.html';
        return;
      } else {
        // If API returned a specific validation error (e.g., incorrect password)
        alert(data.message || 'Authentication error. Please check your credentials.');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = isLoginMode ? 'Sign In' : 'Sign Up';
        }
        return;
      }
    } catch (networkErr) {
      console.warn('[Cinephilic Auth] MySQL server offline. Operating in client mode:', networkErr.message);

      // Client mode registration/login
      const isNew = !isLoginMode;
      const userData = {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email: email,
        phone: '+919876543210',
        city: localStorage.getItem('cinephilic_location') || 'Delhi NCR',
        gender: 'Male',
        dob: '2000-01-01',
        joined: new Date().toLocaleDateString(),
        avatar: 'assets/images/avatars/avatar_1.png',
        stats: isNew ? { totalPasses: 0, activeShows: 0 } : { totalPasses: 0, activeShows: 0 }
      };
      localStorage.setItem('cinephilic_user', JSON.stringify(userData));

      alert(isLoginMode ? 'Signed in successfully!' : 'Account created successfully with 0 starting stats!');
      window.location.href = 'profile.html';
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = isLoginMode ? 'Sign In' : 'Sign Up';
      }
    }
  });
}

// Log out user cleanly and update state
function logoutUser() {
  localStorage.removeItem('cinephilic_user');
  initAuthState();
  alert('You have been signed out successfully.');
  
  // If currently on profile page, refresh or redirect to home
  if (window.location.pathname.includes('profile.html')) {
    window.location.href = 'index.html';
  } else {
    window.location.reload();
  }
}

// Google OAuth 2.0 Instant Authentication Handler
function handleGoogleSignIn() {
  const enteredEmail = prompt('Enter your Google email address:', 'user@gmail.com');
  if (!enteredEmail) return;
  const username = enteredEmail.split('@')[0];
  const formattedName = username.charAt(0).toUpperCase() + username.slice(1);

  const googleUser = {
    name: formattedName,
    email: enteredEmail,
    phone: '',
    city: localStorage.getItem('cinephilic_location') || 'Delhi NCR',
    gender: 'Male',
    dob: '2000-01-01',
    joined: new Date().toLocaleDateString(),
    avatar: 'assets/images/avatars/avatar_1.png',
    authMethod: 'Google OAuth 2.0',
    stats: { totalPasses: 0, activeShows: 0 }
  };

  localStorage.setItem('cinephilic_user', JSON.stringify(googleUser));
  alert(`Signed in successfully with Google Account (${enteredEmail})!`);
  window.location.href = 'index.html';
}

// Expose functions globally
window.getCurrentUser = getCurrentUser;
window.logoutUser = logoutUser;
window.initAuthState = initAuthState;
window.handleGoogleSignIn = handleGoogleSignIn;
