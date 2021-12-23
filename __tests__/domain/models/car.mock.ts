import faker from 'faker';

import { ICar } from '@domain/models/Car';

import { carBrandMock } from './car-brand.mock';
import { carCategoryMock } from './car-category.mock';
import { carSpecificationMock } from './car-specification.mock';

export const carMock: ICar = {
  id: faker.datatype.uuid(),
  name: faker.datatype.string(),
  description: faker.datatype.string(),
  license_plate: faker.datatype.string(),
  daily_rate: faker.datatype.number(),
  fine_amount: faker.datatype.number(),
  brand_id: carBrandMock.id,
  brand: carBrandMock,
  category_id: carCategoryMock.id,
  category: carCategoryMock,
  specifications: [carSpecificationMock],
  created_at: faker.datatype.datetime(),
  updated_at: faker.datatype.datetime(),
};
