import type { Request, Response } from 'express';
import { UserDto } from './auth.dto.js';
import type { AppContext } from '../../app/context.js';
import { createAuthDao } from './auth.dao.js';
import bcrypt from 'bcrypt';
import { UnauthorizedError } from '../../error/error.js';

export const createAuthController = (ctx: AppContext) => {
  const authDao = createAuthDao(ctx.db);

  return {
    register: async (req: Request, res: Response) => {
      const user = req.body;

      const hashedPassword = await bcrypt.hash(user.password, 10);

      const newUser = await authDao.registerDao({
        email: user.email,
        password: hashedPassword,
      });

      const { id, email, created_at, updated_at } = newUser;

      const userDto = new UserDto(id, email, created_at, updated_at);

      res.status(201).json(userDto);
    },
    login: async (req: Request, res: Response) => {
      const { email, password } = req.body;

      const accessToken = await authDao.loginDao({ email, password });

      if (!accessToken) {
        throw new UnauthorizedError('Invalid credentials');
      }

      return res.status(200).json({ accessToken });
    },
  };
};
