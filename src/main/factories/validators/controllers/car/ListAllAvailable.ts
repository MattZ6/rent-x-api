import {
  CarTransmissionTypeEnum,
  CarTypeOfFuelEnum,
} from '@domain/entities/Car';

import { ListAllAvailableCarsController } from '@presentation/controllers/car/ListAllAvailable';
import {
  DateFieldValidation,
  MaxValueFieldValidation,
  MinValueFieldValidation,
  OneOfValuesFieldValidation,
  OnlyNumbersFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
  ValidDateIntervalFieldValidation,
} from '@presentation/validations/validators';

import { carConfig } from '@main/config/environment/car';

import { makeUuidFieldValidation } from '../../validators/UuidField';

export function makeListAllAvailableCarsControllerValidation(): ValidationComposite {
  type Input = ListAllAvailableCarsController.RequestQuery;
  type SortBy = ListAllAvailableCarsController.SortBy;
  type OrderBy = ListAllAvailableCarsController.OrderBy;

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
    makeUuidFieldValidation('brand_id'),
    makeUuidFieldValidation('category_id'),
    new OneOfValuesFieldValidation<Input, CarTransmissionTypeEnum>(
      'transmission_type',
      ['AUTO', 'MANUAL']
    ),
    new OneOfValuesFieldValidation<Input, CarTypeOfFuelEnum>('type_of_fuel', [
      'ALCOHOL',
      'ELETRICITY',
      'GAS',
    ]),
    new RequiredFieldValidation('start_date'),
    new DateFieldValidation('start_date'),
    new RequiredFieldValidation('end_date'),
    new DateFieldValidation('end_date'),
    new ValidDateIntervalFieldValidation('end_date', 'start_date'),
  ]);
}
