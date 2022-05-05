import { ListAllCarBrandsController } from '@presentation/controllers/car/brand/ListAll';
import {
  MaxValueFieldValidation,
  MinValueFieldValidation,
  OneOfValuesFieldValidation,
  OnlyNumbersFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { carBrandConfig } from '@main/config/environment/carBrand';

export function makeListAllCarBrandsControllerValidation(): ValidationComposite {
  type Input = ListAllCarBrandsController.RequestQuery;
  type SortBy = ListAllCarBrandsController.SortBy;
  type OrderBy = ListAllCarBrandsController.OrderBy;

  return new ValidationComposite<Input>([
    new OneOfValuesFieldValidation<Input, SortBy>('sort_by', [
      'created_at',
      'name',
    ]),
    new OneOfValuesFieldValidation<Input, OrderBy>('order_by', ['asc', 'desc']),
    new OnlyNumbersFieldValidation('limit'),
    new MinValueFieldValidation('limit', carBrandConfig.MIN_LIMIT),
    new MaxValueFieldValidation('limit', carBrandConfig.MAX_LIMIT),
    new OnlyNumbersFieldValidation('offset'),
    new MinValueFieldValidation('offset', carBrandConfig.MIN_OFFSET),
  ]);
}
