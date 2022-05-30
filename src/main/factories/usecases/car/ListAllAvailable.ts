import { ListAllAvailableCarsUseCase } from '@application/usecases/car/ListAllAvailable';

import { carConfig } from '@main/config/environment/car';
import { makeCarsRepository } from '@main/factories/repositories/Car';

export function makeListAllAvailableCarsUseCase() {
  const carsRepository = makeCarsRepository();

  return new ListAllAvailableCarsUseCase(
    carConfig.DEFAULT_SORT_BY,
    carConfig.DEFAULT_ORDER_BY,
    carConfig.DEFAULT_LIMIT,
    carConfig.DEFAULT_OFFSET,
    carsRepository
  );
}
