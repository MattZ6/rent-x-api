import { CarSpecification } from '@domain/entities/CarSpecification';

interface IUpdateCarSpecificationRepository {
  update(
    data: IUpdateCarSpecificationRepository.Input
  ): Promise<IUpdateCarSpecificationRepository.Output>;
}

namespace IUpdateCarSpecificationRepository {
  export type Input = Pick<CarSpecification, 'id'> &
    Pick<Partial<CarSpecification>, 'name' | 'description'>;

  export type Output = CarSpecification;
}

export { IUpdateCarSpecificationRepository };
