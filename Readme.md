# 🎬 Cinephilic - Movie Ticketing & Discovery Platform

Cinephilic is a lightweight, modern, beginner-friendly web application for movie discovery, theater selection, interactive seat booking, and digital E-ticket generation built with **HTML5**, **Vanilla CSS3**, and **Vanilla JavaScript (ES6)**.

---

## 📁 Project Architecture & Directory Structure

```
cinephilic/
│
├── index.html                 ← Home page (Hero, Featured, Now Showing, Coming Soon)
├── movies.html                ← Movie discovery & live search catalog
├── movie-details.html        ← Movie information, cast, synopsis & trailer modal
├── theatres.html             ← Theatre / Cinema hall selection
├── shows.html                ← Date & showtime slot selection
├── seats.html                ← Interactive seat selection grid & price calculation
├── checkout.html             ← Order overview, promo codes & payment simulation
├── confirmation.html         ← Printable E-ticket display & QR code
├── auth.html                 ← Sign In / Registration forms
├── profile.html              ← User profile & booking history manager
│
├── css/
│   ├── style.css             ← Global design system, reset, variables, navbar & footer
│   ├── home.css              ← Homepage hero banner, genre filter pills & movie grids
│   ├── movies.css            ← Search controls, filter bar & catalog layout
│   ├── details.css           ← Movie hero backdrop, cast cards & trailer modal
│   ├── booking.css           ← Theatre list, showtimes & interactive seating layout
│   ├── checkout.css          ← Order summary, payment options & ticket styles
│   └── profile.css           ← User avatar header & booking ticket history cards
│
├── js/
│   ├── tmdb.js               ← TMDB API helper & offline fallback catalog
│   ├── home.js               ← Homepage hero rendering & genre filter logic
│   ├── movies.js             ← Movie search input, genre/language filter & sorting
│   ├── details.js            ← URL query reader, movie details renderer & trailer player
│   ├── theatres.js           ← Theatre listings & movie context manager
│   ├── shows.js              ← Date picker & showtime slot selector
│   ├── seats.js              ← Seating grid renderer, seat toggle & dynamic pricing
│   ├── checkout.js           ← Promo code handler, order calculation & payment confirmation
│   ├── auth.js               ← LocalStorage user sign-in & session manager
│   └── profile.js            ← User history loader & ticket cancellation handler
│
├── assets/
│   ├── logo.png              ← Application logo branding
│   └── icons/                ← Cinema SVG icons
│
└── README.md                 ← Project documentation
```

---

## ⚡ Key Features

1. **Movie Discovery & Search**: Filter blockbusters by title, genre, language, or rating with dynamic TMDB fallback.
2. **Interactive Seat Booking**: Real-time visual seating layout (Available, Selected, Reserved) with dynamic total price computation.
3. **Checkout & E-Ticket**: Instant discount promo code application (`CINE50`), mock payment options, and printable digital E-tickets with unique booking reference codes.
4. **Local State Persistence**: Seamless session state management using browser `localStorage` for active bookings, current user profile, and user ticket history.
5. **Strict Code Standard**: Every single file (`.html`, `.css`, `.js`, `.md`) strictly adheres to **< 250 Lines of Code (LOC)**, keeping the project ultra beginner-friendly and clean.

---

## 🚀 How to Run the Project

1. Clone or download this project repository.
2. Open `index.html` in any web browser (Google Chrome, Mozilla Firefox, Edge, Safari) or run a local dev server:
   ```bash
   npx serve .
   ```
3. Enjoy exploring Cinephilic!
