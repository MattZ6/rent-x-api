import faker from 'faker';

import { ListCarSpecificationsController } from '@presentation/controllers/car/specification/ListCarSpecifications';

export const listCarSpecificationsControllerDefaultOrderBy = 'created_at';
export const listCarSpecificationsControllerDefaultOrder = 'DESC';
export const listCarSpecificationsControllerDefaultLimit =
  faker.datatype.number({ min: 10, max: 100 });
export const listCarSpecificationsControllerDefaultPage = faker.datatype.number(
  { min: 1, max: 50 }
);

export const listCarSpecificationsControllerRequestMock: ListCarSpecificationsController.Request =
  {
    query: {
      order_by: 'name',
      order: 'ASC',
      limit: faker.datatype.number({ min: 10, max: 100 }),
      page: faker.datatype.number({ min: 1, max: 50 }),
    },
  };
