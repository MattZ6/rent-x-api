import { faker } from '@faker-js/faker';

import { ICreateRentUseCase } from '@domain/usecases/rent/Create';

export const minimumRentDurationTimeInMillissecondsMock = faker.datatype.number(
  {
    min: 1 * 24 * 60 * 60 * 1000,
    max: 30 * 24 * 60 * 60 * 1000,
  }
);

const start = faker.datatype.datetime();

export const createRentUseCaseInputMock: ICreateRentUseCase.Input = {
  user_id: faker.datatype.uuid(),
  car_id: faker.datatype.uuid(),
  start_date: start,
  expected_return_date: new Date(
    start.getTime() + minimumRentDurationTimeInMillissecondsMock
  ),
};
