import { getRepository, IsNull, Repository } from 'typeorm';

import { ICreateRentDTO } from '@modules/rents/dtos/ICreateRentDTO';
import { IRentsRepository } from '@modules/rents/repositories/IRentsRepository';

import { Rent } from '../entities/Rent';

export class RentsRepository implements IRentsRepository {
  private repository: Repository<Rent>;

  constructor() {
    this.repository = getRepository(Rent);
  }

  findOpenRentByCarId(car_id: string): Promise<Rent | undefined> {
    return this.repository.findOne({
      where: {
        car_id,
        end_date: IsNull(),
      },
    });
  }

  findOpenRentByUserId(user_id: string): Promise<Rent | undefined> {
    return this.repository.findOne({
      where: {
        user_id,
        end_date: IsNull(),
      },
    });
  }

  create(data: ICreateRentDTO): Promise<Rent> {
    const { car_id, user_id, expected_return_date, start_date } = data;

    const rent = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      start_date,
    });

    return this.repository.save(rent);
  }
}
