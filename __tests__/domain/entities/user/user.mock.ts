import { faker } from '@faker-js/faker';

import { User, UserRole } from '@domain/entities/User';

export function makeUserMock(): User {
  const date = faker.datatype.datetime();

  return {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    role: faker.random.arrayElement<UserRole>(['ADMIN', 'DRIVER']),
    email: faker.internet.email(),
    password_hash: faker.internet.password(),
    driver_license: faker.datatype.string(),
    created_at: date,
    updated_at: date,
  };
}
