import { CarSpecification } from '@domain/entities/CarSpecification';
import {
  CarAlreadyExistsWithProvidedLicensePlateError,
  CarBrandNotFoundWithProvidedIdError,
  CarCategoryNotFoundWithProvidedIdError,
  OneOrMoreCarSpecificationsNotFoundWithProvidedIdsError,
} from '@domain/errors';
import { ICreateCarUseCase } from '@domain/usecases/car/Create';

import {
  ICheckIfCarExistsByLicensePlateRepository,
  ICheckIfCarBrandExistsByIdRepository,
  ICheckIfCarCategoryExistsByIdRepository,
  IFindAllSpecificationsByIdsRepository,
  ICreateCarRepository,
} from '@application/protocols/repositories/car';

export class CreateCarUseCase implements ICreateCarUseCase {
  constructor(
    private readonly checkIfCarExistsByLicensePlateRepository: ICheckIfCarExistsByLicensePlateRepository,
    private readonly checkIfCarBrandExistsByIdRepository: ICheckIfCarBrandExistsByIdRepository,
    private readonly checkIfCarCategoryExistsByIdRepository: ICheckIfCarCategoryExistsByIdRepository,
    private readonly findAllSpecificationsByIdsRepository: IFindAllSpecificationsByIdsRepository,
    private readonly createCarRepository: ICreateCarRepository
  ) {}

  async execute(
    data: ICreateCarUseCase.Input
  ): Promise<ICreateCarUseCase.Output> {
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

    const carAlreadyExistsWithLicensePlate =
      await this.checkIfCarExistsByLicensePlateRepository.checkIfExistsByLicensePlate(
        {
          license_plate,
        }
      );

    if (carAlreadyExistsWithLicensePlate) {
      throw new CarAlreadyExistsWithProvidedLicensePlateError();
    }

    const carBrandExists =
      await this.checkIfCarBrandExistsByIdRepository.checkIfExistsById({
        id: brand_id,
      });

    if (!carBrandExists) {
      throw new CarBrandNotFoundWithProvidedIdError();
    }

    const carCategoryExists =
      await this.checkIfCarCategoryExistsByIdRepository.checkIfExistsById({
        id: category_id,
      });

    if (!carCategoryExists) {
      throw new CarCategoryNotFoundWithProvidedIdError();
    }

    const specificationsIds = [...new Set(specifications_ids ?? [])];

    let specifications: CarSpecification[] = [];

    if (specificationsIds.length > 0) {
      specifications =
        await this.findAllSpecificationsByIdsRepository.findAllByIds({
          ids: specificationsIds,
        });

      if (specifications.length !== specificationsIds.length) {
        throw new OneOrMoreCarSpecificationsNotFoundWithProvidedIdsError();
      }
    }

    const car = await this.createCarRepository.create({
      name,
      description,
      license_plate,
      brand_id,
      category_id,
      daily_rate,
      daily_late_fee,
      horse_power,
      max_speed,
      number_of_seats,
      zero_to_one_hundred_in_millisseconds,
      transmission_type,
      type_of_fuel,
      specifications_ids: specificationsIds,
    });

    return car;
  }
}
