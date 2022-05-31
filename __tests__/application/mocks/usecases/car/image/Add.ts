import { faker } from '@faker-js/faker';

import { IAddImagesToCarUseCase } from '@domain/usecases/car/image/Add';

export function makeAddImagesToCarUseCaseAvatarPathMock() {
  return faker.system.directoryPath();
}

export function makeAddImagesToCarUseCaseInputMock(): IAddImagesToCarUseCase.Input {
  return {
    car_id: faker.datatype.uuid(),
    files: faker.helpers.uniqueArray(
      () => ({
        name: faker.system.fileName(),
        extension: faker.system.fileExt(),
        type: faker.system.mimeType(),
        size: faker.datatype.number(),
        content: Buffer.from(faker.datatype.string()),
      }),
      faker.datatype.number({ min: 1, max: 10 })
    ),
  };
}
