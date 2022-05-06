import { ListAllCarSpecificationsUseCase } from '@application/usecases/car/specification/ListAll';

import { carSpecificationConfig } from '@main/config/environment/carSpecification';
import { makeCarSpecificationsRepository } from '@main/factories/repositories/CarSpecification';

export function makeListAllCarSpecificationsUseCase() {
  const carSpecificationsRepository = makeCarSpecificationsRepository();

  return new ListAllCarSpecificationsUseCase(
    carSpecificationConfig.DEFAULT_SORT_BY,
    carSpecificationConfig.DEFAULT_ORDER_BY,
    carSpecificationConfig.DEFAULT_LIMIT,
    carSpecificationConfig.DEFAULT_OFFSET,
    carSpecificationsRepository
  );
}
