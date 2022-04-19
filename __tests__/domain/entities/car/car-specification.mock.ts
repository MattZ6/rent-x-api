import { faker } from '@faker-js/faker';

import { CarSpecification } from '@domain/entities/CarSpecification';

export function makeCarSpecificationMock(): CarSpecification {
  const date = faker.datatype.datetime();

  return {
    id: faker.datatype.uuid(),
    name: faker.vehicle.model(),
    description: faker.vehicle.model(),
    created_at: date,
    updated_at: date,
  };
}
