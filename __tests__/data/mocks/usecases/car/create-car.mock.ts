import { faker } from '@faker-js/faker';

import { TransmissionTypeEnum, TypeOfFuelEnum } from '@domain/models/Car';
import { ICreateCarUseCase } from '@domain/usecases/car/CreateCar';

export const createCarUseCaseInputMock: ICreateCarUseCase.Input = {
  name: faker.datatype.string(),
  description: faker.datatype.string(),
  daily_rate: faker.datatype.number(),
  daily_late_fee: faker.datatype.number(),
  license_plate: faker.datatype.string(),
  brand_id: faker.datatype.uuid(),
  category_id: faker.datatype.uuid(),
  specifications_ids: [faker.datatype.uuid(), faker.datatype.uuid()],
  horse_power: faker.datatype.number({ max: 10_000, min: 100 }),
  max_speed: faker.datatype.number({ min: 100, max: 360 }),
  number_of_seats: faker.datatype.number({ min: 1, max: 7 }),
  zero_to_one_hundred_in_millisseconds: faker.datatype.float({
    min: 2,
    max: 15,
  }),
  transmission_type: faker.random.arrayElement([
    TransmissionTypeEnum.MANUAL,
    TransmissionTypeEnum.AUTO,
  ]),
  type_of_fuel: faker.random.arrayElement([
    TypeOfFuelEnum.ALCOHOL,
    TypeOfFuelEnum.ELETRICITY,
    TypeOfFuelEnum.GAS,
  ]),
};
