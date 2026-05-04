import { ConflictError, UnauthorizedError } from '../error/error.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { LoginType } from './auth.schema.js';
import { User } from './users.entity.js';
import type { DataSource } from 'typeorm';

const { JWT_SECRET } = process.env;

export const createAuthDao = (db: DataSource) => {
  const userRepository = db.getRepository(User);

  return {
    registerDao: async ({ email, password }: LoginType) => {
      const user = await userRepository.findOne({ where: { email } });

      if (user) {
        throw new ConflictError('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User();

      newUser.email = email;
      newUser.password = hashedPassword;

      return await userRepository.save(newUser);
    },
    loginDao: async ({ email, password }: LoginType) => {
      const user = await userRepository.findOne({ where: { email } });

      if (!user) {
        throw new UnauthorizedError('Invalid credentials');
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw new UnauthorizedError('Invalid credentials');
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET!, {
        expiresIn: '1h',
      });

      return token;
    },
  };
};
