import {
  ICheckIfCarCategoryExistsByIdRepository,
  ICheckIfCarCategoryExistsByNameRepository,
  ICreateCarCategoryRepository,
  IFindAllCarCategoriesRepository,
  IFindCarCategoryByIdRepository,
  IUpdateCarCategoryRepository,
} from '@application/protocols/repositories/car';

import { prisma } from '..';

export class PrismaCarCategoriesRepository
  implements
    ICheckIfCarCategoryExistsByNameRepository,
    ICreateCarCategoryRepository,
    IFindCarCategoryByIdRepository,
    IUpdateCarCategoryRepository,
    IFindAllCarCategoriesRepository,
    ICheckIfCarCategoryExistsByIdRepository
{
  async checkIfExistsByName(
    data: ICheckIfCarCategoryExistsByNameRepository.Input
  ): Promise<ICheckIfCarCategoryExistsByNameRepository.Output> {
    const { name } = data;

    const count = await prisma.carCategory.count({
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
    data: ICreateCarCategoryRepository.Input
  ): Promise<ICreateCarCategoryRepository.Output> {
    const { name, description } = data;

    const carCategory = await prisma.carCategory.create({
      data: {
        name,
        description,
      },
    });

    return carCategory;
  }

  async findById(
    data: IFindCarCategoryByIdRepository.Input
  ): Promise<IFindCarCategoryByIdRepository.Output> {
    const { id } = data;

    const carCategory = await prisma.carCategory.findUnique({
      where: { id },
    });

    return carCategory;
  }

  async update(
    data: IUpdateCarCategoryRepository.Input
  ): Promise<IUpdateCarCategoryRepository.Output> {
    const { id, name, description } = data;

    const carCategory = await prisma.carCategory.update({
      where: { id },
      data: { name, description },
    });

    return carCategory;
  }

  async findAll(
    data: IFindAllCarCategoriesRepository.Input
  ): Promise<IFindAllCarCategoriesRepository.Output> {
    const { order_by, sort_by, take, skip } = data;

    const carCategories = await prisma.carCategory.findMany({
      orderBy: { [order_by]: sort_by },
      take,
      skip,
    });

    return carCategories;
  }

  async checkIfExistsById(
    data: ICheckIfCarCategoryExistsByIdRepository.Input
  ): Promise<ICheckIfCarCategoryExistsByIdRepository.Output> {
    const { id } = data;

    const count = await prisma.carCategory.count({
      where: {
        id: {
          equals: id,
        },
      },
    });

    return count >= 1;
  }
}
