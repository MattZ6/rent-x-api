import { ICar } from '@domain/models/Car';

import {
  CreateCarDTO,
  ICheckIfCarExistsByLicensePlateRepository,
  ICreateCarRepository,
} from '@data/protocols/repositories/car';

import { carMock } from '../../domain/models/car.mock';

export class CheckIfCarExistsByLicensePlateRepositorySpy
  implements ICheckIfCarExistsByLicensePlateRepository
{
  async checkIfExistsByLicensePlate(_: string): Promise<boolean> {
    return false;
  }
}

export class CreateCarRepositorySpy implements ICreateCarRepository {
  async create(data: CreateCarDTO): Promise<ICar> {
    const {
      brand_id,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications: specifictions,
    } = data;

    const car = { ...carMock };

    Object.assign(car, {
      brand_id,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifictions,
    });

    return car;
  }
}
