import { CarSpecificationAlreadyExistsWithProvidedNameError } from '@domain/errors';

import { CreateCarSpecificationController } from '@presentation/controllers/car/specification/CreateCarSpecification';
import { conflict, created } from '@presentation/helpers/http';

import {
  createCarSpecificationControllerRequestMock,
  CreateCarSpecificationUseCaseSpy,
} from '../../../mocks';

let createCarSpecificationUseCaseSpy: CreateCarSpecificationUseCaseSpy;

let createCarSpecificationController: CreateCarSpecificationController;

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
      createCarSpecificationControllerRequestMock
    );

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      name: createCarSpecificationControllerRequestMock.body.name,
      description: createCarSpecificationControllerRequestMock.body.description,
    });
  });

  it('should throw if CreateCarSpecificationUseCase throws', async () => {
    jest
      .spyOn(createCarSpecificationUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = createCarSpecificationController.handle(
      createCarSpecificationControllerRequestMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return conflict (409) if CreateCarSpecificationUseCase throws CarSpecificationAlreadyExistsWithThisNameError', async () => {
    const error = new CarSpecificationAlreadyExistsWithProvidedNameError();

    jest
      .spyOn(createCarSpecificationUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await createCarSpecificationController.handle(
      createCarSpecificationControllerRequestMock
    );

    expect(response).toEqual(conflict(error));
  });

  it('should return created (201) on success', async () => {
    const response = await createCarSpecificationController.handle(
      createCarSpecificationControllerRequestMock
    );

    expect(response).toEqual(created<void>());
  });
});
