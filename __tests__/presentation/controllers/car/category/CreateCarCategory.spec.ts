import { CarCategoryAlreadyExistsWithThisNameError } from '@domain/errors';

import { CreateCarCategoryController } from '@presentation/controllers/car/category/CreateCarCategory';
import { conflict, created } from '@presentation/helpers/http';

import {
  createCarCategoryControllerRequestMock,
  CreateCarCategoryUseCaseSpy,
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

    await createCarCategoryController.handle(
      createCarCategoryControllerRequestMock
    );

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      name: createCarCategoryControllerRequestMock.body.name,
      description: createCarCategoryControllerRequestMock.body.description,
    });
  });

  it('should throw if CreateCarCategoryUseCase throws', async () => {
    jest
      .spyOn(createCarCategoryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = createCarCategoryController.handle(
      createCarCategoryControllerRequestMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return conflict (409) if CreateCarCategoryUseCase throws CarCategoryAlreadyExistsWithThisNameError', async () => {
    const error = new CarCategoryAlreadyExistsWithThisNameError();

    jest
      .spyOn(createCarCategoryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await createCarCategoryController.handle(
      createCarCategoryControllerRequestMock
    );

    expect(response).toEqual(conflict(error));
  });

  it('should return created (201) on success', async () => {
    const response = await createCarCategoryController.handle(
      createCarCategoryControllerRequestMock
    );

    expect(response).toEqual(created<void>());
  });
});
