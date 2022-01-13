import {
  RentNotFoundWithProvidedIdError,
  RentBelongsToAnotherUserError,
  RentAlreadyClosedError,
  UnableToReturnRentalThatIsNotInProgressError,
} from '@domain/errors';
import { IReturnRentUseCase } from '@domain/usecases/rent/ReturnRent';

import { IFindRentalByIdRepository } from '@data/protocols/repositories/rent';
import { ICreateRentPaymentRepository } from '@data/protocols/repositories/rent-payment';

export class ReturnRentUseCase implements IReturnRentUseCase {
  constructor(
    private readonly findRentalByIdRepository: IFindRentalByIdRepository,
    private readonly createRentPaymentRepository: ICreateRentPaymentRepository
  ) {}

  private getDurationInDays(startDate: Date, endDate: Date): number {
    const ONE_DAY_IN_MILLISSECONDS = 1 * 24 * 60 * 60 * 1000;

    const durationInMillisseconds = endDate.getTime() - startDate.getTime();

    return Math.ceil(durationInMillisseconds / ONE_DAY_IN_MILLISSECONDS);
  }

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

    const rentDurationInDays = this.getDurationInDays(
      rent.start_date,
      new Date(returnDateInMillisseconds)
    );

    const total = rentDurationInDays * rent.daily_rate;

    await this.createRentPaymentRepository.create({
      rent_id: rent.id,
      total,
    });

    return undefined;
  }
}
