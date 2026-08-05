# Cinephilic – A Modern, Interactive Movie Ticketing Platform

Cinephilic is a client-side movie ticket booking web app designed to provide a fast, immersive, and visually stunning experience — without requiring a complex backend setup. Everything runs seamlessly in your browser with real-time UI interactions, smooth micro-animations, and dynamic seat reservation logic.

Cinephilic ships as two connected experiences:
1. An immersive, hero-driven landing page that showcases trending movies, trailers, and event highlights with scroll-driven animations.
2. A fully interactive booking & authentication portal (accessible via "Book Tickets" / "Sign In"), featuring dynamic seat selection, instant price calculations, and local user sessions built with vanilla JavaScript (no page reloads).

---

## Features

* **Cinematic Hero Page** – Engaging hero banner featuring animated action buttons, glowing badges, and smooth entrance reveals.
* **Dynamic Movie Catalog** – Interactive movie grid displaying genre tags, duration, ratings, and instant booking overlays.
* **Interactive Seat Selection** – Visual theater screen layout allowing users to select/deselect seats with dynamic total price computation.
* **Glassmorphism Auth Suite** – Sleek, modern Login and Registration forms with smooth tab toggles and form validation.
* **LocalStorage Persistence** – Your booked tickets, user profiles, and active sessions stay saved across page refreshes.
* **Fully Responsive** – Optimized and tested across desktop, tablet, and mobile viewport sizes.
* **Micro-Animations & Feedback** – Instant UI feedback on button hover, form submit, and scroll triggers for an exciting visual feel.

---

## Technology Used

* **HTML5** – Semantic layout structuring
* **CSS3** – Custom properties (design tokens), Grid/Flexbox, dynamic animations & glassmorphism backdrop filters
* **Vanilla JavaScript (ES6+)** – DOM manipulation, event handling, dynamic UI rendering (no frameworks, no build tools)
* **Browser LocalStorage** – Client-side persistence layer for sessions and ticket bookings
* **FontAwesome Icons** – Vector icons for sleek navigation and action prompts

> **Note:** No React, Vue, Angular, jQuery, Bootstrap, Tailwind, backend, or external database is used anywhere in this project.

---

## How to Run the Project

No installation and no build step required.
1. Download / clone the project folder.
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).
3. That's it – the whole app runs client-side.

---

## How LocalStorage Works in Cinephilic

Cinephilic stores your bookings and session data under key LocalStorage entries:

### `cinephilicBookings`
The value is a JSON array of booking objects, for example:

```json
[
  {
    "bookingId": "CIN-892301",
    "movieTitle": "Cyberpunk 2099",
    "seats": ["A3", "A4"],
    "totalAmount": 500,
    "bookingDate": "2026-08-05"
  }
]
