import { faker } from '@faker-js/faker';

import {
  CarTransmissionTypeEnum,
  CarTypeOfFuelEnum,
} from '@domain/entities/Car';
import { UserRole } from '@domain/entities/User';

import { CreateCarController } from '@presentation/controllers/car/Create';

export function makeCreateCarControllerRequestMock(): CreateCarController.Request {
  return {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    headers: undefined,
    params: undefined,
    query: undefined,
    user: {
      id: faker.datatype.uuid(),
      role: faker.helpers.arrayElement<UserRole>(['ADMIN', 'DRIVER']),
    },
    body: {
      name: faker.datatype.string(),
      description: faker.datatype.string(),
      brand_id: faker.datatype.uuid(),
      category_id: faker.datatype.uuid(),
      daily_rate: faker.datatype.number(),
      daily_late_fee: faker.datatype.number(),
      license_plate: faker.datatype.string(),
      horse_power: faker.datatype.number({ max: 10_000, min: 100 }),
      max_speed: faker.datatype.number({ min: 100, max: 360 }),
      number_of_seats: faker.datatype.number({ min: 1, max: 7 }),
      zero_to_one_hundred_in_millisseconds: faker.datatype.float({
        min: 1.5,
        max: 15.9,
      }),
      transmission_type: faker.helpers.arrayElement<CarTransmissionTypeEnum>([
        'AUTO',
        'MANUAL',
      ]),
      type_of_fuel: faker.helpers.arrayElement<CarTypeOfFuelEnum>([
        'ALCOHOL',
        'ELETRICITY',
        'GAS',
      ]),
      specifications_ids: [faker.datatype.uuid(), faker.datatype.uuid()],
    },
  };
}
