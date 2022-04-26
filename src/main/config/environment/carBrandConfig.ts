import { IListAllCarBrandsUseCase } from '@domain/usecases/car/brand/ListAll';

export const carBrandConfig = {
  /** List all */

  DEFAULT_SORT_BY: 'name' as IListAllCarBrandsUseCase.SortBy,
  DEFAULT_ORDER_BY: 'asc' as IListAllCarBrandsUseCase.OrderBy,

  MIN_LIMIT: 1,
  MAX_LIMIT: 100,
  DEFAULT_LIMIT: 10,

  MIN_OFFSET: 0,
  DEFAULT_OFFSET: 0,
};
