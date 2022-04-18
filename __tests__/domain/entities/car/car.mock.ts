import { faker } from '@faker-js/faker';

import {
  ICar,
  TransmissionTypeEnum,
  TypeOfFuelEnum,
} from '@domain/entities/Car';

import { carBrandMock } from './car-brand.mock';
import { carCategoryMock } from './car-category.mock';
import { carSpecificationMock } from './car-specification.mock';

export const carMock: ICar = {
  id: faker.datatype.uuid(),
  name: faker.datatype.string(),
  description: faker.datatype.string(),
  license_plate: faker.datatype.string(),
  daily_rate: faker.datatype.number(),
  daily_late_fee: faker.datatype.number(),
  brand_id: carBrandMock.id,
  brand: carBrandMock,
  category_id: carCategoryMock.id,
  category: carCategoryMock,
  specifications: [carSpecificationMock],
  horse_power: faker.datatype.number({ min: 100, max: 2_500 }),
  max_speed: faker.datatype.number({ min: 90, max: 320 }),
  number_of_seats: faker.datatype.number({ min: 1, max: 8 }),
  zero_to_one_hundred_in_millisseconds: faker.datatype.float({
    min: 2.5,
    max: 12.8,
  }),
  transmission_type: faker.random.arrayElement([
    TransmissionTypeEnum.AUTO,
    TransmissionTypeEnum.MANUAL,
  ]),
  type_of_fuel: faker.random.arrayElement([
    TypeOfFuelEnum.ALCOHOL,
    TypeOfFuelEnum.ELETRICITY,
    TypeOfFuelEnum.GAS,
  ]),
  created_at: faker.datatype.datetime(),
  updated_at: faker.datatype.datetime(),
};
