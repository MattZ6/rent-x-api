import { Rent } from '@domain/entities/Rent';

interface IGetCarScheduleUseCase {
  execute(
    data: IGetCarScheduleUseCase.Input
  ): Promise<IGetCarScheduleUseCase.Output>;
}

namespace IGetCarScheduleUseCase {
  export type Input = {
    car_id: string;
  };

  export type Output = Rent[];
}

export { IGetCarScheduleUseCase };
