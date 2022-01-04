import { ICar } from '@domain/models/Car';

import {
  CreateCarDTO,
  FindAllCarsDTO,
  ICheckIfCarExistsByLicensePlateRepository,
  ICreateCarRepository,
  IFindAllCarsRepository,
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
      horse_power,
      max_speed,
      number_of_seats,
      transmission_type,
      type_of_fuel,
      zero_to_one_hundred_in_millisseconds,
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
      horse_power,
      max_speed,
      number_of_seats,
      transmission_type,
      type_of_fuel,
      zero_to_one_hundred_in_millisseconds,
    });

    return car;
  }
}

export class FindAllCarsRepositorySpy implements IFindAllCarsRepository {
  async findAll(_: FindAllCarsDTO): Promise<ICar[]> {
    return [carMock, carMock, carMock];
  }
}
