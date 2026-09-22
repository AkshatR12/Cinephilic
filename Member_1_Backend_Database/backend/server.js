/* Cinephilic - Node.js Express & MySQL Backend Server (backend/server.js) */
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health / Status Check
app.get('/api/health', async (req, res) => {
  try {
    if (db) {
      const [rows] = await db.query('SELECT 1 + 1 AS solution');
      return res.json({ status: 'ok', mysql_connected: true, message: 'Cinephilic Backend & MySQL Online' });
    }
    return res.json({ status: 'ok', mysql_connected: false, message: 'DB pool not initialized' });
  } catch (err) {
    return res.status(200).json({ status: 'warning', mysql_connected: false, error: err.message });
  }
});

// 1. User Registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
    }

    if (!db) {
      return res.status(500).json({ success: false, message: 'Database connection is not available.' });
    }

    // Check if email already exists
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    const [result] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name.trim(), email.trim().toLowerCase(), hashedPassword]
    );

    const user = {
      id: result.insertId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      joined: new Date().toLocaleDateString()
    };

    return res.status(201).json({
      success: true,
      message: 'Account registered successfully!',
      user
    });
  } catch (err) {
    console.error('[Register Error]:', err);
    return res.status(500).json({ success: false, message: 'Database error occurred: ' + err.message });
  }
});

// 2. User Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    if (!db) {
      return res.status(500).json({ success: false, message: 'Database connection is not available.' });
    }

    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email.trim().toLowerCase()]);
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const userRecord = rows[0];
    const isMatch = await bcrypt.compare(password, userRecord.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const user = {
      id: userRecord.id,
      name: userRecord.name,
      email: userRecord.email,
      role: userRecord.role || 'user',
      joined: new Date(userRecord.created_at).toLocaleDateString()
    };

    return res.json({
      success: true,
      message: 'Signed in successfully!',
      user
    });
  } catch (err) {
    console.error('[Login Error]:', err);
    return res.status(500).json({ success: false, message: 'Database error occurred: ' + err.message });
  }
});

// 3. Save Confirmed Booking
app.post('/api/bookings', async (req, res) => {
  try {
    const { bookingRef, userId, userEmail, movieTitle, theatreName, showTime, showDate, seats, totalAmount, paymentMethod } = req.body;

    if (!bookingRef || !movieTitle || !seats) {
      return res.status(400).json({ success: false, message: 'Incomplete booking details.' });
    }

    if (!db) {
      return res.status(500).json({ success: false, message: 'Database unavailable' });
    }

    const seatString = Array.isArray(seats) ? seats.join(', ') : String(seats);
    const count = Array.isArray(seats) ? seats.length : 1;

    const [result] = await db.query(
      `INSERT INTO bookings 
        (booking_ref, user_id, user_email, movie_title, theatre_name, show_time, show_date, seats, ticket_count, total_amount, payment_method, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Confirmed')`,
      [
        bookingRef,
        userId || null,
        userEmail || 'guest@cinephilic.com',
        movieTitle,
        theatreName || 'Cinephilic IMAX',
        showTime,
        showDate || new Date().toLocaleDateString(),
        seatString,
        count,
        totalAmount,
        paymentMethod || 'Card'
      ]
    );

    return res.status(201).json({
      success: true,
      message: 'Booking stored successfully in MySQL',
      bookingId: result.insertId
    });
  } catch (err) {
    console.error('[Booking Save Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to record booking in MySQL: ' + err.message });
  }
});

// 4. Get User Bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email || !db) {
      return res.json({ success: true, bookings: [] });
    }

    const [rows] = await db.query(
      'SELECT * FROM bookings WHERE user_email = ? ORDER BY created_at DESC',
      [email.toLowerCase()]
    );

    return res.json({ success: true, bookings: rows });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(` Cinephilic Backend running on port ${PORT}`);
  console.log(` API Endpoint: http://localhost:${PORT}/api`);
  console.log(`=========================================`);
});
