import { faker } from '@faker-js/faker';

import { IGetUserProfileUseCase } from '@domain/usecases/user/GetProfile';

export function makeGetUserProfileUseCaseInputMock(): IGetUserProfileUseCase.Input {
  return {
    user_id: faker.datatype.uuid(),
  };
}
