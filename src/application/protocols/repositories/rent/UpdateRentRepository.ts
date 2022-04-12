import { IRent } from '@domain/models/Rent';

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
