import { faker } from '@faker-js/faker';

import {
  Car,
  CarTransmissionTypeEnum,
  CarTypeOfFuelEnum,
} from '@domain/entities/Car';

export function makeCarMock(): Car {
  const date = faker.datatype.datetime();

  return {
    id: faker.datatype.uuid(),
    name: faker.datatype.string(),
    description: faker.datatype.string(),
    license_plate: faker.datatype.string(),
    daily_rate: faker.datatype.number(),
    daily_late_fee: faker.datatype.number(),
    brand_id: faker.datatype.uuid(),
    category_id: faker.datatype.uuid(),
    horse_power: faker.datatype.number({ min: 100, max: 2_500 }),
    max_speed: faker.datatype.number({ min: 90, max: 320 }),
    number_of_seats: faker.datatype.number({ min: 1, max: 8 }),
    zero_to_one_hundred_in_millisseconds: faker.datatype.float({
      min: 0.0,
      max: 12.9,
    }),
    transmission_type: faker.random.arrayElement<CarTransmissionTypeEnum>([
      'AUTO',
      'MANUAL',
    ]),
    type_of_fuel: faker.random.arrayElement<CarTypeOfFuelEnum>([
      'ALCOHOL',
      'ELETRICITY',
      'GAS',
    ]),
    created_at: date,
    updated_at: date,
  };
}
