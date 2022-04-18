import { faker } from '@faker-js/faker';

import { ICarBrand } from '@domain/entities/CarBrand';

export const carBrandMock: ICarBrand = {
  id: faker.datatype.uuid(),
  name: faker.vehicle.manufacturer(),
  created_at: faker.datatype.datetime(),
  updated_at: faker.datatype.datetime(),
};
