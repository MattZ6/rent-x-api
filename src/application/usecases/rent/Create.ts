import {
  CarNotFoundWithProvidedIdError,
  InvalidRentDurationTimeError,
  CarAlreadyBookedOnThisDateError,
  UserHasOutstandingRentPaymentsError,
  UserNotFoundWithProvidedIdError,
  RentalStartDateIsInThePastError,
} from '@domain/errors';
import { ICreateRentUseCase } from '@domain/usecases/rent/Create';

import { IFindCarByIdRepository } from '@application/protocols/repositories/car';
import {
  ICheckIfRentExistsByOpenScheduleForCarRepository,
  ICheckIfRentExistsWithPendingPaymentByUserRepository,
  ICreateRentRepository,
} from '@application/protocols/repositories/rent';
import { ICheckIfUserExistsByIdRepository } from '@application/protocols/repositories/user';

export class CreateRentUseCase implements ICreateRentUseCase {
  constructor(
    private readonly checkIfUserExistsByIdRepository: ICheckIfUserExistsByIdRepository,
    private readonly checkIfRentExistsWithPendingPaymentByUserRepository: ICheckIfRentExistsWithPendingPaymentByUserRepository,
    private readonly findCarByIdRepository: IFindCarByIdRepository,
    private readonly minimumRentDurationTimeInMillisseconds: number,
    private readonly checkIfRentExistsByOpenScheduleForCarRepository: ICheckIfRentExistsByOpenScheduleForCarRepository,
    private readonly createRentRepository: ICreateRentRepository
  ) {}

  private getDifferenceInDays(startDate: Date, endDate: Date): number {
    const ONE_DAY_IN_MILLISSECONDS = 1 * 24 * 60 * 60 * 1000;

    const durationInMillisseconds = endDate.getTime() - startDate.getTime();

    return Math.ceil(durationInMillisseconds / ONE_DAY_IN_MILLISSECONDS);
  }

  async execute(
    data: ICreateRentUseCase.Input
  ): Promise<ICreateRentUseCase.Output> {
    const { user_id, car_id, start_date, expected_return_date } = data;

    const userExists =
      await this.checkIfUserExistsByIdRepository.checkIfExistsById({
        id: user_id,
      });

    if (!userExists) {
      throw new UserNotFoundWithProvidedIdError();
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
      throw new CarNotFoundWithProvidedIdError();
    }

    const nowInMillisseconds = Date.now();
    const now = new Date(nowInMillisseconds);

    const nowWithFlatDays = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const startDate = new Date(start_date);

    const startDateWithFlatDays = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );

    if (startDateWithFlatDays.getTime() <= nowWithFlatDays.getTime()) {
      throw new RentalStartDateIsInThePastError();
    }

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
      daily_late_fee: car.daily_late_fee,
      daily_rate: car.daily_rate,
    });
  }
}
