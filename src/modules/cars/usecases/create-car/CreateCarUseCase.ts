import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { AppError } from '@shared/errors/AppError';

type Request = {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
};

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository
  ) {}

  async execute(data: Request): Promise<Car> {
    const {
      name,
      description,
      license_plate,
      daily_rate,
      fine_amount,
      brand,
      category_id,
    } = data;

    let car = await this.carsRepository.findByLicensePlate(license_plate);

    if (car) {
      throw new AppError(
        'Theres a Car registered with this license plate',
        422
      );
    }

    car = await this.carsRepository.create({
      name,
      description,
      license_plate,
      daily_rate,
      fine_amount,
      brand,
      category_id,
      is_available: true,
    });

    return car;
  }
}
