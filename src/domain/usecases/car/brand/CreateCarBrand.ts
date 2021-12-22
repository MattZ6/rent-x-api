import { ICarBrand } from '@domain/models/CarBrand';

export interface ICreateCarBrandUseCase {
  execute(
    data: ICreateCarBrandUseCase.Input
  ): Promise<ICreateCarBrandUseCase.Output>;
}

export namespace ICreateCarBrandUseCase {
  export type Input = {
    name: string;
  };

  export type Output = ICarBrand;
}
