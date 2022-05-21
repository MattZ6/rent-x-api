import {
  Car,
  CarTransmissionTypeEnum,
  CarTypeOfFuelEnum,
} from '@domain/entities/Car';

interface IListAllAvailableCarsUseCase {
  execute(
    data: IListAllAvailableCarsUseCase.Input
  ): Promise<IListAllAvailableCarsUseCase.Output>;
}

namespace IListAllAvailableCarsUseCase {
  export type SortBy = keyof Pick<
    Car,
    'name' | 'created_at' | 'horse_power' | 'number_of_seats' | 'max_speed'
  >;
  export type OrderBy = 'asc' | 'desc';
  export type Limit = number;
  export type Offset = number;

  export type Input = {
    sort_by?: SortBy;
    order_by?: OrderBy;
    brand_id?: string;
    category_id?: string;
    type_of_fuel?: CarTypeOfFuelEnum;
    transmission_type?: CarTransmissionTypeEnum;
    min_daily_rate?: number;
    max_daily_rate?: number;
    search?: string;
    start_date?: Date;
    end_date?: Date;
    limit?: Limit;
    offset?: Offset;
  };

  export type Output = Car[];
}

export { IListAllAvailableCarsUseCase };
