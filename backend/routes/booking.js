import express from 'express';
import { createBooking, validatePromoCode, getBookingById, getUserBookings } from '../controllers/booking.js';

const router = express.Router();

// POST /api/bookings - Create a new booking
router.post("/", createBooking);

// GET /api/bookings/:id - Get booking by ID
router.get("/:id", getBookingById);

// GET /api/bookings/user/:userId - Get all bookings for a user
router.get("/user/:userId", getUserBookings);

export default router;
