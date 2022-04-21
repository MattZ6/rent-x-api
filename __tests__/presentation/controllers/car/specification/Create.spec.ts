import { CarSpecificationAlreadyExistsWithProvidedNameError } from '@domain/errors';

import { CreateCarSpecificationController } from '@presentation/controllers/car/specification/Create';
import { conflict, created } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../../domain';
import {
  CreateCarSpecificationUseCaseSpy,
  makeCreateCarSpecificationControllerRequestMock,
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

    const request = makeCreateCarSpecificationControllerRequestMock();

    await createCarSpecificationController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      name: request.body.name,
      description: request.body.description,
    });
  });

  it('should throw if CreateCarSpecificationUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(createCarSpecificationUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeCreateCarSpecificationControllerRequestMock();

    const promise = createCarSpecificationController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return conflict (409) if CreateCarSpecificationUseCase throws CarSpecificationAlreadyExistsWithProvidedNameError', async () => {
    const errorMock = new CarSpecificationAlreadyExistsWithProvidedNameError();

    jest
      .spyOn(createCarSpecificationUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeCreateCarSpecificationControllerRequestMock();

    const response = await createCarSpecificationController.handle(request);

    expect(response).toEqual(conflict(errorMock));
  });

  it('should return created (201) on success', async () => {
    const request = makeCreateCarSpecificationControllerRequestMock();

    const response = await createCarSpecificationController.handle(request);

    expect(response).toEqual(created<void>());
  });
});
