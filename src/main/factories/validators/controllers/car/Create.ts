import {
  CarTransmissionTypeEnum,
  CarTypeOfFuelEnum,
} from '@domain/entities/Car';

import { CreateCarController } from '@presentation/controllers/car/Create';
import {
  ArrayOfUuidsFieldValidation,
  LicensePlateFieldValidation,
  MinLengthFieldValidation,
  OneOfValuesFieldValidation,
  OnlyNumbersFieldValidation,
  RequiredFieldValidation,
  UuidFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeCreateCarControllerValidation(): ValidationComposite {
  type Input = CreateCarController.RequestBody;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('brand_id'),
    new UuidFieldValidation('brand_id'),
    new RequiredFieldValidation('category_id'),
    new UuidFieldValidation('category_id'),
    new RequiredFieldValidation('daily_late_fee'),
    new OnlyNumbersFieldValidation('daily_late_fee', true),
    new RequiredFieldValidation('daily_rate'),
    new OnlyNumbersFieldValidation('daily_rate', true),
    new RequiredFieldValidation('description'),
    new MinLengthFieldValidation('description', 3, true),
    new RequiredFieldValidation('horse_power'),
    new OnlyNumbersFieldValidation('horse_power', true),
    new RequiredFieldValidation('license_plate'),
    new LicensePlateFieldValidation('license_plate'),
    new RequiredFieldValidation('max_speed'),
    new OnlyNumbersFieldValidation('max_speed', true),
    new RequiredFieldValidation('name'),
    new MinLengthFieldValidation('name', 3, true),
    new RequiredFieldValidation('number_of_seats'),
    new OnlyNumbersFieldValidation('number_of_seats'),
    new ArrayOfUuidsFieldValidation('specifications_ids'),
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
