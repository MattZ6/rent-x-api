import { CarCategoryAlreadyExistsWithProvidedNameError } from '@domain/errors';

import { CreateCarCategoryController } from '@presentation/controllers/car/category/Create';
import { conflict, created } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../../domain';
import {
  CreateCarCategoryUseCaseSpy,
  makeCreateCarCategoryControllerRequestMock,
} from '../../../mocks';

let createCarCategoryUseCaseSpy: CreateCarCategoryUseCaseSpy;

let createCarCategoryController: CreateCarCategoryController;

describe('CreateCarCategoryController', () => {
  beforeEach(() => {
    createCarCategoryUseCaseSpy = new CreateCarCategoryUseCaseSpy();

    createCarCategoryController = new CreateCarCategoryController(
      createCarCategoryUseCaseSpy
    );
  });

  it('should call CreateCarCategoryUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(createCarCategoryUseCaseSpy, 'execute');

    const request = makeCreateCarCategoryControllerRequestMock();

    await createCarCategoryController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      name: request.body.name,
      description: request.body.description,
    });
  });

  it('should throw if CreateCarCategoryUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(createCarCategoryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeCreateCarCategoryControllerRequestMock();

    const promise = createCarCategoryController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return conflict (409) if CreateCarCategoryUseCase throws CarCategoryAlreadyExistsWithProvidedNameError', async () => {
    const errorMock = new CarCategoryAlreadyExistsWithProvidedNameError();

    jest
      .spyOn(createCarCategoryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeCreateCarCategoryControllerRequestMock();

    const response = await createCarCategoryController.handle(request);

    expect(response).toEqual(conflict(errorMock));
  });

  it('should return created (201) on success', async () => {
    const request = makeCreateCarCategoryControllerRequestMock();

    const response = await createCarCategoryController.handle(request);

    expect(response).toEqual(created<void>());
  });
});
