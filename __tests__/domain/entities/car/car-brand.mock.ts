import { faker } from '@faker-js/faker';

import { CarBrand } from '@domain/entities/CarBrand';

export function makeCarBrandMock(): CarBrand {
  const date = faker.datatype.datetime();

  return {
    id: faker.datatype.uuid(),
    name: faker.vehicle.manufacturer(),
    created_at: date,
    updated_at: date,
  };
}
