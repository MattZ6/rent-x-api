import { faker } from '@faker-js/faker';

import { IDeleteCarSpecificationUseCase } from '@domain/usecases/car/specification/DeleteCarSpecification';

export const deleteCarSpecificationUseCaseInputMock: IDeleteCarSpecificationUseCase.Input =
  {
    id: faker.datatype.uuid(),
  };