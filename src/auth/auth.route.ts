import express, { Router } from 'express';
import { login, register } from './auth.controller.js';

const router: Router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
