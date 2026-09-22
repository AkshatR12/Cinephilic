# Cinephilic – Movie Ticketing & Discovery Platform

**Cinephilic** is a movie ticket booking platform built with HTML5, CSS3, Vanilla JavaScript, and a Node.js Express + MySQL backend.

---

## Key Features

1. **Self-Contained Movie Catalog**
   - High-resolution posters and cinema backdrops.
   - Multilingual catalog (English, Hindi, and more).
   - Filter by genre, language, status (*Now Showing* vs *Coming Soon*), and sort by rating/title/price.
   - Expanded, immersive movie descriptions with lead director and format details.

2. **Cast & Crew with Real Photos**
   - Detailed movie information pages displaying starring cast photos, actor names, and character roles.
   - Embedded official YouTube trailer modals.

3. **Seamless Multi-Step Booking Funnel**
   - **Step 1: Theatres**: Select cinema format (IMAX 4K, 4DX, Dolby Atmos, Royal Cinema).
   - **Step 2: Showtimes**: Pick dates and screening time slots.
   - **Step 3: Seats**: Interactive real-time seating map with dynamic price calculations.
   - **Step 4: Checkout**: Choose payment method (Credit/Debit Card, UPI, Netbanking) and apply promo discounts (e.g. `CINE50`).
   - **Step 5: Confirmation & QR E-Ticket**: Instant gate-scannable QR Code generation with printable E-Ticket.

4. **MySQL Authentication & Booking Backend**
   - User Registration & Login with `bcryptjs` password hashing.
   - MySQL database persistence for users and booked tickets (`cinephilic_db`).
   - Automatic graceful fallback to local session if MySQL server is offline.

5. **User Profile & Booking History**
   - View all confirmed bookings with QR codes and detailed seat metadata.
   - 1-click ticket cancellation with instant refund processing.

6. **Information & Help Center**
   - Dedicated `info.html` page with interactive FAQ accordion, cinema format specifications, booking guide, and customer support desk.

---

## Project Structure

```
Cinephilic/
├── backend/
│   ├── db.js             # MySQL connection pool configuration
│   ├── server.js         # Express REST API (Auth & Bookings)
│   ├── schema.sql        # MySQL Database schema & seed data
│   └── package.json      # Backend dependencies
├── css/
│   ├── style.css         # Master design system & tokens
│   ├── home.css          # Homepage & grid styling
│   ├── details.css       # Movie details & cast avatars
│   ├── booking.css       # Theatres, showtimes & seat selection
│   ├── checkout.css      # Checkout cards & printable E-Ticket
│   └── profile.css       # User profile & booking history
├── js/
│   ├── movies-data.js    # Curated movie catalog & MovieService
│   ├── auth.js           # MySQL auth integration & dynamic navbar state
│   ├── home.js           # Hero & homepage movie rendering
│   ├── movies.js         # Catalog filtering & language matching
│   ├── details.js        # Cast rendering & trailer modal
│   ├── theatres.js       # Multiplex selection
│   ├── shows.js          # Date tabs & showtime slots
│   ├── seats.js          # Interactive seating grid
│   ├── checkout.js       # Payment radios, promo codes & MySQL sync
│   └── profile.js        # Profile rendering & QR ticket history
├── index.html            # Homepage
├── movies.html           # Discover Movies Catalog
├── movie-details.html    # Movie Info & Cast
├── theatres.html         # Select Cinema
├── shows.html            # Select Showtime
├── seats.html            # Seating Grid
├── checkout.html         # Payment & Promo
├── confirmation.html     # E-Ticket & Dynamic QR Code
├── info.html             # Help Center & FAQs
├── auth.html             # Login & Register
└── profile.html          # My Bookings & Profile
```

---

## How to Set Up and Run

### 1. MySQL Database Setup
1. Open your MySQL client (e.g. **phpMyAdmin**, **MySQL Workbench**, or MySQL CLI).
2. Import / Run the SQL script from `backend/schema.sql`:
   ```sql
   source backend/schema.sql;
   ```
   This will create the `cinephilic_db` database, `users`, `movies`, and `bookings` tables.

### 2. Run the Node.js Backend Server
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   npm install
   node server.js
   ```
2. The server will start on `http://localhost:5000/api`.

### 3. Open the Frontend Application
Simply open `index.html` in any web browser, or serve it with VS Code Live Server / any HTTP server.
