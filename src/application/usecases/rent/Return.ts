import {
  RentNotFoundWithProvidedIdError,
  RentBelongsToAnotherUserError,
  RentalIsNotInProgressError,
  RentAlreadyClosedError,
} from '@domain/errors';
import { IReturnRentUseCase } from '@domain/usecases/rent/Return';

import { IGetDurationInDaysProvider } from '@application/protocols/providers/duration/GetInDays';
import {
  IFindRentalByIdRepository,
  IUpdateRentRepository,
} from '@application/protocols/repositories/rent';
import { ICreateRentPaymentRepository } from '@application/protocols/repositories/rent/payment';

export class ReturnRentUseCase implements IReturnRentUseCase {
  constructor(
    private readonly findRentalByIdRepository: IFindRentalByIdRepository,
    private readonly getDurationInDaysProvider: IGetDurationInDaysProvider,
    private readonly createRentPaymentRepository: ICreateRentPaymentRepository,
    private readonly updateRentRepository: IUpdateRentRepository
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
      throw new RentalIsNotInProgressError();
    }

    if (rent.return_date) {
      throw new RentAlreadyClosedError();
    }

    const expectedRentDurationInDays =
      this.getDurationInDaysProvider.getDurationInDays({
        start_date: rent.start_date,
        end_date: rent.expected_return_date,
      });

    const rentDurationInDays = this.getDurationInDaysProvider.getDurationInDays(
      {
        start_date: rent.start_date,
        end_date: new Date(returnDateInMillisseconds),
      }
    );

    let daysOfDelay = rentDurationInDays - expectedRentDurationInDays;

    if (daysOfDelay <= 0) {
      daysOfDelay = 0;
    }

    let total = rentDurationInDays * rent.daily_rate;

    if (daysOfDelay > 0) {
      total =
        rent.daily_rate * expectedRentDurationInDays +
        rent.daily_late_fee * daysOfDelay;
    }

    const rentPayment = await this.createRentPaymentRepository.create({
      rent_id: rent.id,
      total,
    });

    const updatedRent = this.updateRentRepository.update({
      id: rent.id,
      return_date: new Date(returnDateInMillisseconds),
      payment_id: rentPayment.id,
    });

    return updatedRent;
  }
}
