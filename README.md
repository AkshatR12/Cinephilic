# 🎬 Cinephilic - Movie Ticketing & Discovery Platform

**Cinephilic** is a modern, lightweight, responsive web application for movie discovery, theater selection, interactive seat booking, and digital E-ticket generation. Built entirely with **HTML5**, **Vanilla CSS3**, and **Vanilla JavaScript (ES6+)**, it features seamless integration with **The Movie Database (TMDB) API** alongside a robust offline fallback catalog.

---

## 🌟 Key Features

* **🎬 Movie Discovery & Search**: Explore currently showing and upcoming movies. Filter by title, genre (Action, Sci-Fi, Drama, Comedy, Animation), or language with real-time UI updates.
* **🎥 Rich Movie Details & Trailers**: View comprehensive movie info, ratings, runtimes, cast details, taglines, backdrop images, and embedded video trailers.
* **🏛️ Theatre & Showtime Selection**: Select preferred nearby cinema halls, view amenities (IMAX, 4DX, Dolby Atmos), and pick date & showtime slots.
* **🪑 Interactive Seating Grid**: Visual cinema hall layout with real-time seat selection (Available, Selected, Reserved) and dynamic ticket price calculation.
* **💳 Order Checkout & Promo Codes**: Seamless order review with discount code support (e.g., `CINE50`), tax calculations, and mock payment gateway simulation.
* **🎟️ Digital E-Ticket & Confirmation**: Instant digital ticket generation complete with a unique reference code, seat details, theatre venue, and printable layout.
* **👤 User Profile & Booking History**: Manage user profile details, view active and past ticket bookings, and simulate ticket cancellations.
* **🔐 Local Session Authentication**: Sign In and Registration forms with browser `localStorage` user persistence.
* **⚡ Zero External Framework Dependencies**: Built purely with native web technologies—no frameworks, heavy build tools, or complex setups required.

---

## 📁 Directory & File Architecture

```
Cinephilic/
│
├── index.html                 ← Home page (Hero banner, Genre quick filters, Now Showing)
├── movies.html                ← Live search catalog & full movie directory
├── movie-details.html        ← Detailed movie info, cast list & trailer modal
├── theatres.html             ← Cinema hall & theater selection
├── shows.html                ← Date & showtime slot selection
├── seats.html                ← Interactive seat selection grid & dynamic pricing
├── checkout.html             ← Order summary, promo code application & mock payment
├── confirmation.html         ← Printable E-ticket display & booking confirmation
├── auth.html                 ← User login & registration authentication page
├── profile.html              ← User profile & past ticket booking manager
│
├── CSS/
│   ├── style.css             ← Global design tokens, variables, navbar, footer & utility classes
│   ├── home.css              ← Homepage hero banner & genre filter styling
│   ├── movies.css            ← Search controls, filter bar & movie card grid
│   ├── details.css           ← Movie hero backdrop, cast cards & modal player
│   ├── booking.css           ← Theater list, showtime slots & interactive seat grid
│   ├── checkout.css          ← Order calculation box, payment forms & summary card
│   └── profile.css           ← Profile header avatar & ticket history cards
│
├── JS/
│   ├── tmdb.js               ← TMDB API helper, fetcher & offline fallback catalog
│   ├── home.js               ← Homepage hero slider & genre pill filter controller
│   ├── movies.js             ← Live search input filter & catalog renderer
│   ├── details.js            ← URL query handler, movie info loader & trailer launcher
│   ├── theatres.js           ← Theatre listings & cinema context manager
│   ├── shows.js              ← Showtime slot picker & date selector
│   ├── seats.js              ← Seating layout grid toggle & dynamic price calculator
│   ├── checkout.js           ← Promo code handler, billing calculator & payment trigger
│   ├── auth.js               ← LocalStorage user authentication & session manager
│   └── profile.js            ← Booking history renderer & cancellation handler
│
└── assets/                   ← Image assets, branding logos, and vector icons
```

---

## 💻 Tech Stack

* **Structure**: HTML5 (Semantic tags, accessible forms, responsive layout elements)
* **Styling**: Vanilla CSS3 (Custom properties/CSS variables, Flexbox, Grid, Glassmorphism, animations)
* **Logic**: Vanilla JavaScript ES6+ (Fetch API, DOM manipulation, modular state handling)
* **API Integration**: The Movie Database (TMDB) API + Offline JSON fallback
* **Typography & Icons**: Plus Jakarta Sans (Google Fonts), Custom SVG Vector Icons

---

## 🚀 Getting Started

### Prerequisites
No node packages, build steps, or backend servers are required! Any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari) can run the application directly.

### Running Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AkshatR12/Cinephilic.git
   cd Cinephilic
   ```

2. **Launch the Application**:
   * Double-click `index.html` to open directly in your web browser, OR
   * Use VS Code's **Live Server** extension, OR
   * Serve using a lightweight static HTTP server:
     ```bash
     npx serve .
     ```

---

## 💾 LocalStorage Data Schema

Cinephilic stores application session states cleanly in browser `localStorage`:

* `cinephilic_user`: Active signed-in user object (`{ name, email }`).
* `cinephilic_bookings`: Array of confirmed user ticket objects.
* `cinephilic_draft_booking`: Transient object tracking current booking context (selected movie, theatre, showtime, seats, total price).

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
