import { Rent } from '@domain/entities/Rent';

interface IFindAllRentsFromCarRepository {
  findAllFromCar(
    data: IFindAllRentsFromCarRepository.Input
  ): Promise<IFindAllRentsFromCarRepository.Output>;
}

namespace IFindAllRentsFromCarRepository {
  export type Input = {
    car_id: string;
    start: Date;
  };

  export type Output = Rent[];
}

export { IFindAllRentsFromCarRepository };
