import {
  CarTransmissionTypeEnum,
  CarTypeOfFuelEnum,
} from '@domain/entities/Car';

import { CreateCarController } from '@presentation/controllers/car/Create';
import {
  MinLengthFieldValidation,
  OneOfValuesFieldValidation,
  OnlyNumbersFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { makeArrayOfUuidsFieldValidation } from '../../validators/ArrayOfUuidsField';
import { makeCarLicensePlateFieldValidation } from '../../validators/CarLicensePlateField';
import { makeUuidFieldValidation } from '../../validators/UuidField';

export function makeCreateCarControllerValidation(): ValidationComposite {
  type Input = CreateCarController.RequestBody;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('brand_id'),
    makeUuidFieldValidation('brand_id'),
    new RequiredFieldValidation('category_id'),
    makeUuidFieldValidation('category_id'),
    new RequiredFieldValidation('daily_late_fee'),
    new OnlyNumbersFieldValidation('daily_late_fee', true),
    new RequiredFieldValidation('daily_rate'),
    new OnlyNumbersFieldValidation('daily_rate', true),
    new RequiredFieldValidation('description'),
    new MinLengthFieldValidation('description', 3, true),
    new RequiredFieldValidation('horse_power'),
    new OnlyNumbersFieldValidation('horse_power', true),
    new RequiredFieldValidation('license_plate'),
    makeCarLicensePlateFieldValidation('license_plate'),
    new RequiredFieldValidation('max_speed'),
    new OnlyNumbersFieldValidation('max_speed', true),
    new RequiredFieldValidation('name'),
    new MinLengthFieldValidation('name', 3, true),
    new RequiredFieldValidation('number_of_seats'),
    new OnlyNumbersFieldValidation('number_of_seats'),
    makeArrayOfUuidsFieldValidation('specifications_ids'),
    new RequiredFieldValidation('transmission_type'),
    new OneOfValuesFieldValidation<Input, CarTransmissionTypeEnum>(
      'transmission_type',
      ['AUTO', 'MANUAL']
    ),
    new RequiredFieldValidation('type_of_fuel'),
    new OneOfValuesFieldValidation<Input, CarTypeOfFuelEnum>('type_of_fuel', [
      'ALCOHOL',
      'ELETRICITY',
      'GAS',
    ]),
    new RequiredFieldValidation('zero_to_one_hundred_in_millisseconds'),
    new OnlyNumbersFieldValidation(
      'zero_to_one_hundred_in_millisseconds',
      true
    ),
  ]);
}
