import { ICarSpecification } from '@domain/models/CarSpecification';

export type FindAllCarSpecificationsDTO = {
  take: number;
  skip: number;
  order_by: keyof Pick<ICarSpecification, 'name' | 'created_at'>;
  order: 'ASC' | 'DESC';
};

export interface IFindAllCarSpecificationsRepository {
  findAll(data: FindAllCarSpecificationsDTO): Promise<ICarSpecification[]>;
}
