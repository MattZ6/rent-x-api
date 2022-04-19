import { faker } from '@faker-js/faker';

import { IGetUserProfileUseCase } from '@domain/usecases/user/GetProfile';

export function makeGetUserProfileUseCaseInputMock(): IGetUserProfileUseCase.Input {
  return {
    id: faker.datatype.uuid(),
  };
}
