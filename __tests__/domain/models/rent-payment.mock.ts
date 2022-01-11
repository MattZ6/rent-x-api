import faker from 'faker';

import { IRentPayment } from '@domain/models/RentPayment';

import { rentMock } from './rent.mock';

export const rentPaymentMock: IRentPayment = {
  id: faker.datatype.uuid(),
  rent_id: rentMock.id,
  rent: rentMock,
  total: faker.datatype.float({ min: 500.0, max: 1_500.0 }),
  paid_at: faker.datatype.datetime(),
  created_at: faker.datatype.datetime(),
  updated_at: faker.datatype.datetime(),
};
