import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
  car_id: string;
  specifications_ids: string[];
}

@injectable()
export class AddSpecificationsToCarUseCase {
  constructor(
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private readonly specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(data: IRequest): Promise<Car> {
    const { car_id, specifications_ids } = data;

    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError('Car not found', 404);
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_ids
    );

    if (specifications.length !== specifications_ids.length) {
      throw new AppError('One or more Specifications not found', 404);
    }

    car.specifictions = specifications;

    return this.carsRepository.update(car);
  }
}
