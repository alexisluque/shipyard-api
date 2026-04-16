import { loginDao, registerDao } from './auth.dao.js';
import type { Request, Response } from 'express';
import { UserDto } from './auth.dto.js';

export async function register(req: Request, res: Response) {
  const user = req.body;

  const newUser = await registerDao(user);

  const { id, email, created_at, updated_at } = newUser;

  const userDto = new UserDto(id, email, created_at, updated_at);

  res.status(201).json(userDto);
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const accessToken = await loginDao({ email, password });

  return res.status(200).json({ accessToken });
}
