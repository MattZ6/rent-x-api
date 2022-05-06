import {
  ICheckIfCarSpecificationExistsByIdRepository,
  ICheckIfCarSpecificationExistsByNameRepository,
  ICreateCarSpecificationRepository,
  IDeleteCarSpecificationByIdRepository,
  IFindAllCarSpecificationsRepository,
  IFindAllSpecificationsByIdsRepository,
  IFindCarSpecificationByIdRepository,
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
    IFindAllSpecificationsByIdsRepository
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
      take,
      skip,
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

    return count >= 1;
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
}
