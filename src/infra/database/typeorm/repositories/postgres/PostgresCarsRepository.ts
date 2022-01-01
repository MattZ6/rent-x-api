import { getRepository, Raw, Repository } from 'typeorm';

import { ICheckIfCarExistsByLicensePlateRepository } from '@data/protocols/repositories/car';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';

export class PostgresCarsRepository
  implements ICheckIfCarExistsByLicensePlateRepository
{
  private readonly repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async checkIfExistsByLicensePlate(license_plate: string): Promise<boolean> {
    const count = await this.repository.count({
      where: {
        license_plate: Raw(field => `LOWER(${field}) = LOWER(:value)`, {
          value: license_plate,
        }),
      },
    });

    return count >= 1;
  }
}
