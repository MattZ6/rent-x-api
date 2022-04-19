import { Rent } from '@domain/entities/Rent';

interface IFindRentalByIdRepository {
  findById(
    data: IFindRentalByIdRepository.Input
  ): Promise<IFindRentalByIdRepository.Output>;
}

namespace IFindRentalByIdRepository {
  export type Input = Pick<Rent, 'id'>;

  export type Output = Rent | null;
}

export { IFindRentalByIdRepository };
