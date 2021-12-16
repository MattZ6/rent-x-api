import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

import auth from '@config/auth';

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

  request.user_id = userId;

  next();
}
