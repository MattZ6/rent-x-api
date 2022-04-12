import { faker } from '@faker-js/faker';

import { IGetUserProfileUseCase } from '@domain/usecases/user/GetUserProfile';

export const getUserProfileUseCaseInputMock: IGetUserProfileUseCase.Input = {
  user_id: faker.datatype.uuid(),
};
