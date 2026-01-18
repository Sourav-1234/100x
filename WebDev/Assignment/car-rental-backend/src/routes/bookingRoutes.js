const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const bookingController = require('../controllers/bookingController');

// All booking routes require authentication
router.use(authMiddleware);

// POST /bookings - Create booking
router.post('/', bookingController.createBooking);

// GET /bookings - Get bookings (with optional query params)
router.get('/', bookingController.getBookings);

// PUT /bookings/:bookingId - Update booking
router.put('/:bookingId', bookingController.updateBooking);

// DELETE /bookings/:bookingId - Delete booking
router.delete('/:bookingId', bookingController.deleteBooking);

module.exports = router;