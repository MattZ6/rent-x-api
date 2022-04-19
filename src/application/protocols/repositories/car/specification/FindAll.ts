import { CarSpecification } from '@domain/entities/CarSpecification';

interface IFindAllCarSpecificationsRepository {
  findAll(
    data: IFindAllCarSpecificationsRepository.Input
  ): Promise<IFindAllCarSpecificationsRepository.Output>;
}

namespace IFindAllCarSpecificationsRepository {
  export type SortBy = keyof Pick<CarSpecification, 'name' | 'created_at'>;
  export type OrderBy = 'asc' | 'desc';
  export type Take = number;
  export type Skip = number;

  export type Input = {
    sort_by: SortBy;
    order_by: OrderBy;
    take: Take;
    skip: Skip;
  };

  export type Output = CarSpecification[];
}

export { IFindAllCarSpecificationsRepository };
