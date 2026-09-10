# Member 3: Akshat
**Role**: Cinema Ticketing Engine, Multiplex Selection, Showtime Scheduling & Seating Map

---

## Assigned Responsibilities & Deliverables

1. **Theatre & Multiplex Selection (`theatres.html` & `theatres.js`)**:
   - Developed Step 1 of the booking funnel displaying selected movie metadata and nearby cinema formats.
   - Built the multiplex selection list showcasing audio-visual specs (IMAX 3D, Dolby Atmos, 4DX, ScreenX) and distances.
   - Preserved selected movie IDs dynamically across transitions to prevent default movie bugs.

2. **Date & Showtime Scheduler (`shows.html` & `shows.js`)**:
   - Built Step 2 of the booking funnel with dynamic calendar date tabs (Today, Tomorrow, and upcoming days).
   - Created interactive screening slot cards showing formats (2D, IMAX 3D, 4DX) and tiered seat prices.
   - Passed chosen showtime, format, and theatre parameters downstream to the seat reservation module.

3. **Interactive Seating Grid & Booking Bar (`seats.html`, `seats.js` & `css/booking.css`)**:
   - Engineered the interactive cinema screen layout with realistic curved screen visualizer.
   - Built the 60-seat matrix (Rows A–F) with distinct states: Available, Selected, and Occupied/Reserved.
   - Implemented real-time seat selection logic with seat limit validation and multi-seat array tracking.
   - Built the sticky bottom booking bar displaying selected seat list, ticket count, and dynamically calculated subtotal.
   - Serialized active booking sessions to `localStorage.setItem('cinephilic_current_booking')`.

---

## Files in this Module
- `theatres.html` – Multiplex selection page
- `theatres.js` – Cinema list rendering logic
- `shows.html` – Showtime & date selection page
- `shows.js` – Dynamic date tabs and time slot rendering logic
- `seats.html` – Interactive cinema seating layout page
- `seats.js` – Seating matrix and real-time pricing computation logic
- `booking.css` – Seating grid, cinema screen, and booking bar styling
