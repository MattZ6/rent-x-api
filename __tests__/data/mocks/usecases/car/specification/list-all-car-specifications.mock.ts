import faker from 'faker';

import { IListAllCarSpecificationsUseCase } from '@domain/usecases/car/specification/ListAllCarSpecifications';

export const listAllCarSpecificationsUseCaseInputMock: IListAllCarSpecificationsUseCase.Input =
  {
    order_by: 'created_at',
    order: 'DESC',
    limit: faker.datatype.number({ min: 1, max: 100 }),
    page: faker.datatype.number({ min: 1, max: 30 }),
  };
