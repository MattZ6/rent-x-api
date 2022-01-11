import faker from 'faker';

import { IRent } from '@domain/models/Rent';

import { carMock } from './car.mock';
import { userMock } from './user.mock';

export const rentMock: IRent = {
  id: faker.datatype.uuid(),
  user_id: userMock.id,
  user: userMock,
  car_id: carMock.id,
  car: carMock,
  start_date: faker.datatype.datetime(),
  expected_return_date: faker.datatype.datetime(),
  return_date: faker.datatype.datetime(),
  fine_amount: faker.datatype.float({ min: 500.0, max: 1_000.0 }),
  daily_rate: faker.datatype.float({ min: 100.0, max: 500.0 }),
  created_at: faker.datatype.datetime(),
  updated_at: faker.datatype.datetime(),
};