import { Car } from '@domain/entities/Car';
import { CarBrand } from '@domain/entities/CarBrand';
import { Rent } from '@domain/entities/Rent';

import { CarMapper } from '../car';

export namespace RentMapper {
  type Input = Rent & {
    car?: Car & {
      brand?: CarBrand;
    };
  };

  export type ScheduleItemDTO = {
    start_date: Date;
    expected_return_date: Date;
  };

  export function toScheduleItemDTO(data: Input): RentMapper.ScheduleItemDTO {
    return {
      start_date: data.start_date,
      expected_return_date: data.expected_return_date,
    };
  }

  export type ScheduleDTO = ScheduleItemDTO[];

  export function toScheduleDTO(data: Input[]): RentMapper.ScheduleDTO {
    return data.map(RentMapper.toScheduleItemDTO);
  }

  export type RentListItemDTO = {
    id: string;
    start_date: Date;
    expected_return_date: Date;
    daily_date: number;
    car: CarMapper.CarListItemDTO;
  };

  export function toRentListItemDTO(data: Input): RentMapper.RentListItemDTO {
    return {
      id: data.id,
      start_date: data.start_date,
      expected_return_date: data.expected_return_date,
      daily_date: data.daily_rate,
      car: CarMapper.toListItemDTO(data.car),
    };
  }

  export function toRentListItemsDTO(
    data: Input[]
  ): RentMapper.RentListItemDTO[] {
    return data.map(RentMapper.toRentListItemDTO);
  }
}
