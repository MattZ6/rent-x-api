import { ListAllCarsController } from '@presentation/controllers/car/ListAll';
import {
  MaxValueFieldValidation,
  MinValueFieldValidation,
  OneOfValuesFieldValidation,
  OnlyNumbersFieldValidation,
  UuidFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { carConfig } from '@main/config/environment/carConfig';

export function makeListAllCarsControllerValidation(): ValidationComposite {
  type Input = ListAllCarsController.RequestQuery;
  type SortBy = ListAllCarsController.SortBy;
  type OrderBy = ListAllCarsController.OrderBy;

  return new ValidationComposite<Input>([
    new OneOfValuesFieldValidation<Input, SortBy>('sort_by', [
      'created_at',
      'horse_power',
      'max_speed',
      'name',
      'number_of_seats',
    ]),
    new OneOfValuesFieldValidation<Input, OrderBy>('order_by', ['asc', 'desc']),
    new OnlyNumbersFieldValidation('limit'),
    new MinValueFieldValidation('limit', carConfig.MIN_LIMIT),
    new MaxValueFieldValidation('limit', carConfig.MAX_LIMIT),
    new OnlyNumbersFieldValidation('offset'),
    new MinValueFieldValidation('offset', carConfig.MIN_OFFSET),
    new UuidFieldValidation('brand_id'),
    new UuidFieldValidation('category_id'),
  ]);
}
