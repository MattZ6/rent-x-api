import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { IGetAllAvailableDTO } from '../dtos/IGetAllAvailableDTO';
import { Car } from '../infra/typeorm/entities/Car';

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car | undefined>;
  allAvailable(data: IGetAllAvailableDTO): Promise<Car[]>;
}
