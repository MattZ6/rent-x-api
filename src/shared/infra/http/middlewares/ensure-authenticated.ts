import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

import auth from '@config/auth';

import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

import { AppError } from '@shared/errors/AppError';

export async function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError('Access token must be provided', 401);
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    throw new AppError('Access token must be provided', 401);
  }

  let userId: string;

  try {
    const { sub } = verify(token, auth.JWT_SECRET) as JwtPayload;

    userId = sub;
  } catch (error) {
    throw new AppError('Access token expired', 401);
  }

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(userId);

  if (!user) {
    throw new AppError('Not authorized', 401);
  }

  request.user_id = userId;

  next();
}
