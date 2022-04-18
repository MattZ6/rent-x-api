import { faker } from '@faker-js/faker';

import { ICarSpecification } from '@domain/entities/CarSpecification';

export const carSpecificationMock: ICarSpecification = {
  id: faker.datatype.uuid(),
  name: faker.vehicle.model(),
  description: faker.vehicle.model(),
  created_at: faker.date.recent(),
  updated_at: faker.date.recent(),
};
