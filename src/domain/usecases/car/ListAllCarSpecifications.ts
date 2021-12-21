import { ICarSpecification } from '@domain/models/CarSpecification';

export interface IListAllCarSpecificationsUseCase {
  execute(
    data: IListAllCarSpecificationsUseCase.Input
  ): Promise<IListAllCarSpecificationsUseCase.Output>;
}

export namespace IListAllCarSpecificationsUseCase {
  export type Input = {
    limit?: number;
    page?: number;
  };

  export type Output = ICarSpecification[];
}
