import {
  ICheckIfCarBrandExistsByIdRepository,
  ICheckIfCarBrandExistsByNameRepository,
  ICreateCarBrandRepository,
  IFindAllCarBrandsRepository,
  IFindCarBrandByIdRepository,
  IUpdateCarBrandRepository,
} from '@application/protocols/repositories/car';

import { prisma } from '..';

export class PrismaCarBrandsRepository
  implements
    ICheckIfCarBrandExistsByNameRepository,
    ICreateCarBrandRepository,
    IFindCarBrandByIdRepository,
    IUpdateCarBrandRepository,
    IFindAllCarBrandsRepository,
    ICheckIfCarBrandExistsByIdRepository
{
  async checkIfExistsByName(
    data: ICheckIfCarBrandExistsByNameRepository.Input
  ): Promise<ICheckIfCarBrandExistsByNameRepository.Output> {
    const { name } = data;

    const count = await prisma.carBrand.count({
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
    data: ICreateCarBrandRepository.Input
  ): Promise<ICreateCarBrandRepository.Output> {
    const { name } = data;

    const carBrand = await prisma.carBrand.create({ data: { name } });

    return carBrand;
  }

  async findById(
    data: IFindCarBrandByIdRepository.Input
  ): Promise<IFindCarBrandByIdRepository.Output> {
    const { id } = data;

    const carBrand = await prisma.carBrand.findUnique({ where: { id } });

    return carBrand;
  }

  async update(
    data: IUpdateCarBrandRepository.Input
  ): Promise<IUpdateCarBrandRepository.Output> {
    const { id, name } = data;

    const carBrand = await prisma.carBrand.update({
      where: { id },
      data: { name },
    });

    return carBrand;
  }

  async findAll(
    data: IFindAllCarBrandsRepository.Input
  ): Promise<IFindAllCarBrandsRepository.Output> {
    const { order_by, sort_by, take, skip } = data;

    const carBrands = await prisma.carBrand.findMany({
      orderBy: { [sort_by]: order_by },
      take: Number(take),
      skip: Number(skip),
    });

    return carBrands;
  }

  async checkIfExistsById(
    data: ICheckIfCarBrandExistsByIdRepository.Input
  ): Promise<ICheckIfCarBrandExistsByIdRepository.Output> {
    const { id } = data;

    const count = await prisma.carBrand.count({
      where: {
        id: {
          equals: id,
        },
      },
    });

    return count >= 1;
  }
}
