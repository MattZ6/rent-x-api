import { inject, injectable } from 'tsyringe';

import { UserMap } from '@modules/users/mappers/UserMapper';
import { IUsersRepository } from '@modules/users/repositories/IUserRepository';

import { AppError } from '@shared/errors/AppError';

type Request = {
  user_id: string;
};

@injectable()
export class GetProfileUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: Request) {
    const { user_id } = data;

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return UserMap.toProfileDTO(user);
  }
}
