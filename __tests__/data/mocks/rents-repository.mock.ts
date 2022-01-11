import {
  ICheckIfRentExistsByScheduleForCarRepository,
  ICheckIfRentExistsWithPendingPaymentByUserRepository,
  ICreateRentRepository,
} from '@data/protocols/repositories/rent';

import { rentMock } from '../../domain/models/rent.mock';

export class CreateRentRepositorySpy implements ICreateRentRepository {
  async create(
    data: ICreateRentRepository.Input
  ): Promise<ICreateRentRepository.Output> {
    const { car_id, expected_return_date, start_date, user_id } = data;

    const rent = { ...rentMock };

    Object.assign(rent, { car_id, user_id, expected_return_date, start_date });

    return rent;
  }
}

export class CheckIfRentExistsByScheduleForCarRepositorySpy
  implements ICheckIfRentExistsByScheduleForCarRepository
{
  async checkIfExistsByScheduleForCar(
    _: ICheckIfRentExistsByScheduleForCarRepository.Input
  ): Promise<ICheckIfRentExistsByScheduleForCarRepository.Output> {
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
