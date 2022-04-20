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

    let carSpecification =
      await this.findCarSpecificationByIdRepository.findById({ id });

    if (!carSpecification) {
      throw new CarSpecificationNotFoundWithProvidedIdError();
    }

    const areSameName =
      name.toLowerCase().trim() === carSpecification.name.toLowerCase().trim();

    if (!areSameName) {
      const alreadyExists =
        await this.checkIfCarSpecificationExistsByNameRepository.checkIfExistsByName(
          { name }
        );

      if (alreadyExists) {
        throw new CarSpecificationAlreadyExistsWithProvidedNameError();
      }
    }

    carSpecification = await this.updateCarSpecificationRepository.update({
      id: carSpecification.id,
      name: name.trim(),
      description: description.trim(),
    });

    return carSpecification;
  }
}
