import { NextFunction, Request, Response } from 'express';

import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

import { AppError } from '@shared/errors/AppError';

export async function ensureIsAdminUser(
  request: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  const { user_id } = request;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(user_id);

  if (!user?.is_admin) {
    throw new AppError('Access not allowed', 403);
  }

  next();
}
