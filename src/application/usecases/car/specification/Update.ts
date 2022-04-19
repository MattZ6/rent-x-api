import {
  CarSpecificationNotFoundWithProvidedIdError,
  CarSpecificationAlreadyExistsWithProvidedNameError,
} from '@domain/errors';
import { IUpdateCarSpecificationUseCase } from '@domain/usecases/car/specification/Update';

import {
  ICheckIfCarSpecificationExistsByNameRepository,
  IFindCarSpecificationByIdRepository,
  IUpdateCarSpecificationRepository,
} from '@application/protocols/repositories/car/specification';

export class UpdateCarSpecificationUseCase
  implements IUpdateCarSpecificationUseCase
{
  constructor(
    private readonly findCarSpecificationByIdRepository: IFindCarSpecificationByIdRepository,
    private readonly checkIfCarSpecificationExistsByNameRepository: ICheckIfCarSpecificationExistsByNameRepository,
    private readonly updateCarSpecificationRepository: IUpdateCarSpecificationRepository
  ) {}

  async execute(
    data: IUpdateCarSpecificationUseCase.Input
  ): Promise<IUpdateCarSpecificationUseCase.Output> {
    const { id, name, description } = data;

    const specification =
      await this.findCarSpecificationByIdRepository.findById({ id });

    if (!specification) {
      throw new CarSpecificationNotFoundWithProvidedIdError();
    }

    const areSameName =
      name.toLowerCase().trim() === specification.name.toLowerCase().trim();

    if (!areSameName) {
      const alreadyInUse =
        await this.checkIfCarSpecificationExistsByNameRepository.checkIfExistsByName(
          {
            name,
          }
        );

      if (alreadyInUse) {
        throw new CarSpecificationAlreadyExistsWithProvidedNameError();
      }
    }

    specification.name = name;
    specification.description = description;

    return this.updateCarSpecificationRepository.update(specification);
  }
}
