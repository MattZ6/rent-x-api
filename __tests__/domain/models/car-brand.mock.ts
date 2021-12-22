import faker from 'faker';

import { ICarBrand } from '@domain/models/CarBrand';

export const carBrandMock: ICarBrand = {
  id: faker.datatype.uuid(),
  name: faker.vehicle.manufacturer(),
  created_at: faker.datatype.datetime(),
  updated_at: faker.datatype.datetime(),
};
