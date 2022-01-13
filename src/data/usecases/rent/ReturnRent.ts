import {
  RentNotFoundWithProvidedIdError,
  RentBelongsToAnotherUserError,
  RentAlreadyClosedError,
  UnableToReturnRentalThatIsNotInProgressError,
} from '@domain/errors';
import { IReturnRentUseCase } from '@domain/usecases/rent/ReturnRent';

import { IFindRentalByIdRepository } from '@data/protocols/repositories/rent/FindRentalByIdRepository';

export class ReturnRentUseCase implements IReturnRentUseCase {
  constructor(
    private readonly findRentalByIdRepository: IFindRentalByIdRepository
  ) {}

  async execute(
    data: IReturnRentUseCase.Input
  ): Promise<IReturnRentUseCase.Output> {
    const { rent_id, user_id } = data;

    const rent = await this.findRentalByIdRepository.findById({ id: rent_id });

    if (!rent) {
      throw new RentNotFoundWithProvidedIdError();
    }

    if (rent.user_id !== user_id) {
      throw new RentBelongsToAnotherUserError();
    }

    const returnDateInMillisseconds = Date.now();

    if (returnDateInMillisseconds < rent.start_date.getTime()) {
      throw new UnableToReturnRentalThatIsNotInProgressError();
    }

    if (rent.return_date) {
      throw new RentAlreadyClosedError();
    }

    return undefined;
  }
}
