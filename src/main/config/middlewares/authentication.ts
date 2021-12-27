import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

export function authenticationMiddleware(
  request: Request,
  _: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new Error('Access token must be provided');
  }

  const token = String(authorization).trim().replace('Bearer ', '');

  if (!token) {
    throw new Error('Access token must be provided');
  }

  let userId: string;

  try {
    const { sub } = verify(token, process.env.JWT_AUTH_SECRET) as JwtPayload;

    userId = sub;
  } catch (error) {
    throw new Error('The access token provided is invalid or has expired');
  }

  request.user_id = userId;

  return next();
}
