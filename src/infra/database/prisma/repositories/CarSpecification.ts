import {
  ICheckIfAllCarSpecificationsExistsByIdsRepository,
  ICheckIfCarSpecificationExistsByIdFromCarRepository,
  ICheckIfCarSpecificationExistsByIdRepository,
  ICheckIfCarSpecificationExistsByNameRepository,
  ICheckIfSomeCarSpecificationExistsByIdsFromCarRepository,
  ICreateCarSpecificationRepository,
  IDeleteCarSpecificationByIdRepository,
  IFindAllCarSpecificationsRepository,
  IFindAllSpecificationsByIdsRepository,
  IFindCarSpecificationByIdRepository,
  IRelateCarSpecificationsToCarRepository,
  IRemoveCarSpecificationsFromCarRepository,
  IUpdateCarSpecificationRepository,
} from '@application/protocols/repositories/car';

import { prisma } from '..';

export class PrismaCarSpecificationsRepository
  implements
    ICheckIfCarSpecificationExistsByNameRepository,
    ICreateCarSpecificationRepository,
    IFindCarSpecificationByIdRepository,
    IUpdateCarSpecificationRepository,
    IFindAllCarSpecificationsRepository,
    ICheckIfCarSpecificationExistsByIdRepository,
    IDeleteCarSpecificationByIdRepository,
    IFindAllSpecificationsByIdsRepository,
    ICheckIfAllCarSpecificationsExistsByIdsRepository,
    ICheckIfSomeCarSpecificationExistsByIdsFromCarRepository,
    IRelateCarSpecificationsToCarRepository,
    ICheckIfCarSpecificationExistsByIdFromCarRepository,
    IRemoveCarSpecificationsFromCarRepository
{
  async checkIfExistsByName(
    data: ICheckIfCarSpecificationExistsByNameRepository.Input
  ): Promise<ICheckIfCarSpecificationExistsByNameRepository.Output> {
    const { name } = data;

    const count = await prisma.carSpecification.count({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });

    return count >= 1;
  }

  async create(
    data: ICreateCarSpecificationRepository.Input
  ): Promise<ICreateCarSpecificationRepository.Output> {
    const { name, description } = data;

    const carSpecification = await prisma.carSpecification.create({
      data: { name, description },
    });

    return carSpecification;
  }

  async findById(
    data: IFindCarSpecificationByIdRepository.Input
  ): Promise<IFindCarSpecificationByIdRepository.Output> {
    const { id } = data;

    const carSpecification = await prisma.carSpecification.findUnique({
      where: { id },
    });

    return carSpecification;
  }

  async update(
    data: IUpdateCarSpecificationRepository.Input
  ): Promise<IUpdateCarSpecificationRepository.Output> {
    const { id, name, description } = data;

    const carSpecification = await prisma.carSpecification.update({
      where: { id },
      data: { name, description },
    });

    return carSpecification;
  }

  async findAll(
    data: IFindAllCarSpecificationsRepository.Input
  ): Promise<IFindAllCarSpecificationsRepository.Output> {
    const { sort_by, order_by, take, skip } = data;

    const carSpecifications = await prisma.carSpecification.findMany({
      orderBy: { [sort_by]: order_by },
      take: Number(take),
      skip: Number(skip),
    });

    return carSpecifications;
  }

  async checkIfExistsById(
    data: ICheckIfCarSpecificationExistsByIdRepository.Input
  ): Promise<ICheckIfCarSpecificationExistsByIdRepository.Output> {
    const { id } = data;

    const count = await prisma.carSpecification.count({
      where: {
        id: {
          equals: id,
        },
      },
    });

    return count > 0;
  }

  async deleteById(
    data: IDeleteCarSpecificationByIdRepository.Input
  ): Promise<IDeleteCarSpecificationByIdRepository.Output> {
    const { id } = data;

    await prisma.carSpecification.delete({
      where: { id },
    });
  }

  async findAllByIds(
    data: IFindAllSpecificationsByIdsRepository.Input
  ): Promise<IFindAllSpecificationsByIdsRepository.Output> {
    const { ids } = data;

    const carSpecifications = await prisma.carSpecification.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return carSpecifications;
  }

  async checkIfAllExistsByIds(
    data: ICheckIfAllCarSpecificationsExistsByIdsRepository.Input
  ): Promise<ICheckIfAllCarSpecificationsExistsByIdsRepository.Output> {
    const { ids } = data;

    const count = await prisma.carSpecification.count({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return count === ids.length;
  }

  async checkIfSomeExistsByIdsFromCar(
    data: ICheckIfSomeCarSpecificationExistsByIdsFromCarRepository.Input
  ): Promise<ICheckIfSomeCarSpecificationExistsByIdsFromCarRepository.Output> {
    const { car_id, specifications_ids } = data;

    const count = await prisma.carsSpecifications.count({
      where: {
        car_id: {
          equals: car_id,
        },
        specification_id: {
          in: specifications_ids,
        },
      },
    });

    return count > 0;
  }

  async relateToCar(
    data: IRelateCarSpecificationsToCarRepository.Input
  ): Promise<IRelateCarSpecificationsToCarRepository.Output> {
    const { car_id, specifications_ids } = data;

    await prisma.carsSpecifications.createMany({
      skipDuplicates: true,
      data: specifications_ids.map(specification_id => ({
        car_id,
        specification_id,
      })),
    });
  }

  async checkIfExistsByIdFromCar(
    data: ICheckIfCarSpecificationExistsByIdFromCarRepository.Input
  ): Promise<ICheckIfCarSpecificationExistsByIdFromCarRepository.Output> {
    const { car_id, specification_id } = data;

    const count = await prisma.carsSpecifications.count({
      where: {
        car_id: {
          equals: car_id,
        },
        specification_id: {
          equals: specification_id,
        },
      },
    });

    return count > 0;
  }

  async removeFromCar(
    data: IRemoveCarSpecificationsFromCarRepository.Input
  ): Promise<IRemoveCarSpecificationsFromCarRepository.Output> {
    const { car_id, specification_id } = data;

    await prisma.carsSpecifications.delete({
      where: {
        car_id_specification_id: {
          car_id,
          specification_id,
        },
      },
    });
  }
}
