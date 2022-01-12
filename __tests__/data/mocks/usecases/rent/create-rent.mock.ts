import faker from 'faker';

import { ICreateRentUseCase } from '@domain/usecases/rent/CreateRent';

export const minimumRentDurationTimeInMillissecondsMock = faker.datatype.number(
  {
    min: 60_000,
    max: 60_000_000,
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
