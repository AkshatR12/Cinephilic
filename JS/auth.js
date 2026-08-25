/* Cinephilic - Authentication Script (js/auth.js) */
document.addEventListener('DOMContentLoaded', () => {
  initAuthState();
  initAuthForm();
});

// Check logged in user state & update navbar UI
function initAuthState() {
  const user = getCurrentUser();
  const navActions = document.querySelector('.nav-actions');

  if (user && navActions) {
    navActions.innerHTML = `
      <a href="profile.html" class="btn btn-secondary" style="gap: 8px;">
        <span>👤</span> ${user.name}
      </a>
      <button onclick="logoutUser()" class="btn btn-outline" style="padding: 8px 14px;">Sign Out</button>
    `;
  }
}

// Get current user from localStorage
function getCurrentUser() {
  const data = localStorage.getItem('cinephilic_user');
  return data ? JSON.parse(data) : null;
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

  tabLogin?.addEventListener('click', () => { isLoginMode = true; updateFormUI(); });
  tabRegister?.addEventListener('click', () => { isLoginMode = false; updateFormUI(); });

  updateFormUI();

  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email-input').value.trim();
    const name = isLoginMode ? (email.split('@')[0] || 'User') : document.getElementById('name-input').value.trim();

    if (!email) return alert('Please enter a valid email address.');

    const userData = { name: name.charAt(0).toUpperCase() + name.slice(1), email: email, joined: new Date().toLocaleDateString() };
    localStorage.setItem('cinephilic_user', JSON.stringify(userData));

    alert(isLoginMode ? 'Signed in successfully!' : 'Account created successfully!');
    window.location.href = 'index.html';
  });
}

// Log out user
function logoutUser() {
  localStorage.removeItem('cinephilic_user');
  window.location.reload();
}
