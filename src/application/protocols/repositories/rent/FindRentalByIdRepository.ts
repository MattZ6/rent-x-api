import { IRent } from '@domain/models/Rent';

interface IFindRentalByIdRepository {
  findById(
    data: IFindRentalByIdRepository.Input
  ): Promise<IFindRentalByIdRepository.Output>;
}

namespace IFindRentalByIdRepository {
  export type Input = {
    id: string;
  };

  export type Output = IRent | undefined;
}

export { IFindRentalByIdRepository };
