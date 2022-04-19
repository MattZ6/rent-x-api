import { faker } from '@faker-js/faker';

import { ICreateRentUseCase } from '@domain/usecases/rent/Create';

export function makeCreateRentUseCaseRentDurationInMillisseconds() {
  return faker.datatype.number({ min: 1 });
}

export function makeCreateRentUseCaseInputMock(): ICreateRentUseCase.Input {
  const startDate = faker.datatype.datetime();

  return {
    user_id: faker.datatype.uuid(),
    car_id: faker.datatype.uuid(),
    start_date: startDate,
    expected_return_date: faker.date.soon(
      faker.datatype.number({ min: 1 }),
      startDate
    ),
  };
}
