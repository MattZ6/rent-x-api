import { ICarSpecification } from '@domain/models/CarSpecification';

export type CreateCarSpecificationDTO = {
  name: string;
  description: string;
};

export interface ICreateCarSpecificationRepository {
  create(data: CreateCarSpecificationDTO): Promise<ICarSpecification>;
}
