import type { IListAllCarsUseCase } from '@domain/usecases/car/ListAll';

export const carConfig = {
  /** List all */

  DEFAULT_SORT_BY: 'name' as IListAllCarsUseCase.SortBy,
  DEFAULT_ORDER_BY: 'asc' as IListAllCarsUseCase.OrderBy,

  MIN_LIMIT: 1,
  MAX_LIMIT: 100,
  DEFAULT_LIMIT: 10,

  MIN_OFFSET: 0,
  DEFAULT_OFFSET: 0,
};
