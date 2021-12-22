import { ICarBrand } from '@domain/models/CarBrand';

export interface IUpdateCarBrandUseCase {
  execute(
    data: IUpdateCarBrandUseCase.Input
  ): Promise<IUpdateCarBrandUseCase.Output>;
}

export namespace IUpdateCarBrandUseCase {
  export type Input = {
    id: string;
    name: string;
  };

  export type Output = ICarBrand;
}
