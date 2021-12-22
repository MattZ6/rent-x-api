import { ICarSpecification } from '@domain/models/CarSpecification';

export type FindAllCarSpecificationsDTO = {
  take: number;
  skip: number;
};

export interface IFindAllCarSpecificationsRepository {
  findAll(data: FindAllCarSpecificationsDTO): Promise<ICarSpecification[]>;
}
