import { faker } from '@faker-js/faker';

import { ListAllCarSpecificationsController } from '@presentation/controllers/car/specification/ListAll';

export const listAllCarSpecificationsControllerDefaultOrderBy = 'created_at';
export const listAllCarSpecificationsControllerDefaultOrder = 'DESC';
export const listAllCarSpecificationsControllerDefaultLimit =
  faker.datatype.number({ min: 10, max: 100 });
export const listAllCarSpecificationsControllerDefaultPage =
  faker.datatype.number({ min: 1, max: 50 });

export const listAllCarSpecificationsControllerRequestMock: ListAllCarSpecificationsController.Request =
  {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    headers: undefined,
    params: undefined,
    body: undefined,
    query: {
      order_by: 'name',
      order: 'ASC',
      limit: faker.datatype.number({ min: 10, max: 100 }),
      page: faker.datatype.number({ min: 1, max: 50 }),
    },
  };
