import express from 'express';
import { validatePromoCode } from '../controllers/booking.js';

const router = express.Router();

// POST /api/promo/validate - Validate promo code
router.post("/validate", validatePromoCode);

export default router;
