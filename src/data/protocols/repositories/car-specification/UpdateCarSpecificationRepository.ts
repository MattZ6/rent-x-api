import { ICarSpecification } from '@domain/models/CarSpecification';

export interface IUpdateCarSpecificationRepository {
  update(data: ICarSpecification): Promise<ICarSpecification>;
}
