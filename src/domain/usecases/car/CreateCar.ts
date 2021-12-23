import { ICar } from '@domain/models/Car';

export interface ICreateCarUseCase {
  execute(data: ICreateCarUseCase.Input): Promise<ICreateCarUseCase.Output>;
}

export namespace ICreateCarUseCase {
  export type Input = {
    name: string;
    description: string;
    license_plate: string;
    daily_rate: number;
    fine_amount: number;
    brand_id: string;
    category_id: string;
    specifications_ids?: string[];
  };

  export type Output = ICar;
}
