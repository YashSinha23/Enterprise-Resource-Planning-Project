import express from 'express';
import { addShift, getAllShifts } from '../controllers/shiftController.js';

const router = express.Router();

// Get all shifts
router.get('/', getAllShifts);

// Add new shift
router.post('/', addShift);

export default router;
