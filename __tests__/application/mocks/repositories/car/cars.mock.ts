import {
  ICheckIfCarExistsByIdRepository,
  ICheckIfCarExistsByLicensePlateRepository,
  ICreateCarRepository,
  IFindAllAvailableCarsRepository,
  IFindAllCarsRepository,
  IFindCarByIdRepository,
} from '@application/protocols/repositories/car';

import { makeCarMock } from '../../../../domain/entities';

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
      daily_late_fee,
      daily_rate,
      description,
      horse_power,
      license_plate,
      max_speed,
      name,
      number_of_seats,
      transmission_type,
      type_of_fuel,
      zero_to_one_hundred_in_millisseconds,
    } = data;

    const carMock = makeCarMock();

    Object.assign(carMock, {
      brand_id,
      category_id,
      daily_late_fee,
      daily_rate,
      description,
      horse_power,
      license_plate,
      max_speed,
      name,
      number_of_seats,
      transmission_type,
      type_of_fuel,
      zero_to_one_hundred_in_millisseconds,
    });

    return carMock;
  }
}

export class FindAllCarsRepositorySpy implements IFindAllCarsRepository {
  async findAll(
    _: IFindAllCarsRepository.Input
  ): Promise<IFindAllCarsRepository.Output> {
    return [];
  }
}

export class FindAllAvailableCarsRepositorySpy
  implements IFindAllAvailableCarsRepository
{
  async findAllAvailable(
    _: IFindAllCarsRepository.Input
  ): Promise<IFindAllCarsRepository.Output> {
    return [];
  }
}

export class FindCarByIdRepositorySpy implements IFindCarByIdRepository {
  async findById(
    data: IFindCarByIdRepository.Input
  ): Promise<IFindCarByIdRepository.Output> {
    const { id } = data;

    const carMock = makeCarMock();

    Object.assign(carMock, { id });

    return carMock;
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
