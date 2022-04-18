import { faker } from '@faker-js/faker';

import { IRentPayment } from '@domain/entities/RentPayment';

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

export function makeRentPaymentMock() {
  const rentPayment: IRentPayment = {
    id: faker.datatype.uuid(),
    rent_id: rentMock.id,
    rent: rentMock,
    total: faker.datatype.float({ min: 500.0, max: 1_500.0 }),
    paid_at: faker.datatype.datetime(),
    created_at: faker.datatype.datetime(),
    updated_at: faker.datatype.datetime(),
  };

  return { rentPayment };
}
