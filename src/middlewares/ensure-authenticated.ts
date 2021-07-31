import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

import { UsersRepository } from '../modules/users/repositories/implementations/UsersRepository';

export async function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new Error('Access token must be provided');
  }

  const [, token] = authorization.split(' ');

  let userId: string;

  try {
    const { sub } = verify(
      token,
      '2b246fb4a2e07344cebe1e7d3150e4e0'
    ) as JwtPayload;

    userId = sub;
  } catch (error) {
    throw new Error('Access token expired');
  }

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  next();
}
