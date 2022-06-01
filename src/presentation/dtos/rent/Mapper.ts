import { Rent } from '@domain/entities/Rent';

export namespace RentMapper {
  type Input = Rent;

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
}
