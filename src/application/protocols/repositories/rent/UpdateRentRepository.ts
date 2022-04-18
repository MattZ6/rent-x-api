import { IRent } from '@domain/entities/Rent';

interface IUpdateRentRepository {
  update(
    data: IUpdateRentRepository.Input
  ): Promise<IUpdateRentRepository.Output>;
}

namespace IUpdateRentRepository {
  export type Input = IRent;

  export type Output = IRent;
}

export { IUpdateRentRepository };
