import { faker } from '@faker-js/faker';

import {
  CarTransmissionTypeEnum,
  CarTypeOfFuelEnum,
} from '@domain/entities/Car';
import { IListAllAvailableCarsUseCase } from '@domain/usecases/car/ListAllAvailable';

export function makeListAllAvailableCarsUseCaseDefaultSortByMock(): IListAllAvailableCarsUseCase.SortBy {
  return faker.helpers.arrayElement<IListAllAvailableCarsUseCase.SortBy>([
    'name',
    'created_at',
    'horse_power',
    'max_speed',
    'number_of_seats',
  ]);
}

export function makeListAllAvailableCarsUseCaseDefaultOrderByMock(): IListAllAvailableCarsUseCase.OrderBy {
  return faker.helpers.arrayElement<IListAllAvailableCarsUseCase.OrderBy>([
    'asc',
    'desc',
  ]);
}

export function makeListAllAvailableCarsUseCaseDefaultLimitMock(): IListAllAvailableCarsUseCase.Limit {
  return faker.datatype.number({ min: 1 });
}

export function makeListAllAvailableCarsUseCaseDefaultOffsetMock(): IListAllAvailableCarsUseCase.Offset {
  return faker.datatype.number({ min: 0 });
}

export function makeListAllAvailableCarsUseCaseInputMock(): IListAllAvailableCarsUseCase.Input {
  const startDate = faker.datatype.datetime();

  return {
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
    start_date: startDate,
    end_date: faker.date.soon(
      faker.datatype.number({ min: 1, max: 30 }),
      startDate
    ),
    search: faker.helpers.arrayElement([
      undefined,
      null,
      faker.datatype.string(),
    ]),
    sort_by: makeListAllAvailableCarsUseCaseDefaultSortByMock(),
    order_by: makeListAllAvailableCarsUseCaseDefaultOrderByMock(),
    limit: makeListAllAvailableCarsUseCaseDefaultLimitMock(),
    offset: makeListAllAvailableCarsUseCaseDefaultOffsetMock(),
  };
}
