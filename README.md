# 👤 Member 4: Checkout, Auth, Profile & E-Ticket Specialist

## 🎯 Role Overview
You are responsible for the transactional and post-booking user journey: user authentication (Login / Registration), dynamic checkout and payment calculation, promo code engine, printable E-Tickets with live QR codes, and the User Profile & Booking History dashboard.

---

## 📂 Assigned Files & Directory
```
Member_4_Checkout_Auth_Profile/
├── auth.html             # Login & Registration page / tabbed modals
├── checkout.html         # Order summary, promo discount, payment methods
├── confirmation.html     # Confirmed booking screen, dynamic QR code & E-ticket
├── profile.html          # User profile info, booking history & ticket cancellation
├── css/
│   ├── style.css         # Shared navbar, buttons, global styling
│   ├── auth.css          # Auth form cards, input floating labels
│   ├── checkout.css      # Checkout breakdown cards & printable ticket styling
│   └── profile.css       # Profile sidebar, booking history cards & modal
└── js/
    ├── auth.js           # Login/Register API client & navbar session state
    ├── checkout.js       # Order calculation, promo coupons (e.g., CINE50), payment simulator
    └── profile.js        # Profile data render, booking cards & 1-click cancellation
```

---

## 📋 Detailed Responsibilities & Tasks

### 1. Authentication UI & Session Management (`auth.html`, `js/auth.js`, `css/auth.css`)
- Login and Register form handling with validation.
- Connect to Member 1's backend API (`/api/auth/login`, `/api/auth/register`).
- Manage user session token in `localStorage`.
- Update global navbar in real time (display avatar / username when logged in, "Sign In" button when logged out).

### 2. Checkout & Promo Engine (`checkout.html`, `js/checkout.js`, `css/checkout.css`)
- Render comprehensive order breakdown:
  - Base ticket price $\times$ seat count
  - Convenience fees + GST (18%)
  - Promo code discounts (e.g. `CINE50` for 50% discount).
- Payment method selector: Credit/Debit Card, UPI (Google Pay, PhonePe), Netbanking.
- Save confirmed booking to backend (`/api/bookings`) or local storage fallback.

### 3. Confirmation & QR E-Ticket (`confirmation.html`, `css/checkout.css`)
- Instant dynamic QR Code generation containing booking reference and seat metadata.
- Downloadable / printable E-Ticket layout.

### 4. User Profile & Cancellation (`profile.html`, `js/profile.js`, `css/profile.css`)
- Display user account information.
- Render active and past booking cards with movie poster, showtime, and seats.
- 1-click ticket cancellation with instant refund calculation and status update.
