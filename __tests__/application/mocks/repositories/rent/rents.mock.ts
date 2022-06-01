import {
  ICreateRentRepository,
  ICheckIfRentExistsByOpenScheduleForCarRepository,
  ICheckIfRentExistsWithPendingPaymentByUserRepository,
  IFindRentalByIdRepository,
  IUpdateRentRepository,
  IFindAllRentsFromUserRepository,
  IFindAllRentsFromCarRepository,
} from '@application/protocols/repositories/rent';

import { makeRentMock } from '../../../../domain';

export class CreateRentRepositorySpy implements ICreateRentRepository {
  async create(
    data: ICreateRentRepository.Input
  ): Promise<ICreateRentRepository.Output> {
    const {
      daily_late_fee,
      daily_rate,
      car_id,
      expected_return_date,
      start_date,
      user_id,
    } = data;

    const rentMock = makeRentMock();

    Object.assign(rentMock, {
      daily_late_fee,
      daily_rate,
      car_id,
      expected_return_date,
      start_date,
      user_id,
    });

    return rentMock;
  }
}

export class CheckIfRentExistsByOpenScheduleForCarRepositorySpy
  implements ICheckIfRentExistsByOpenScheduleForCarRepository
{
  async checkIfExistsByOpenScheduleForCar(
    _: ICheckIfRentExistsByOpenScheduleForCarRepository.Input
  ): Promise<ICheckIfRentExistsByOpenScheduleForCarRepository.Output> {
    return false;
  }
}

export class CheckIfRentExistsWithPendingPaymentByUserRepositorySpy
  implements ICheckIfRentExistsWithPendingPaymentByUserRepository
{
  async checkIfExistsWithPendingPaymentByUser(
    _: ICheckIfRentExistsWithPendingPaymentByUserRepository.Input
  ): Promise<ICheckIfRentExistsWithPendingPaymentByUserRepository.Output> {
    return false;
  }
}

export class FindRentalByIdRepositorySpy implements IFindRentalByIdRepository {
  async findById(
    data: IFindRentalByIdRepository.Input
  ): Promise<IFindRentalByIdRepository.Output> {
    const { id } = data;

    const rentMock = makeRentMock();

    Object.assign(rentMock, { id });

    return rentMock;
  }
}

export class UpdateRentRepositorySpy implements IUpdateRentRepository {
  async update(
    data: IUpdateRentRepository.Input
  ): Promise<IUpdateRentRepository.Output> {
    const {
      id,
      daily_late_fee,
      daily_rate,
      expected_return_date,
      payment_id,
      return_date,
      start_date,
    } = data;

    const rentMock = makeRentMock();

    Object.assign(rentMock, {
      id,
      daily_late_fee,
      daily_rate,
      expected_return_date,
      payment_id,
      return_date,
      start_date,
    });

    return rentMock;
  }
}

export class FindAllRentsFromUserRepositorySpy
  implements IFindAllRentsFromUserRepository
{
  async findAllFromUser(
    _: IFindAllRentsFromUserRepository.Input
  ): Promise<IFindAllRentsFromUserRepository.Output> {
    return [];
  }
}

export class FindAllRentsFromCarRepositorySpy
  implements IFindAllRentsFromCarRepository
{
  async findAllFromCar(
    _: IFindAllRentsFromCarRepository.Input
  ): Promise<IFindAllRentsFromCarRepository.Output> {
    return [];
  }
}
