import { faker } from '@faker-js/faker';

import { CarCategory } from '@domain/entities/CarCategory';

export function makeCarCategoryMock(): CarCategory {
  const date = faker.datatype.datetime();

  return {
    id: faker.datatype.uuid(),
    name: faker.vehicle.model(),
    description: faker.vehicle.model(),
    created_at: date,
    updated_at: date,
  };
}
