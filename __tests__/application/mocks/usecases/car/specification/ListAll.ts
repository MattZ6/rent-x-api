import { faker } from '@faker-js/faker';

import { IListAllCarSpecificationsUseCase } from '@domain/usecases/car/specification/ListAll';

export const listAllCarSpecificationsUseCaseInputMock: IListAllCarSpecificationsUseCase.Input =
  {
    sort_by: 'created_at',
    order_by: 'DESC',
    limit: faker.datatype.number({ min: 1, max: 100 }),
    offset: faker.datatype.number({ min: 1, max: 30 }),
  };
