import { loginDao, registerDao } from "./auth.dao.js";
import type { Request, Response } from 'express';

export async function register(req: Request, res: Response) {
  const user = req.body;

  const newUser = await registerDao(user);

  res.status(201).json(newUser);
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error('Missing email or password');
  }

  const token = await loginDao({ email, password });

  return res.status(200).json({ token });
}
