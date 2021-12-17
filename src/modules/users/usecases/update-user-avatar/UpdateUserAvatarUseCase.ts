import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUserRepository';

import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import { AppError } from '@shared/errors/AppError';

type Request = {
  user_id: string;
  file_name: string;
};

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute(data: Request): Promise<void> {
    const { user_id, file_name } = data;

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.avatar_file_name) {
      await this.storageProvider.delete({
        folder_name: 'avatar',
        file_name: user.avatar_file_name,
      });
    }

    await this.storageProvider.save({
      file_name,
      folder_name: 'avatar',
    });

    user.avatar_file_name = file_name;

    await this.usersRepository.update(user);
  }
}
