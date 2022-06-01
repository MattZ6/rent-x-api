import { UserNotFoundWithProvidedIdError } from '@domain/errors';
import { IListAllUserRentalsUseCase } from '@domain/usecases/rent/user/ListAll';

import { IFindAllRentsFromUserRepository } from '@application/protocols/repositories/rent';
import { ICheckIfUserExistsByIdRepository } from '@application/protocols/repositories/user';

export class ListAllUserRentalsUseCase implements IListAllUserRentalsUseCase {
  constructor(
    private readonly checkIfUserExistsByIdRepository: ICheckIfUserExistsByIdRepository,
    private readonly defaultLimit: IListAllUserRentalsUseCase.Limit,
    private readonly defaultOffset: IListAllUserRentalsUseCase.Offset,
    private readonly findAllRentsFromUserRepository: IFindAllRentsFromUserRepository
  ) {}

  async execute(
    data: IListAllUserRentalsUseCase.Input
  ): Promise<IListAllUserRentalsUseCase.Output> {
    const { user_id, limit, offset } = data;

    const userExists =
      await this.checkIfUserExistsByIdRepository.checkIfExistsById({
        id: user_id,
      });

    if (!userExists) {
      throw new UserNotFoundWithProvidedIdError();
    }

    const take = limit ?? this.defaultLimit;
    const skip = offset ?? this.defaultOffset;

    const rents = await this.findAllRentsFromUserRepository.findAllFromUser({
      user_id,
      take,
      skip,
      include: {
        cars: true,
      },
    });

    return rents;
  }
}
