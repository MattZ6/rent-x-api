import { CarSpecificationAlreadyExistsWithThisNameError } from '@domain/errors';
import { ICreateCarSpecificationUseCase } from '@domain/usecases/car/CreateCarSpecification';

import {
  ICheckIfCarSpecificationExistsByNameRepository,
  ICreateCarSpecificationRepository,
} from '@data/protocols/repositories/car-specification';

export class CreateCarSpecificationUseCase
  implements ICreateCarSpecificationUseCase
{
  constructor(
    private readonly checkIfCarSpecificationExistsByNameRepository: ICheckIfCarSpecificationExistsByNameRepository,
    private readonly createCarSpecificationRepository: ICreateCarSpecificationRepository
  ) {}

  async execute(
    data: ICreateCarSpecificationUseCase.Input
  ): Promise<ICreateCarSpecificationUseCase.Output> {
    const { name, description } = data;

    const alreadyExists =
      await this.checkIfCarSpecificationExistsByNameRepository.checkIfExistsByName(
        name
      );

    if (alreadyExists) {
      throw new CarSpecificationAlreadyExistsWithThisNameError();
    }

    return this.createCarSpecificationRepository.create({ name, description });
  }
}