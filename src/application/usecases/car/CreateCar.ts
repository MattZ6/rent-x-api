import {
  CarAlreadyExistsWithThisLicensePlateError,
  CarBrandNotFoundWithThisIdError,
  CarCategoryNotFoundWithThisIdError,
  OneOrMoreCarSpecificationsNotFoundWithThisIdsError,
} from '@domain/errors';
import { ICar } from '@domain/models/Car';
import { ICarSpecification } from '@domain/models/CarSpecification';
import { ICreateCarUseCase } from '@domain/usecases/car/CreateCar';

import {
  ICheckIfCarExistsByLicensePlateRepository,
  ICreateCarRepository,
} from '@application/protocols/repositories/car';
import { ICheckIfCarBrandExistsByIdRepository } from '@application/protocols/repositories/car-brand';
import { ICheckIfCarCategoryExistsByIdRepository } from '@application/protocols/repositories/car-category';
import { IFindAllSpecificationsByIdsRepository } from '@application/protocols/repositories/car-specification';

export class CreateCarUseCase implements ICreateCarUseCase {
  constructor(
    private readonly checkIfCarExistsByLicensePlateRepository: ICheckIfCarExistsByLicensePlateRepository,
    private readonly checkIfCarBrandExistsByIdRepository: ICheckIfCarBrandExistsByIdRepository,
    private readonly checkIfCarCategoryExistsByIdRepository: ICheckIfCarCategoryExistsByIdRepository,
    private readonly findAllSpecificationsByIdsRepository: IFindAllSpecificationsByIdsRepository,
    private readonly createCarRepository: ICreateCarRepository
  ) {}

  async execute(data: ICreateCarUseCase.Input): Promise<ICar> {
    const {
      name,
      description,
      license_plate,
      daily_rate,
      daily_late_fee,
      horse_power,
      max_speed,
      number_of_seats,
      zero_to_one_hundred_in_millisseconds,
      transmission_type,
      type_of_fuel,
      brand_id,
      category_id,
      specifications_ids,
    } = data;

    const alreadyExistsWithLicensePlate =
      await this.checkIfCarExistsByLicensePlateRepository.checkIfExistsByLicensePlate(
        {
          license_plate,
        }
      );

    if (alreadyExistsWithLicensePlate) {
      throw new CarAlreadyExistsWithThisLicensePlateError();
    }

    const brandExists =
      await this.checkIfCarBrandExistsByIdRepository.checkIfExistsById({
        id: brand_id,
      });

    if (!brandExists) {
      throw new CarBrandNotFoundWithThisIdError();
    }

    const categoryExists =
      await this.checkIfCarCategoryExistsByIdRepository.checkIfExistsById({
        id: category_id,
      });

    if (!categoryExists) {
      throw new CarCategoryNotFoundWithThisIdError();
    }

    const specificationsIds = [...new Set(specifications_ids ?? [])];

    let specifications: ICarSpecification[] = [];

    if (specificationsIds.length > 0) {
      specifications =
        await this.findAllSpecificationsByIdsRepository.findAllByIds({
          ids: specificationsIds,
        });

      if (specifications.length !== specificationsIds.length) {
        throw new OneOrMoreCarSpecificationsNotFoundWithThisIdsError();
      }
    }

    return this.createCarRepository.create({
      brand_id,
      category_id,
      name,
      description,
      license_plate,
      daily_rate,
      daily_late_fee,
      specifications,
      horse_power,
      max_speed,
      number_of_seats,
      zero_to_one_hundred_in_millisseconds,
      transmission_type,
      type_of_fuel,
    });
  }
}
