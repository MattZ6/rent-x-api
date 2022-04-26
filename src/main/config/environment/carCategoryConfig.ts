import type { IListAllCarCategoriesUseCase } from '@domain/usecases/car/category/ListAll';

export const carCategoryConfig = {
  /** List all */

  DEFAULT_SORT_BY: 'name' as IListAllCarCategoriesUseCase.SortBy,
  DEFAULT_ORDER_BY: 'asc' as IListAllCarCategoriesUseCase.OrderBy,

  MIN_LIMIT: 1,
  MAX_LIMIT: 100,
  DEFAULT_LIMIT: 10,

  MIN_OFFSET: 0,
  DEFAULT_OFFSET: 0,
};
