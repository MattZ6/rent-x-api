import faker from 'faker';

import { ICarCategory } from '@domain/models/CarCategory';

export const carCategoryMock: ICarCategory = {
  id: faker.datatype.uuid(),
  name: faker.vehicle.model(),
  description: faker.vehicle.model(),
  created_at: faker.date.recent(),
  updated_at: faker.date.recent(),
};
