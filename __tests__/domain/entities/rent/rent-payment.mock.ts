import { faker } from '@faker-js/faker';

import { RentPayment } from '@domain/entities/RentPayment';

export function makeRentPaymentMock(): RentPayment {
  const date = faker.datatype.datetime();

  return {
    id: faker.datatype.uuid(),
    rent_id: faker.datatype.uuid(),
    total: faker.datatype.float({ min: 100.0, max: 2_500.0 }),
    paid_at: faker.date.soon(faker.datatype.number({ min: 1 }), date),
    created_at: date,
    updated_at: date,
  };
}
