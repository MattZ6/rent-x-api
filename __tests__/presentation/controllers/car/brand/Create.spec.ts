import { CarBrandAlreadyExistsWithProvidedNameError } from '@domain/errors';

import { CreateCarBrandController } from '@presentation/controllers/car/brand/Create';
import { conflict, created } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../../domain';
import {
  CreateCarBrandUseCaseSpy,
  makeCreateCarBrandControllerRequestMock,
} from '../../../mocks';

let createCarBrandUseCaseSpy: CreateCarBrandUseCaseSpy;

let createCarBrandController: CreateCarBrandController;

describe('CreateCarBrandController', () => {
  beforeEach(() => {
    createCarBrandUseCaseSpy = new CreateCarBrandUseCaseSpy();

    createCarBrandController = new CreateCarBrandController(
      createCarBrandUseCaseSpy
    );
  });

  it('should call CreateCarBrandUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(createCarBrandUseCaseSpy, 'execute');

    const request = makeCreateCarBrandControllerRequestMock();

    await createCarBrandController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      name: request.body.name,
    });
  });

  it('should throw if CreateCarBrandUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(createCarBrandUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeCreateCarBrandControllerRequestMock();

    const promise = createCarBrandController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return conflict (409) if CreateCarBrandUseCase throws CarBrandAlreadyExistsWithProvidedNameError', async () => {
    const errorMock = new CarBrandAlreadyExistsWithProvidedNameError();

    jest
      .spyOn(createCarBrandUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeCreateCarBrandControllerRequestMock();

    const response = await createCarBrandController.handle(request);

    expect(response).toEqual(conflict(errorMock));
  });

  it('should return created (201) on success', async () => {
    const request = makeCreateCarBrandControllerRequestMock();

    const response = await createCarBrandController.handle(request);

    expect(response).toEqual(created<void>());
  });
});
