import { ListAllCarSpecificationsController } from '@presentation/controllers/car/specification/ListAll';
import {
  MaxValueFieldValidation,
  MinValueFieldValidation,
  OneOfValuesFieldValidation,
  OnlyNumbersFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { carSpecificationConfig } from '@main/config/environment/carSpecification';

export function makeListAllCarSpecificationsControllerValidation(): ValidationComposite {
  type Input = ListAllCarSpecificationsController.RequestQuery;
  type SortBy = ListAllCarSpecificationsController.SortBy;
  type OrderBy = ListAllCarSpecificationsController.OrderBy;

  return new ValidationComposite<Input>([
    new OneOfValuesFieldValidation<Input, SortBy>('sort_by', [
      'created_at',
      'name',
    ]),
    new OneOfValuesFieldValidation<Input, OrderBy>('order_by', ['asc', 'desc']),
    new OnlyNumbersFieldValidation('limit'),
    new MinValueFieldValidation('limit', carSpecificationConfig.MIN_LIMIT),
    new MaxValueFieldValidation('limit', carSpecificationConfig.MAX_LIMIT),
    new OnlyNumbersFieldValidation('offset'),
    new MinValueFieldValidation('offset', carSpecificationConfig.MIN_OFFSET),
  ]);
}
