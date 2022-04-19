import { Car } from '@domain/entities/Car';

interface ICreateCarUseCase {
  execute(data: ICreateCarUseCase.Input): Promise<ICreateCarUseCase.Output>;
}

namespace ICreateCarUseCase {
  export type Input = Pick<
    Car,
    | 'brand_id'
    | 'category_id'
    | 'license_plate'
    | 'daily_late_fee'
    | 'daily_rate'
    | 'description'
    | 'horse_power'
    | 'max_speed'
    | 'name'
    | 'number_of_seats'
    | 'transmission_type'
    | 'type_of_fuel'
    | 'zero_to_one_hundred_in_millisseconds'
  > & {
    specifications_ids?: string[];
  };

  export type Output = Car;
}

export { ICreateCarUseCase };
