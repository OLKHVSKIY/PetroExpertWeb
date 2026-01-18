import express from 'express';
import { chatWithAI } from '../controllers/ai.controller.js';

const router = express.Router();

// AI Chat endpoint
router.post('/chat', chatWithAI);

export default router;
