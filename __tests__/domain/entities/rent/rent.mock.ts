import { faker } from '@faker-js/faker';

import { Rent } from '@domain/entities/Rent';

export function makeRentMock(): Rent {
  const date = faker.datatype.datetime();
  const startDate = faker.date.soon(faker.datatype.number({ min: 1 }), date);

  return {
    id: faker.datatype.uuid(),
    user_id: faker.datatype.uuid(),
    car_id: faker.datatype.uuid(),
    start_date: startDate,
    expected_return_date: faker.date.soon(
      faker.datatype.number({ min: 1 }),
      startDate
    ),
    daily_late_fee: faker.datatype.float({ min: 500.0, max: 1_000.0 }),
    daily_rate: faker.datatype.float({ min: 1.0, max: 500.0 }),
    created_at: date,
    updated_at: date,
  };
}
