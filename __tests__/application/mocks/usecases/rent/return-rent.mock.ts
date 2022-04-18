import { faker } from '@faker-js/faker';

import { IReturnRentUseCase } from '@domain/usecases/rent/Return';

import { rentMock } from '../../../../domain/models/rent.mock';

export const returnRentUseCaseInputMock: IReturnRentUseCase.Input = {
  rent_id: faker.datatype.uuid(),
  user_id: rentMock.user_id,
};
