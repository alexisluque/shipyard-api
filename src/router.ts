import express, { Router } from 'express';

import authRoute from './auth/auth.route.js';
import notesRoute from './notes/notes.route.js';
import { authMiddleware } from './middleware/auth.js';

const router: Router = express.Router();

router.use('/auth', authRoute);
router.use('/notes', authMiddleware, notesRoute);

export default router;
