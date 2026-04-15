import express, { Router } from 'express';
import { login, register } from './auth.controller.js';
import { validate } from '../middleware/validation.js';
import { loginSchema } from './auth.schema.js';

const router: Router = express.Router();

router.post('/register', validate(loginSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;
