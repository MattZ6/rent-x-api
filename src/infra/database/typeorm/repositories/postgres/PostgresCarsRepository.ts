import { getRepository, Raw, Repository } from 'typeorm';

import {
  ICheckIfCarExistsByLicensePlateRepository,
  ICreateCarRepository,
  IFindAllCarsRepository,
  IFindCarByIdRepository,
} from '@application/protocols/repositories/car';

import { Car } from '../../entities/Car';

export class PostgresCarsRepository
  implements
    ICheckIfCarExistsByLicensePlateRepository,
    ICreateCarRepository,
    IFindAllCarsRepository,
    IFindCarByIdRepository
{
  private readonly repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async checkIfExistsByLicensePlate(
    data: ICheckIfCarExistsByLicensePlateRepository.Input
  ): Promise<ICheckIfCarExistsByLicensePlateRepository.Output> {
    const { license_plate } = data;

    const count = await this.repository.count({
      where: {
        license_plate: Raw(field => `LOWER(${field}) = LOWER(:value)`, {
          value: license_plate,
        }),
      },
    });

    return count >= 1;
  }

  async create(
    data: ICreateCarRepository.Input
  ): Promise<ICreateCarRepository.Output> {
    const {
      name,
      description,
      license_plate,
      daily_rate,
      daily_late_fee,
      brand_id,
      category_id,
      specifications,
      horse_power,
      max_speed,
      zero_to_one_hundred_in_millisseconds,
      number_of_seats,
      transmission_type,
      type_of_fuel,
    } = data;

    const car = this.repository.create({
      name,
      description,
      license_plate,
      daily_rate,
      daily_late_fee,
      brand_id,
      category_id,
      specifications,
      horse_power,
      max_speed,
      zero_to_one_hundred_in_millisseconds,
      number_of_seats,
      transmission_type,
      type_of_fuel,
    });

    return this.repository.save(car);
  }

  async findAll(
    data: IFindAllCarsRepository.Input
  ): Promise<IFindAllCarsRepository.Output> {
    const { order_by, order, skip, take, relations } = data;

    return this.repository.find({
      order: { [order_by]: order },
      take,
      skip,
      relations,
    });
  }

  async findById(
    data: IFindCarByIdRepository.Input
  ): Promise<IFindCarByIdRepository.Output> {
    const { id, relations = [] } = data;

    return this.repository.findOne(id, { relations });
  }
}
