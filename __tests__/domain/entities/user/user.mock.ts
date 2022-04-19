import { faker } from '@faker-js/faker';

import { IUser, User, UserRole } from '@domain/entities/User';

export const userMock: IUser = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password_hash: faker.internet.password(),
  driver_license: faker.datatype.string(),
  created_at: faker.datatype.datetime(),
  updated_at: faker.datatype.datetime(),
};

export function makeUserMock(): User {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    role: faker.random.arrayElement<UserRole>(['ADMIN', 'DRIVER']),
    email: faker.internet.email(),
    password_hash: faker.internet.password(),
    driver_license: faker.datatype.string(),
    created_at: faker.datatype.datetime(),
    updated_at: faker.datatype.datetime(),
  };
}
