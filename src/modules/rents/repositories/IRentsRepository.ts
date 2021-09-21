import { ICreateRentDTO } from '../dtos/ICreateRentDTO';
import { Rent } from '../infra/typeorm/entities/Rent';

export interface IRentsRepository {
  findOpenRentByCarId(car_id: string): Promise<Rent | undefined>;
  findOpenRentByUserId(user_id: string): Promise<Rent | undefined>;
  create(data: ICreateRentDTO): Promise<Rent>;
}
