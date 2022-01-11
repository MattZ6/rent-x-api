import faker from 'faker';

import { IRentPayment } from '@domain/models/RentPayment';

import { carMock } from './car.mock';

export const rentPaymentMock: IRentPayment = {
  car_id: faker.datatype.uuid(),
  car: carMock,
  total: faker.datatype.float({ min: 500.0, max: 1_500.0 }),
  paid_at: faker.datatype.datetime(),
  created_at: faker.datatype.datetime(),
  updated_at: faker.datatype.datetime(),
};
