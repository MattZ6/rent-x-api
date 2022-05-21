import {
  Car,
  CarTransmissionTypeEnum,
  CarTypeOfFuelEnum,
} from '@domain/entities/Car';

interface IFindAllAvailableCarsRepository {
  findAllAvailable(
    data: IFindAllAvailableCarsRepository.Input
  ): Promise<IFindAllAvailableCarsRepository.Output>;
}

namespace IFindAllAvailableCarsRepository {
  export type SortBy = keyof Pick<
    Car,
    'name' | 'created_at' | 'horse_power' | 'number_of_seats' | 'max_speed'
  >;
  export type OrderBy = 'asc' | 'desc';
  export type Take = number;
  export type Skip = number;

  export type Input = {
    brand_id?: string;
    category_id?: string;
    type_of_fuel?: CarTypeOfFuelEnum;
    transmission_type?: CarTransmissionTypeEnum;
    min_daily_rate?: number;
    max_daily_rate?: number;
    search?: string;
    start_date?: Date;
    end_date?: Date;
    include?: {
      brand?: boolean;
      category?: boolean;
    };
    sort_by: SortBy;
    order_by: OrderBy;
    take: Take;
    skip: Skip;
  };

  export type Output = Car[];
}

export { IFindAllAvailableCarsRepository };
