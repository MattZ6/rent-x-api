import {
  CarNotFoundWithProvidedIdError,
  OneOrMoreCarSpecificationsAlreadyRelatedToCarError,
  OneOrMoreCarSpecificationsNotFoundWithProvidedIdsError,
} from '@domain/errors';
import { IAddSpecificationsToCarUseCase } from '@domain/usecases/car/specification/AddToCar';

import {
  ICheckIfAllCarSpecificationsExistsByIdsRepository,
  ICheckIfCarExistsByIdRepository,
  ICheckIfSomeCarSpecificationExistsByIdsFromCarRepository,
  IRelateCarSpecificationsToCarRepository,
} from '@application/protocols/repositories/car';

export class AddSpecificationsToCarUseCase
  implements IAddSpecificationsToCarUseCase
{
  constructor(
    private readonly checkIfCarExistsByIdRepository: ICheckIfCarExistsByIdRepository,
    private readonly checkIfAllCarSpecificationsExistsByIdsRepository: ICheckIfAllCarSpecificationsExistsByIdsRepository,
    private readonly checkIfSomeCarSpecificationExistsByIdsFromCarRepository: ICheckIfSomeCarSpecificationExistsByIdsFromCarRepository,
    private readonly relateCarSpecificationsToCarRepository: IRelateCarSpecificationsToCarRepository
  ) {}

  async execute(
    data: IAddSpecificationsToCarUseCase.Input
  ): Promise<IAddSpecificationsToCarUseCase.Output> {
    const { car_id, specifications_ids } = data;

    const carExists =
      await this.checkIfCarExistsByIdRepository.checkIfExistsById({
        id: car_id,
      });

    if (!carExists) {
      throw new CarNotFoundWithProvidedIdError();
    }

    const specificationsIds = [...new Set(specifications_ids)];

    const allSpecificationsExists =
      await this.checkIfAllCarSpecificationsExistsByIdsRepository.checkIfAllExistsByIds(
        { ids: specificationsIds }
      );

    if (!allSpecificationsExists) {
      throw new OneOrMoreCarSpecificationsNotFoundWithProvidedIdsError();
    }

    const someAlreadyRelatedToCar =
      await this.checkIfSomeCarSpecificationExistsByIdsFromCarRepository.checkIfSomeExistsByIdsFromCar(
        { car_id, specifications_ids: specificationsIds }
      );

    if (someAlreadyRelatedToCar) {
      throw new OneOrMoreCarSpecificationsAlreadyRelatedToCarError();
    }

    await this.relateCarSpecificationsToCarRepository.relateToCar({
      car_id,
      specifications_ids: specificationsIds,
    });
  }
}
