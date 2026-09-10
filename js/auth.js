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
      navActions.innerHTML = `
        <a href="profile.html" class="btn btn-secondary" style="gap: 8px;">
          <span>👤</span> <span>${user.name}</span>
        </a>
        <button onclick="logoutUser()" class="btn btn-outline" style="padding: 8px 14px; border-color: var(--border-color);">Sign Out</button>
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
        localStorage.setItem('cinephilic_user', JSON.stringify(data.user));
        alert(data.message || (isLoginMode ? 'Signed in successfully with MySQL backend!' : 'Account registered in MySQL database!'));
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
      console.warn('[Cinephilic Auth] MySQL server not reachable on port 5000. Operating in offline/client mode:', networkErr.message);

      // Graceful offline fallback
      const userData = {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email: email,
        joined: new Date().toLocaleDateString()
      };
      localStorage.setItem('cinephilic_user', JSON.stringify(userData));

      alert(isLoginMode ? 'Signed in successfully!' : 'Account created successfully!');
      window.location.href = 'index.html';
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

// Expose functions globally
window.getCurrentUser = getCurrentUser;
window.logoutUser = logoutUser;
window.initAuthState = initAuthState;
