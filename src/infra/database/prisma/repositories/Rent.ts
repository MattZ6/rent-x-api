import {
  ICheckIfRentExistsByOpenScheduleForCarRepository,
  ICheckIfRentExistsWithPendingPaymentByUserRepository,
  ICreateRentRepository,
  IFindRentalByIdRepository,
  IUpdateRentRepository,
} from '@application/protocols/repositories/rent';

import { prisma } from '..';

export class PrismaRentsRepository
  implements
    ICheckIfRentExistsWithPendingPaymentByUserRepository,
    ICheckIfRentExistsByOpenScheduleForCarRepository,
    ICreateRentRepository,
    IFindRentalByIdRepository,
    IUpdateRentRepository
{
  async checkIfExistsWithPendingPaymentByUser(
    data: ICheckIfRentExistsWithPendingPaymentByUserRepository.Input
  ): Promise<ICheckIfRentExistsWithPendingPaymentByUserRepository.Output> {
    const { user_id } = data;

    const count = await prisma.rent.count({
      where: {
        user_id: {
          equals: user_id,
        },
        payment_id: {
          equals: null,
        },
      },
    });

    return count >= 1;
  }

  async checkIfExistsByOpenScheduleForCar(
    data: ICheckIfRentExistsByOpenScheduleForCarRepository.Input
  ): Promise<ICheckIfRentExistsByOpenScheduleForCarRepository.Output> {
    const { car_id, start, end } = data;

    const count = await prisma.rent.count({
      where: {
        car_id: {
          equals: car_id,
        },
        return_date: {
          equals: null,
        },
        start_date: {
          gte: start,
          lte: end,
        },
        expected_return_date: {
          gte: start,
          lte: end,
        },
      },
    });

    return count >= 1;
  }

  async create(
    data: ICreateRentRepository.Input
  ): Promise<ICreateRentRepository.Output> {
    const {
      car_id,
      user_id,
      daily_late_fee,
      daily_rate,
      expected_return_date,
      start_date,
    } = data;

    const rent = await prisma.rent.create({
      data: {
        car_id,
        user_id,
        daily_late_fee,
        daily_rate,
        expected_return_date,
        start_date,
      },
    });

    return rent;
  }

  async findById(
    data: IFindRentalByIdRepository.Input
  ): Promise<IFindRentalByIdRepository.Output> {
    const { id } = data;

    const rent = await prisma.rent.findUnique({
      where: { id },
    });

    return rent;
  }

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

    const rent = await prisma.rent.update({
      where: { id },
      data: {
        daily_late_fee,
        daily_rate,
        expected_return_date,
        return_date,
        start_date,
        payment_id,
      },
    });

    return rent;
  }
}
