import { inject, injectable } from 'tsyringe';

import { deleteFile } from '@utils/file.utils';

import { IUsersRepository } from '@modules/users/repositories/IUserRepository';

import { AppError } from '@shared/errors/AppError';

type Request = {
  user_id: string;
  file_name: string;
};

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: Request): Promise<void> {
    const { user_id, file_name } = data;

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.avatar_file_name) {
      await deleteFile(`./temp/avatar/${user.avatar_file_name}`);
    }

    user.avatar_file_name = file_name;

    await this.usersRepository.update(user);
  }
}
