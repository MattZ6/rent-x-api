import { ICreateRentDTO } from '@modules/rents/dtos/ICreateRentDTO';
import { Rent } from '@modules/rents/infra/typeorm/entities/Rent';

import { IRentsRepository } from '../IRentsRepository';

export class InMemoryRentsRepository implements IRentsRepository {
  private rents: Rent[] = [];

  async findOpenRentByUserId(user_id: string): Promise<Rent | undefined> {
    return this.rents.find(rent => rent.user_id === user_id && !rent.end_date);
  }

  async findOpenRentByCarId(car_id: string): Promise<Rent | undefined> {
    return this.rents.find(rent => rent.car_id === car_id && !rent.end_date);
  }

  async create(data: ICreateRentDTO): Promise<Rent> {
    const { user_id, car_id, start_date, expected_return_date } = data;

    const rent = new Rent();

    Object.assign(rent, {
      user_id,
      car_id,
      start_date,
      expected_return_date,
      created_at: new Date(),
      updated_at: new Date(),
    } as Rent);

    this.rents.push(rent);

    return rent;
  }
}
