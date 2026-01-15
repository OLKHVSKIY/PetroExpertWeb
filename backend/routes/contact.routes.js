import express from 'express';
import { sendContactForm, requestCallback } from '../controllers/contact.controller.js';

const router = express.Router();

router.post('/form', sendContactForm);
router.post('/callback', requestCallback);

export default router;
