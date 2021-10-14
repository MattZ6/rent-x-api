import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rent } from '@modules/rents/infra/typeorm/entities/Rent';
import { IRentsRepository } from '@modules/rents/repositories/IRentsRepository';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
export class CreateRentUseCase {
  constructor(
    @inject('RentsRepository')
    private readonly rentsRepository: IRentsRepository,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider,
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository
  ) {}

  async execute(data: IRequest): Promise<Rent> {
    const MIN_RENT_HOURS = 24;

    const { user_id, car_id, expected_return_date } = data;

    const rentOpenToCar = await this.rentsRepository.findOpenRentByCarId(
      car_id
    );

    if (rentOpenToCar) {
      throw new AppError('This car is currently rented.', 422);
    }

    const rentOpenToUser = await this.rentsRepository.findOpenRentByUserId(
      user_id
    );

    if (rentOpenToUser) {
      throw new AppError('This user already has a lease in progress.', 422);
    }

    const rentHours = this.dateProvider.getDiffInHours(
      new Date(),
      expected_return_date
    );

    if (rentHours < MIN_RENT_HOURS) {
      throw new AppError('Invalid return date.', 422);
    }

    const rent = await this.rentsRepository.create({
      user_id,
      car_id,
      start_date: new Date(),
      expected_return_date,
    });

    await this.carsRepository.updateAvailability({
      id: car_id,
      is_available: false,
    });

    return rent;
  }
}
