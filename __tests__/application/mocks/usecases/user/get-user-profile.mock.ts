import { faker } from '@faker-js/faker';

import { IGetUserProfileUseCase } from '@domain/usecases/user/GetProfile';

export const getUserProfileUseCaseInputMock: IGetUserProfileUseCase.Input = {
  user_id: faker.datatype.uuid(),
};
