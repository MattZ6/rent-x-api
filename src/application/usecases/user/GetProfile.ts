import { UserNotFoundWithProvidedIdError } from '@domain/errors';
import { IGetUserProfileUseCase } from '@domain/usecases/user/GetProfile';

import { IFindUserByIdRepository } from '@application/protocols/repositories/user';

export class GetUserProfileUseCase implements IGetUserProfileUseCase {
  constructor(
    private readonly findUserByIdRepository: IFindUserByIdRepository
  ) {}

  async execute(
    data: IGetUserProfileUseCase.Input
  ): Promise<IGetUserProfileUseCase.Output> {
    const { id: user_id } = data;

    const user = await this.findUserByIdRepository.findById({
      id: user_id,
      include: {
        avatar: true,
      },
    });

    if (!user) {
      throw new UserNotFoundWithProvidedIdError();
    }

    return user;
  }
}
