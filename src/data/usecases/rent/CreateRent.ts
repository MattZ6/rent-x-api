import {
  CarNotFoundWithThisIdError,
  InvalidRentDurationTimeError,
  CarAlreadyBookedOnThisDateError,
  UserHasOutstandingRentPaymentsError,
  UserNotFoundWithThisIdError,
} from '@domain/errors';
import { ICreateRentUseCase } from '@domain/usecases/rent/CreateRent';

import { IFindCarByIdRepository } from '@data/protocols/repositories/car';
import {
  ICheckIfRentExistsByOpenScheduleForCarRepository,
  ICheckIfRentExistsWithPendingPaymentByUserRepository,
  ICreateRentRepository,
} from '@data/protocols/repositories/rent';
import { ICheckIfUserExistsByIdRepository } from '@data/protocols/repositories/user';

export class CreateRentUseCase implements ICreateRentUseCase {
  constructor(
    private readonly checkIfUserExistsByIdRepository: ICheckIfUserExistsByIdRepository,
    private readonly checkIfRentExistsWithPendingPaymentByUserRepository: ICheckIfRentExistsWithPendingPaymentByUserRepository,
    private readonly findCarByIdRepository: IFindCarByIdRepository,
    private readonly minimumRentDurationTimeInMillisseconds: number,
    private readonly checkIfRentExistsByOpenScheduleForCarRepository: ICheckIfRentExistsByOpenScheduleForCarRepository,
    private readonly createRentRepository: ICreateRentRepository
  ) {}

  async execute(
    data: ICreateRentUseCase.Input
  ): Promise<ICreateRentUseCase.Output> {
    const { user_id, car_id, start_date, expected_return_date } = data;

    const userExists =
      await this.checkIfUserExistsByIdRepository.checkIfExistsById({
        id: user_id,
      });

    if (!userExists) {
      throw new UserNotFoundWithThisIdError();
    }

    const userHasPendingPayment =
      await this.checkIfRentExistsWithPendingPaymentByUserRepository.checkIfExistsWithPendingPaymentByUser(
        { user_id }
      );

    if (userHasPendingPayment) {
      throw new UserHasOutstandingRentPaymentsError();
    }

    const car = await this.findCarByIdRepository.findById({
      id: car_id,
    });

    if (!car) {
      throw new CarNotFoundWithThisIdError();
    }

    const startDate = new Date(start_date);
    const expectedReturnDate = new Date(expected_return_date);

    const rentalDurationInMillisseconds =
      expectedReturnDate.getTime() - startDate.getTime();

    if (
      rentalDurationInMillisseconds <
      this.minimumRentDurationTimeInMillisseconds
    ) {
      throw new InvalidRentDurationTimeError();
    }

    const alreadyRentOnThisDate =
      await this.checkIfRentExistsByOpenScheduleForCarRepository.checkIfExistsByOpenScheduleForCar(
        {
          car_id,
          start: startDate,
          end: expectedReturnDate,
        }
      );

    if (alreadyRentOnThisDate) {
      throw new CarAlreadyBookedOnThisDateError();
    }

    return this.createRentRepository.create({
      car_id,
      user_id,
      start_date: startDate,
      expected_return_date: expectedReturnDate,
      fine_amount: car.fine_amount,
      daily_rate: car.daily_rate,
    });
  }
}
