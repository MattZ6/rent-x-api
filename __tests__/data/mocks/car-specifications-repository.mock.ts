import { ICarSpecification } from '@domain/models/CarSpecification';

import {
  CreateCarSpecificationDTO,
  FindAllCarSpecificationsDTO,
  ICheckIfCarSpecificationExistsByNameRepository,
  ICreateCarSpecificationRepository,
  IFindAllCarSpecificationsRepository,
  IFindCarSpecificationByIdRepository,
  IUpdateCarSpecificationRepository,
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

export class FindCarSpecificationByIdRepositorySpy
  implements IFindCarSpecificationByIdRepository
{
  async findById(id: string): Promise<ICarSpecification> {
    const specification = { ...carSpecificationMock };

    Object.assign(specification, { id });

    return specification;
  }
}

export class UpdateCarSpecificationRepositorySpy
  implements IUpdateCarSpecificationRepository
{
  async update(data: ICarSpecification): Promise<ICarSpecification> {
    return data;
  }
}

export class FindAllCarSpecificationsRepositorySpy
  implements IFindAllCarSpecificationsRepository
{
  async findAll(_: FindAllCarSpecificationsDTO): Promise<ICarSpecification[]> {
    return [carSpecificationMock, carSpecificationMock, carSpecificationMock];
  }
}
