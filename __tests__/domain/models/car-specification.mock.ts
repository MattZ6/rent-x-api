import faker from 'faker';

import { ICarSpecification } from '@domain/models/CarSpecification';

export const carSpecificationMock: ICarSpecification = {
  id: faker.datatype.uuid(),
  name: faker.vehicle.model(),
  description: faker.vehicle.model(),
  created_at: faker.date.recent(),
  updated_at: faker.date.recent(),
};
