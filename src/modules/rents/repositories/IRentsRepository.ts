import { ICreateRentDTO } from '../dtos/ICreateRentDTO';
import { Rent } from '../infra/typeorm/entities/Rent';

export interface IRentsRepository {
  findById(id: string): Promise<Rent | undefined>;
  findOpenRentByCarId(car_id: string): Promise<Rent | undefined>;
  findOpenRentByUserId(user_id: string): Promise<Rent | undefined>;
  create(data: ICreateRentDTO): Promise<Rent>;
  update(data: Rent): Promise<Rent>;
}
