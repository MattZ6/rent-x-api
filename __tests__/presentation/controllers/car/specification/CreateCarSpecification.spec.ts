import faker from 'faker';

import { CarSpecificationAlreadyExistsWithThisNameError } from '@domain/errors';

import { CreateCarSpecificationController } from '@presentation/controllers/car/specification/CreateCarSpecification';
import { conflict, created } from '@presentation/helpers/http/http';

import { CreateCarSpecificationUseCaseSpy } from '../../../mocks';

let createCarSpecificationUseCaseSpy: CreateCarSpecificationUseCaseSpy;

let createCarSpecificationController: CreateCarSpecificationController;

const createCarSpecificationControllerRequest: CreateCarSpecificationController.Request =
  {
    body: {
      name: faker.datatype.string(),
      description: faker.datatype.string(),
    },
  };

describe('CreateCarSpecificationController', () => {
  beforeEach(() => {
    createCarSpecificationUseCaseSpy = new CreateCarSpecificationUseCaseSpy();

    createCarSpecificationController = new CreateCarSpecificationController(
      createCarSpecificationUseCaseSpy
    );
  });

  it('should call CreateCarSpecificationUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(createCarSpecificationUseCaseSpy, 'execute');

    await createCarSpecificationController.handle(
      createCarSpecificationControllerRequest
    );

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      name: createCarSpecificationControllerRequest.body.name,
      description: createCarSpecificationControllerRequest.body.description,
    });
  });

  it('should throw if CreateCarSpecificationUseCase throws', async () => {
    jest
      .spyOn(createCarSpecificationUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = createCarSpecificationController.handle(
      createCarSpecificationControllerRequest
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return conflict (409) if CreateCarSpecificationUseCase throws CarSpecificationAlreadyExistsWithThisNameError', async () => {
    const error = new CarSpecificationAlreadyExistsWithThisNameError();

    jest
      .spyOn(createCarSpecificationUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await createCarSpecificationController.handle(
      createCarSpecificationControllerRequest
    );

    expect(response).toEqual(conflict(error));
  });

  it('should return created (201) on success', async () => {
    const response = await createCarSpecificationController.handle(
      createCarSpecificationControllerRequest
    );

    expect(response).toEqual(created<void>());
  });
});
