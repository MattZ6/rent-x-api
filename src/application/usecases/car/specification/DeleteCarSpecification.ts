import { CarSpecificationNotFoundWithProvidedIdError } from '@domain/errors';
import { IDeleteCarSpecificationUseCase } from '@domain/usecases/car/specification/DeleteCarSpecification';

import {
  ICheckIfCarSpecificationExistsByIdRepository,
  IDeleteCarSpecificationByIdRepository,
} from '@application/protocols/repositories/car-specification';

export class DeleteCarSpecificationUseCase
  implements IDeleteCarSpecificationUseCase
{
  constructor(
    private readonly checkIfCarSpecificationExistsByIdRepository: ICheckIfCarSpecificationExistsByIdRepository,
    private readonly deleteCarSpecificationByIdRepository: IDeleteCarSpecificationByIdRepository
  ) {}

  async execute(
    data: IDeleteCarSpecificationUseCase.Input
  ): Promise<IDeleteCarSpecificationUseCase.Output> {
    const { id } = data;

    const exists =
      await this.checkIfCarSpecificationExistsByIdRepository.checkIfExistsById({
        id,
      });

    if (!exists) {
      throw new CarSpecificationNotFoundWithProvidedIdError();
    }

    await this.deleteCarSpecificationByIdRepository.deleteById({ id });
  }
}
