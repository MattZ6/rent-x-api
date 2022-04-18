import {
  ICheckIfCarExistsByIdRepository,
  ICheckIfCarExistsByLicensePlateRepository,
  ICreateCarRepository,
  IFindAllCarsRepository,
  IFindCarByIdRepository,
} from '@application/protocols/repositories/car';

import { carMock } from '../../../../domain/models';

export class CheckIfCarExistsByLicensePlateRepositorySpy
  implements ICheckIfCarExistsByLicensePlateRepository
{
  async checkIfExistsByLicensePlate(
    _: ICheckIfCarExistsByLicensePlateRepository.Input
  ): Promise<ICheckIfCarExistsByLicensePlateRepository.Output> {
    return false;
  }
}

export class CreateCarRepositorySpy implements ICreateCarRepository {
  async create(
    data: ICreateCarRepository.Input
  ): Promise<ICreateCarRepository.Output> {
    const {
      brand_id,
      category_id,
      daily_rate,
      description,
      daily_late_fee,
      license_plate,
      name,
      horse_power,
      max_speed,
      number_of_seats,
      transmission_type,
      type_of_fuel,
      zero_to_one_hundred_in_millisseconds,
      specifications,
    } = data;

    const car = { ...carMock };

    Object.assign(car, {
      brand_id,
      category_id,
      daily_rate,
      description,
      daily_late_fee,
      license_plate,
      name,
      specifications,
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
  async findAll(
    _: IFindAllCarsRepository.Input
  ): Promise<IFindAllCarsRepository.Output> {
    return [carMock, carMock, carMock];
  }
}

export class FindCarByIdRepositorySpy implements IFindCarByIdRepository {
  async findById(
    data: IFindCarByIdRepository.Input
  ): Promise<IFindCarByIdRepository.Output> {
    return { ...carMock, id: data.id };
  }
}

export class CheckIfCarExistsByIdRepositorySpy
  implements ICheckIfCarExistsByIdRepository
{
  async checkIfExistsById(
    _: ICheckIfCarExistsByIdRepository.Input
  ): Promise<ICheckIfCarExistsByIdRepository.Output> {
    return true;
  }
}
