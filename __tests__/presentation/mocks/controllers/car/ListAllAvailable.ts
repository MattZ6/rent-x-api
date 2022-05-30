import { faker } from '@faker-js/faker';

import {
  CarTransmissionTypeEnum,
  CarTypeOfFuelEnum,
} from '@domain/entities/Car';

import { ListAllAvailableCarsController } from '@presentation/controllers/car/ListAllAvailable';

export function makeListAllAvailableCarsControllerRequestMock(): ListAllAvailableCarsController.Request {
  return {
    headers: undefined,
    params: undefined,
    body: undefined,
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    query: {
      sort_by:
        faker.helpers.arrayElement<ListAllAvailableCarsController.SortBy>([
          'name',
          'created_at',
          'horse_power',
          'number_of_seats',
          'max_speed',
        ]),
      order_by:
        faker.helpers.arrayElement<ListAllAvailableCarsController.OrderBy>([
          'asc',
          'desc',
        ]),
      limit: faker.datatype.number({ min: 1 }),
      offset: faker.datatype.number({ min: 0 }),
      brand_id: faker.helpers.arrayElement([
        undefined,
        null,
        faker.datatype.uuid(),
      ]),
      category_id: faker.helpers.arrayElement([
        undefined,
        null,
        faker.datatype.uuid(),
      ]),
      search: faker.helpers.arrayElement([
        undefined,
        null,
        faker.datatype.string(),
      ]),
      min_daily_rate: faker.helpers.arrayElement([
        undefined,
        null,
        faker.datatype.number(),
      ]),
      max_daily_rate: faker.helpers.arrayElement([
        undefined,
        null,
        faker.datatype.number(),
      ]),
      type_of_fuel: faker.helpers.arrayElement<CarTypeOfFuelEnum>([
        undefined,
        null,
        'ALCOHOL',
        'ELETRICITY',
        'GAS',
      ]),
      transmission_type: faker.helpers.arrayElement<CarTransmissionTypeEnum>([
        undefined,
        null,
        'AUTO',
        'MANUAL',
      ]),
      start_date: faker.datatype.datetime(),
      end_date: faker.datatype.datetime(),
    },
  };
}
