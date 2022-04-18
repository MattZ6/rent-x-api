import { ICarSpecification } from '@domain/entities/CarSpecification';

interface IFindAllCarSpecificationsRepository {
  findAll(
    data: IFindAllCarSpecificationsRepository.Input
  ): Promise<IFindAllCarSpecificationsRepository.Output>;
}

namespace IFindAllCarSpecificationsRepository {
  export type Input = {
    take: number;
    skip: number;
    order_by: keyof Pick<ICarSpecification, 'name' | 'created_at'>;
    order: 'ASC' | 'DESC';
  };

  export type Output = ICarSpecification[];
}

export { IFindAllCarSpecificationsRepository };
