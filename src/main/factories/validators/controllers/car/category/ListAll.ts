import { ListAllCarCategoriesController } from '@presentation/controllers/car/category/ListAll';
import {
  MaxValueFieldValidation,
  MinValueFieldValidation,
  OneOfValuesFieldValidation,
  OnlyNumbersFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { carCategoryConfig } from '@main/config/environment/carCategoryConfig';

export function makeListAllCarCategoriesControllerValidation(): ValidationComposite {
  type Input = ListAllCarCategoriesController.RequestQuery;
  type SortBy = ListAllCarCategoriesController.SortBy;
  type OrderBy = ListAllCarCategoriesController.OrderBy;

  return new ValidationComposite<Input>([
    new OneOfValuesFieldValidation<Input, SortBy>('sort_by', [
      'created_at',
      'name',
    ]),
    new OneOfValuesFieldValidation<Input, OrderBy>('order_by', ['asc', 'desc']),
    new OnlyNumbersFieldValidation('limit'),
    new MinValueFieldValidation('limit', carCategoryConfig.MIN_LIMIT),
    new MaxValueFieldValidation('limit', carCategoryConfig.MAX_LIMIT),
    new OnlyNumbersFieldValidation('offset'),
    new MinValueFieldValidation('offset', carCategoryConfig.MIN_OFFSET),
  ]);
}
