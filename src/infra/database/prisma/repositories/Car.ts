import {
  ICheckIfCarExistsByLicensePlateRepository,
  ICreateCarRepository,
  IFindAllCarsRepository,
  IFindCarByIdRepository,
} from '@application/protocols/repositories/car';

import { prisma } from '..';

export class PrismaCarsRepository
  implements
    ICheckIfCarExistsByLicensePlateRepository,
    ICreateCarRepository,
    IFindAllCarsRepository,
    IFindCarByIdRepository
{
  async checkIfExistsByLicensePlate(
    data: ICheckIfCarExistsByLicensePlateRepository.Input
  ): Promise<ICheckIfCarExistsByLicensePlateRepository.Output> {
    const { license_plate } = data;

    const count = await prisma.car.count({
      where: {
        license_plate: {
          equals: license_plate,
          mode: 'insensitive',
        },
      },
    });

    return count >= 1;
  }

  async create(
    data: ICreateCarRepository.Input
  ): Promise<ICreateCarRepository.Output> {
    const {
      name,
      description,
      brand_id,
      category_id,
      daily_late_fee,
      daily_rate,
      horse_power,
      license_plate,
      max_speed,
      number_of_seats,
      transmission_type,
      type_of_fuel,
      zero_to_one_hundred_in_millisseconds,
      specifications_ids,
    } = data;

    const car = await prisma.car.create({
      data: {
        name,
        description,
        brand_id,
        category_id,
        daily_late_fee,
        daily_rate,
        horse_power,
        license_plate,
        max_speed,
        number_of_seats,
        transmission_type,
        type_of_fuel,
        zero_to_one_hundred_in_millisseconds,
        cars_specifications: {
          createMany: {
            skipDuplicates: true,
            data: specifications_ids.map(specification_id => ({
              specification_id,
            })),
          },
        },
      },
    });

    return car;
  }

  async findAll(
    data: IFindAllCarsRepository.Input
  ): Promise<IFindAllCarsRepository.Output> {
    const { sort_by, order_by, take, skip, brand_id, category_id, include } =
      data;

    const cars = await prisma.car.findMany({
      orderBy: { [sort_by]: order_by },
      take: Number(take),
      skip: Number(skip),
      where: {
        brand_id: {
          equals: brand_id,
        },
        category_id: {
          equals: category_id,
        },
      },
      include,
    });

    return cars;
  }

  async findById(
    data: IFindCarByIdRepository.Input
  ): Promise<IFindCarByIdRepository.Output> {
    const { id, include } = data;

    const car = await prisma.car.findUnique({
      where: { id },
      include: {
        brand: include?.brand,
        category: include?.category,
        cars_specifications: include?.specifications,
      },
    });

    return car;
  }
}
