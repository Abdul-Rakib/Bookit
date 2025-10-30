import express from 'express';
import { getExperiences, getExperienceById } from '../controllers/experience.js';

const router = express.Router();

// GET /api/experiences - Get all experiences with optional filters
router.get("/", getExperiences);

// GET /api/experiences/:id - Get single experience by ID
router.get("/:id", getExperienceById);

export default router;
