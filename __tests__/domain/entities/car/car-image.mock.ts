import { faker } from '@faker-js/faker';

import { CarImage } from '@domain/entities/CarImage';

export function makeCarImageMock(): CarImage {
  const date = faker.datatype.datetime();

  return {
    id: faker.datatype.uuid(),
    car_id: faker.datatype.uuid(),
    original_name: faker.system.fileName(),
    extension: faker.system.fileExt(),
    mime_type: faker.system.mimeType(),
    size_in_bytes: faker.datatype.number(),
    created_at: date,
    updated_at: date,
  };
}
