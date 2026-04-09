import { loginDao, registerDao } from "./auth.dao.js";
import type { Request, Response } from 'express';

export async function register(req: Request, res: Response) {
  const user = req.body;

  await registerDao(user);

  res.status(201).json({ message: 'User registered successfully' });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  const token = await loginDao({ email, password });

  return res.status(200).json({ token });
}
