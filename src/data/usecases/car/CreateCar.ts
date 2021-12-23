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
} from '@data/protocols/repositories/car';
import { ICheckIfCarBrandExistsByIdRepository } from '@data/protocols/repositories/car-brand';
import { ICheckIfCarCategoryExistsByIdRepository } from '@data/protocols/repositories/car-category';
import { IFindAllSpecificationsByIdsRepository } from '@data/protocols/repositories/car-specification';

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
      fine_amount,
      brand_id,
      category_id,
      specifications_ids,
    } = data;

    const alreadyExistsWithLicensePlate =
      await this.checkIfCarExistsByLicensePlateRepository.checkIfExistsByLicensePlate(
        license_plate
      );

    if (alreadyExistsWithLicensePlate) {
      throw new CarAlreadyExistsWithThisLicensePlateError();
    }

    const brandExists =
      await this.checkIfCarBrandExistsByIdRepository.checkIfExistsById(
        brand_id
      );

    if (!brandExists) {
      throw new CarBrandNotFoundWithThisIdError();
    }

    const categoryExists =
      await this.checkIfCarCategoryExistsByIdRepository.checkIfExistsById(
        category_id
      );

    if (!categoryExists) {
      throw new CarCategoryNotFoundWithThisIdError();
    }

    const specificationsIds = [...new Set(specifications_ids ?? [])];

    let specifications: ICarSpecification[] = [];

    if (specificationsIds.length > 0) {
      specifications =
        await this.findAllSpecificationsByIdsRepository.findAllByIds(
          specificationsIds
        );

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
      fine_amount,
      specifications,
    });
  }
}
