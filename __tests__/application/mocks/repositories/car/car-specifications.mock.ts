import {
  ICheckIfAllCarSpecificationsExistsByIdsRepository,
  ICheckIfCarSpecificationExistsByIdRepository,
  ICheckIfCarSpecificationExistsByNameRepository,
  ICheckIfSomeCarSpecificationExistsByIdsFromCarRepository,
  ICreateCarSpecificationRepository,
  IDeleteCarSpecificationByIdRepository,
  IFindAllCarSpecificationsRepository,
  IFindAllSpecificationsByIdsRepository,
  IFindCarSpecificationByIdRepository,
  IRelateCarSpecificationsToCarRepository,
  IUpdateCarSpecificationRepository,
} from '@application/protocols/repositories/car/specification';

import { makeCarSpecificationMock } from '../../../../domain/entities';

export class CheckIfCarSpecificationExistsByNameRepositorySpy
  implements ICheckIfCarSpecificationExistsByNameRepository
{
  async checkIfExistsByName(
    _: ICheckIfCarSpecificationExistsByNameRepository.Input
  ): Promise<ICheckIfCarSpecificationExistsByNameRepository.Output> {
    return false;
  }
}

export class CreateCarSpecificationRepositorySpy
  implements ICreateCarSpecificationRepository
{
  async create(
    data: ICreateCarSpecificationRepository.Input
  ): Promise<ICreateCarSpecificationRepository.Output> {
    const { name, description } = data;

    const carSpecificationMock = makeCarSpecificationMock();

    Object.assign(carSpecificationMock, { name, description });

    return carSpecificationMock;
  }
}

export class FindCarSpecificationByIdRepositorySpy
  implements IFindCarSpecificationByIdRepository
{
  async findById(
    data: IFindCarSpecificationByIdRepository.Input
  ): Promise<IFindCarSpecificationByIdRepository.Output> {
    const { id } = data;

    const carSpecificationMock = makeCarSpecificationMock();

    Object.assign(carSpecificationMock, { id });

    return carSpecificationMock;
  }
}

export class UpdateCarSpecificationRepositorySpy
  implements IUpdateCarSpecificationRepository
{
  async update(
    data: IUpdateCarSpecificationRepository.Input
  ): Promise<IUpdateCarSpecificationRepository.Output> {
    const { id, description, name } = data;

    const carSpecificationMock = makeCarSpecificationMock();

    Object.assign(carSpecificationMock, { id, description, name });

    return carSpecificationMock;
  }
}

export class FindAllCarSpecificationsRepositorySpy
  implements IFindAllCarSpecificationsRepository
{
  async findAll(
    _: IFindAllCarSpecificationsRepository.Input
  ): Promise<IFindAllCarSpecificationsRepository.Output> {
    return [];
  }
}

export class DeleteCarSpecificationByIdRepositorySpy
  implements IDeleteCarSpecificationByIdRepository
{
  async deleteById(
    _: IDeleteCarSpecificationByIdRepository.Input
  ): Promise<IDeleteCarSpecificationByIdRepository.Output> {
    // That's all folks 🥕
  }
}

export class CheckIfCarSpecificationExistsByIdRepositorySpy
  implements ICheckIfCarSpecificationExistsByIdRepository
{
  async checkIfExistsById(
    _: ICheckIfCarSpecificationExistsByIdRepository.Input
  ): Promise<ICheckIfCarSpecificationExistsByIdRepository.Output> {
    return true;
  }
}

export class FindAllSpecificationsByIdsRepositorySpy
  implements IFindAllSpecificationsByIdsRepository
{
  async findAllByIds(
    data: IFindAllSpecificationsByIdsRepository.Input
  ): Promise<IFindAllSpecificationsByIdsRepository.Output> {
    return data.ids.map(id => {
      const carSpecificationMock = makeCarSpecificationMock();

      Object.assign(carSpecificationMock, { id });

      return carSpecificationMock;
    });
  }
}

export class CheckIfAllCarSpecificationsExistsByIdsRepositorySpy
  implements ICheckIfAllCarSpecificationsExistsByIdsRepository
{
  async checkIfAllExistsByIds(
    _: ICheckIfAllCarSpecificationsExistsByIdsRepository.Input
  ): Promise<ICheckIfAllCarSpecificationsExistsByIdsRepository.Output> {
    return true;
  }
}

export class CheckIfSomeCarSpecificationExistsByIdsFromCarRepositorySpy
  implements ICheckIfSomeCarSpecificationExistsByIdsFromCarRepository
{
  async checkIfSomeExistsByIdsFromCar(
    _: ICheckIfSomeCarSpecificationExistsByIdsFromCarRepository.Input
  ): Promise<ICheckIfSomeCarSpecificationExistsByIdsFromCarRepository.Output> {
    return false;
  }
}

export class RelateCarSpecificationsToCarRepositorySpy
  implements IRelateCarSpecificationsToCarRepository
{
  async relateToCar(
    _: IRelateCarSpecificationsToCarRepository.Input
  ): Promise<IRelateCarSpecificationsToCarRepository.Output> {
    // That's all folks 🐰
  }
}
