import {
  ICheckIfCarExistsByIdRepository,
  ICheckIfCarExistsByLicensePlateRepository,
  ICreateCarRepository,
  IFindAllAvailableCarsRepository,
  IFindAllCarsRepository,
  IFindCarByIdRepository,
} from '@application/protocols/repositories/car';

import { prisma } from '..';

export class PrismaCarsRepository
  implements
    ICheckIfCarExistsByLicensePlateRepository,
    ICreateCarRepository,
    IFindAllCarsRepository,
    IFindCarByIdRepository,
    ICheckIfCarExistsByIdRepository,
    IFindAllAvailableCarsRepository
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
    const {
      sort_by,
      order_by,
      take,
      skip,
      brand_id,
      category_id,
      include,
      min_daily_rate,
      max_daily_rate,
      transmission_type,
      type_of_fuel,
    } = data;

    const cars = await prisma.car.findMany({
      orderBy: { [sort_by]: order_by },
      take: Number(take),
      skip: Number(skip),
      where: {
        transmission_type: {
          equals: transmission_type,
        },
        type_of_fuel: {
          equals: type_of_fuel,
        },
        brand_id: {
          equals: brand_id,
        },
        category_id: {
          equals: category_id,
        },
        daily_rate: {
          gte: min_daily_rate ? Number(min_daily_rate) : undefined,
          lte: max_daily_rate ? Number(max_daily_rate) : undefined,
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
        images: include?.images,
      },
    });

    return car;
  }

  async checkIfExistsById(
    data: ICheckIfCarExistsByIdRepository.Input
  ): Promise<ICheckIfCarExistsByIdRepository.Output> {
    const { id } = data;

    const count = await prisma.car.count({
      where: {
        id: {
          equals: id,
        },
      },
    });

    return count > 0;
  }

  async findAllAvailable(
    data: IFindAllAvailableCarsRepository.Input
  ): Promise<IFindAllAvailableCarsRepository.Output> {
    const {
      sort_by,
      order_by,
      take,
      skip,
      brand_id,
      category_id,
      include,
      min_daily_rate,
      max_daily_rate,
      transmission_type,
      type_of_fuel,
      start_date,
      end_date,
      search,
    } = data;

    const start = start_date ? new Date(start_date) : undefined;
    const end = end_date ? new Date(end_date) : undefined;

    const cars = await prisma.car.findMany({
      orderBy: { [sort_by]: order_by },
      take: Number(take),
      skip: Number(skip),
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
        transmission_type: {
          equals: transmission_type,
        },
        type_of_fuel: {
          equals: type_of_fuel,
        },
        brand_id: {
          equals: brand_id,
        },
        category_id: {
          equals: category_id,
        },
        daily_rate: {
          gte: min_daily_rate ? Number(min_daily_rate) : undefined,
          lte: max_daily_rate ? Number(max_daily_rate) : undefined,
        },
        rents: {
          none: {
            start_date: {
              gte: start,
              lte: end,
            },
            expected_return_date: {
              gte: start,
              lte: end,
            },
          },
        },
      },
      include,
    });

    return cars;
  }
}
