import { ICar } from '@domain/models/Car';

export interface ICreateCarUseCase {
  execute(data: ICreateCarUseCase.Input): Promise<ICreateCarUseCase.Output>;
}

export namespace ICreateCarUseCase {
  export type Input = Pick<
    ICar,
    | 'name'
    | 'description'
    | 'license_plate'
    | 'daily_rate'
    | 'daily_late_fee'
    | 'brand_id'
    | 'category_id'
    | 'number_of_seats'
    | 'max_speed'
    | 'horse_power'
    | 'zero_to_one_hundred_in_millisseconds'
    | 'type_of_fuel'
    | 'transmission_type'
  > & {
    specifications_ids?: string[];
  };

  export type Output = ICar;
}
