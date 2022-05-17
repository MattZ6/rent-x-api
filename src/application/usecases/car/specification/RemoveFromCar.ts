import {
  CarNotFoundWithProvidedIdError,
  CarSpecificationNotFoundWithProvidedIdError,
  NotFoundWithProvidedIdFromCar,
} from '@domain/errors';
import { IRemoveSpecificationFromCarUseCase } from '@domain/usecases/car/specification/RemoveFromCar';

import {
  ICheckIfCarExistsByIdRepository,
  ICheckIfCarSpecificationExistsByIdFromCarRepository,
  ICheckIfCarSpecificationExistsByIdRepository,
  IRemoveCarSpecificationsFromCarRepository,
} from '@application/protocols/repositories/car';

export class RemoveSpecificationFromCarUseCase
  implements IRemoveSpecificationFromCarUseCase
{
  constructor(
    private readonly checkIfCarExistsByIdRepository: ICheckIfCarExistsByIdRepository,
    private readonly checkIfCarSpecificationExistsByIdRepository: ICheckIfCarSpecificationExistsByIdRepository,
    private readonly checkIfCarSpecificationExistsByIdFromCarRepository: ICheckIfCarSpecificationExistsByIdFromCarRepository,
    private readonly removeCarSpecificationsFromCarRepository: IRemoveCarSpecificationsFromCarRepository
  ) {}

  async execute(
    data: IRemoveSpecificationFromCarUseCase.Input
  ): Promise<IRemoveSpecificationFromCarUseCase.Output> {
    const { car_id, specification_id } = data;

    const carExists =
      await this.checkIfCarExistsByIdRepository.checkIfExistsById({
        id: car_id,
      });

    if (!carExists) {
      throw new CarNotFoundWithProvidedIdError();
    }

    const specificationExists =
      await this.checkIfCarSpecificationExistsByIdRepository.checkIfExistsById({
        id: specification_id,
      });

    if (!specificationExists) {
      throw new CarSpecificationNotFoundWithProvidedIdError();
    }

    const alreadyRelatedToCar =
      await this.checkIfCarSpecificationExistsByIdFromCarRepository.checkIfExistsByIdFromCar(
        {
          car_id,
          specification_id,
        }
      );

    if (!alreadyRelatedToCar) {
      throw new NotFoundWithProvidedIdFromCar();
    }

    await this.removeCarSpecificationsFromCarRepository.removeFromCar({
      car_id,
      specification_id,
    });
  }
}
