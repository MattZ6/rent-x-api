import { UserNotFoundWithProvidedIdError } from '@domain/errors';
import { IGetUserProfileUseCase } from '@domain/usecases/user/GetUserProfile';

import { IFindUserByIdRepository } from '@application/protocols/repositories/user/FindUserByIdRepository';

export class GetUserProfileUseCase implements IGetUserProfileUseCase {
  constructor(
    private readonly findUserByIdRepository: IFindUserByIdRepository
  ) {}

  async execute(
    data: IGetUserProfileUseCase.Input
  ): Promise<IGetUserProfileUseCase.Output> {
    const { user_id } = data;

    const user = await this.findUserByIdRepository.findById({
      id: user_id,
      relations: ['avatar'],
    });

    if (!user) {
      throw new UserNotFoundWithProvidedIdError();
    }

    return user;
  }
}
