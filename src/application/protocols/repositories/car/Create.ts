import { Car } from '@domain/entities/Car';

interface ICreateCarRepository {
  create(
    data: ICreateCarRepository.Input
  ): Promise<ICreateCarRepository.Output>;
}

namespace ICreateCarRepository {
  export type Input = Pick<
    Car,
    | 'brand_id'
    | 'category_id'
    | 'name'
    | 'description'
    | 'daily_late_fee'
    | 'daily_rate'
    | 'horse_power'
    | 'license_plate'
    | 'max_speed'
    | 'number_of_seats'
    | 'transmission_type'
    | 'type_of_fuel'
    | 'zero_to_one_hundred_in_millisseconds'
  >;

  export type Output = Car;
}

export { ICreateCarRepository };
