import { ICarSpecification } from '@domain/models/CarSpecification';

import {
  CreateCarSpecificationDTO,
  ICheckIfCarSpecificationExistsByNameRepository,
  ICreateCarSpecificationRepository,
} from '@data/protocols/repositories/specification';

import { carSpecificationMock } from '../../domain/models/car-specification.mock';

export class CheckIfCarSpecificationExistsByNameRepositorySpy
  implements ICheckIfCarSpecificationExistsByNameRepository
{
  async checkIfExistsByName(_: string): Promise<boolean> {
    return false;
  }
}

export class CreateCarSpecificationRepositorySpy
  implements ICreateCarSpecificationRepository
{
  async create(data: CreateCarSpecificationDTO): Promise<ICarSpecification> {
    const { name, description } = data;

    const specification = { ...carSpecificationMock };

    Object.assign(specification, { name, description });

    return specification;
  }
}
