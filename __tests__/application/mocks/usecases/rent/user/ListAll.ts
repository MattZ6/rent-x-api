import { faker } from '@faker-js/faker';

import { IListAllUserRentalsUseCase } from '@domain/usecases/rent/user/ListAll';

export function makeListAllUserRentalsUseCaseDefaultLimitMock(): IListAllUserRentalsUseCase.Limit {
  return faker.datatype.number({ min: 1 });
}

export function makeListAllUserRentalsUseCaseDefaultOffsetMock(): IListAllUserRentalsUseCase.Offset {
  return faker.datatype.number({ min: 0 });
}

export function makeListAllUserRentalsUseCaseInputMock(): IListAllUserRentalsUseCase.Input {
  return {
    user_id: faker.datatype.uuid(),
    limit: makeListAllUserRentalsUseCaseDefaultLimitMock(),
    offset: makeListAllUserRentalsUseCaseDefaultOffsetMock(),
  };
}
