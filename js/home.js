/* Cinephilic - Homepage Script & Interactive Fake Booking (js/home.js) */

let allHomeMovies = [];

document.addEventListener('DOMContentLoaded', async () => {
  allHomeMovies = await MovieService.getAllMovies();
  if (allHomeMovies && allHomeMovies.length > 0) {
    initHeroBannerSlider(allHomeMovies);
    initHomeCategoryTabs();
    renderNowShowingCards(allHomeMovies);
  }
});

function initHomeCategoryTabs() {
  const tabs = document.querySelectorAll('.home-cat-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active', 'btn-secondary');
        t.classList.add('btn-outline');
      });
      tab.classList.add('active', 'btn-secondary');
      tab.classList.remove('btn-outline');

      const selectedCategory = tab.getAttribute('data-category');
      renderNowShowingCards(allHomeMovies, selectedCategory);
    });
  });
}

// Render Now Showing Grid matching mockup cards
function renderNowShowingCards(movies, categoryFilter = 'all') {
  const container = document.getElementById('now-showing-grid');
  if (!container) return;

  let filtered = movies.filter(m => m.status === 'now_showing');
  if (categoryFilter !== 'all') {
    filtered = filtered.filter(m => m.category === categoryFilter);
  }

  container.innerHTML = filtered.map(m => `
    <div class="movie-card">
      <div class="poster-wrapper">
        <span class="badge badge-tag">${m.category ? m.category.toUpperCase() : 'NOW SHOWING'}</span>
        <span class="movie-rating-pill">★ ${m.rating}</span>
        <img src="${m.poster_path}" alt="${m.title}" class="poster-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500'">
      </div>
      <div class="card-details">
        <div class="card-genres">${m.genre ? m.genre.join(', ') : 'Cinema'} • ${m.language || 'Hindi'}</div>
        <h3 class="card-title">${m.title}</h3>
        <a class="btn btn-dark card-action-btn" href="movie-details.html?id=${m.id}" style="text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center;">
          More Details
        </a>
      </div>
    </div>
  `).join('');
}
function initHeroBannerSlider(movies) {
  const track = document.getElementById('banner-slider-track');
  const dotsContainer = document.getElementById('banner-dots-container');
  const prevBtn = document.getElementById('banner-prev-btn');
  const nextBtn = document.getElementById('banner-next-btn');
  const container = document.querySelector('.banner-slider-container');

  if (!track || !movies || movies.length === 0) return;

  // Filter movies with banners (select top featured movies)
  const featuredMovies = movies.filter(m => m.banner_path).slice(0, 8);
  if (featuredMovies.length === 0) return;

  // Render Slides
  track.innerHTML = featuredMovies.map(m => `
    <a href="movie-details.html?id=${m.id}" class="banner-slide" title="View details for ${m.title}">
      <img src="${m.banner_path}" alt="${m.title}" class="banner-slide-bg" onerror="this.src='https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200'">
      <div class="banner-slide-overlay"></div>
      <div class="banner-slide-content">
        <div class="banner-badge-row">
          <span class="banner-tag">${m.status === 'coming_soon' ? 'Coming Soon' : 'Now Showing'}</span>
          <span class="banner-rating-pill">★ ${m.rating} / 10</span>
          <span class="banner-lang-badge">${m.language}</span>
        </div>
        <h1 class="banner-title">${m.title}</h1>
        <p class="banner-tagline">"${m.tagline}"</p>
        <div class="banner-cta-btn">
          <span>More Details</span>
          <span style="font-size: 1.1rem; line-height: 1;">→</span>
        </div>
      </div>
    </a>
  `).join('');

  // Render Dots
  if (dotsContainer) {
    dotsContainer.innerHTML = featuredMovies.map((_, idx) => `
      <button class="banner-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="Slide ${idx + 1}"></button>
    `).join('');
  }

  let currentIndex = 0;
  const totalSlides = featuredMovies.length;
  let autoSlideTimer = null;

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.banner-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoSlideTimer = setInterval(nextSlide, 4500);
  }

  function stopAutoPlay() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  // Event Listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
      startAutoPlay();
    });
  }

  if (dotsContainer) {
    dotsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('banner-dot')) {
        e.stopPropagation();
        const idx = parseInt(e.target.getAttribute('data-index'), 10);
        if (!isNaN(idx)) {
          currentIndex = idx;
          updateSlider();
          startAutoPlay();
        }
      }
    });
  }

  // Pause on hover
  if (container) {
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);
  }

  // Touch Swipe Support for Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 40) {
      nextSlide();
      startAutoPlay();
    } else if (touchEndX - touchStartX > 40) {
      prevSlide();
      startAutoPlay();
    }
  }, { passive: true });

  // Initial AutoPlay start
  startAutoPlay();
}
