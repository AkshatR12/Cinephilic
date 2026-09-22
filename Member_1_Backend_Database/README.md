# 👤 Member 1: Backend Architecture & Database Engineer

## 🎯 Role Overview
You are responsible for the server-side architecture, MySQL relational database management, data validation, user authentication endpoints, and booking transaction persistence.

---

## 📂 Assigned Files & Directory
```
Member_1_Backend_Database/
└── backend/
    ├── server.js         # Express REST API (Auth & Bookings)
    ├── db.js             # MySQL Connection Pool & queries
    ├── schema.sql        # Database schema, table structures & seed data
    └── package.json      # Dependencies (express, mysql2, bcryptjs, cors, etc.)
```

---

## 📋 Detailed Responsibilities & Tasks

### 1. Database Setup & Management (`backend/schema.sql`)
- Maintain and update the `cinephilic_db` schema.
- Define relational structures for `users`, `movies`, `bookings`, and `seat_reservations`.
- Ensure appropriate primary keys, foreign keys, timestamps, and indexes.

### 2. User Authentication APIs (`backend/server.js`)
- `POST /api/auth/register`: Handle registration with password hashing (`bcryptjs`).
- `POST /api/auth/login`: Validate credentials and return authenticated user session/tokens.

### 3. Booking & Transaction APIs (`backend/server.js`)
- `POST /api/bookings`: Create new booking records with movie, theatre, showtime, seat array, and total amount.
- `GET /api/bookings/user/:userId`: Fetch active and past bookings for a specific user.
- `POST /api/bookings/cancel/:bookingId`: Cancel a booking and mark status as cancelled / refunded.

### 4. Stability, Security & Fallback (`backend/db.js`)
- Secure credentials, sanitize inputs to prevent SQL injection.
- Ensure graceful error responses if MySQL is temporarily unreachable.

---

## 🚀 How to Run Backend
1. **Import Database Schema into MySQL**:
   ```sql
   source backend/schema.sql;
   ```
2. **Install & Start Server**:
   ```bash
   cd backend
   npm install
   node server.js
   ```
3. The API will be active at `http://localhost:5000/api`.
