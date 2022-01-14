import {
  Between,
  FindConditions,
  getRepository,
  IsNull,
  Not,
  Repository,
} from 'typeorm';

import {
  ICheckIfRentExistsByOpenScheduleForCarRepository,
  ICheckIfRentExistsWithPendingPaymentByUserRepository,
  ICreateRentRepository,
  IFindRentalByIdRepository,
  IUpdateRentRepository,
} from '@data/protocols/repositories/rent';

import { Rent } from '../../entities/Rent';

export class PostgresRentsRepository
  implements
    ICheckIfRentExistsWithPendingPaymentByUserRepository,
    ICheckIfRentExistsByOpenScheduleForCarRepository,
    ICreateRentRepository,
    IFindRentalByIdRepository,
    IUpdateRentRepository
{
  private readonly repository: Repository<Rent>;

  constructor() {
    this.repository = getRepository(Rent);
  }

  async checkIfExistsByOpenScheduleForCar(
    data: ICheckIfRentExistsByOpenScheduleForCarRepository.Input
  ): Promise<ICheckIfRentExistsByOpenScheduleForCarRepository.Output> {
    const { car_id, start, end } = data;

    const commonConditions: FindConditions<Rent> = {
      car_id,
      return_date: IsNull(),
    };

    const count = await this.repository.count({
      where: [
        {
          ...commonConditions,
          start_date: Between(start, end),
        },
        {
          ...commonConditions,
          expected_return_date: Between(start, end),
        },
      ],
    });

    return count > 0;
  }

  async checkIfExistsWithPendingPaymentByUser(
    data: ICheckIfRentExistsWithPendingPaymentByUserRepository.Input
  ): Promise<ICheckIfRentExistsWithPendingPaymentByUserRepository.Output> {
    const { user_id } = data;

    const commonConditions: FindConditions<Rent> = {
      user_id,
      return_date: Not(IsNull()),
    };

    const count = await this.repository.count({
      where: [
        {
          ...commonConditions,
          payment: IsNull(),
        },
        {
          ...commonConditions,
          payment: {
            paid_at: IsNull(),
          },
        },
      ],
      relations: ['payment'],
    });

    return count > 0;
  }

  async create(
    data: ICreateRentRepository.Input
  ): Promise<ICreateRentRepository.Output> {
    const {
      user_id,
      car_id,
      start_date,
      expected_return_date,
      daily_rate,
      daily_late_fee,
    } = data;

    const rent = this.repository.create({
      user_id,
      car_id,
      start_date,
      expected_return_date,
      daily_rate,
      daily_late_fee,
    });

    return this.repository.save(rent);
  }

  async findById(
    data: IFindRentalByIdRepository.Input
  ): Promise<IFindRentalByIdRepository.Output> {
    const { id } = data;

    return this.repository.findOne(id);
  }

  async update(
    data: IUpdateRentRepository.Input
  ): Promise<IUpdateRentRepository.Output> {
    return this.repository.save(data);
  }
}
