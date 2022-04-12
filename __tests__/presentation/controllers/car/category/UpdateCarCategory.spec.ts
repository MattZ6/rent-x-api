import {
  CarCategoryAlreadyExistsWithThisNameError,
  CarCategoryNotFoundWithThisIdError,
} from '@domain/errors';

import { UpdateCarCategoryController } from '@presentation/controllers/car/category/UpdateCarCategory';
import { conflict, noContent, notFound } from '@presentation/helpers/http';

import {
  updateCarCategoryControllerRequestMock,
  UpdateCarCategoryUseCaseSpy,
} from '../../../mocks';

let updateCarCategoryUseCaseSpy: UpdateCarCategoryUseCaseSpy;

let updateCarCategoryController: UpdateCarCategoryController;

describe('UpdateCarCategoryController', () => {
  beforeEach(() => {
    updateCarCategoryUseCaseSpy = new UpdateCarCategoryUseCaseSpy();

    updateCarCategoryController = new UpdateCarCategoryController(
      updateCarCategoryUseCaseSpy
    );
  });

  it('should call UpdateCarCategoryUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(updateCarCategoryUseCaseSpy, 'execute');

    await updateCarCategoryController.handle(
      updateCarCategoryControllerRequestMock
    );

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      id: updateCarCategoryControllerRequestMock.params.id,
      name: updateCarCategoryControllerRequestMock.body.name,
      description: updateCarCategoryControllerRequestMock.body.description,
    });
  });

  it('should throw if UpdateCarCategoryUseCase throws', async () => {
    jest
      .spyOn(updateCarCategoryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = updateCarCategoryController.handle(
      updateCarCategoryControllerRequestMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return no found (404) if UpdateCarCategoryUseCase throws CarCategoryNotFoundWithThisIdError', async () => {
    const error = new CarCategoryNotFoundWithThisIdError();

    jest
      .spyOn(updateCarCategoryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await updateCarCategoryController.handle(
      updateCarCategoryControllerRequestMock
    );

    expect(response).toEqual(notFound(error));
  });

  it('should return conflict (409) if UpdateCarCategoryUseCase throws CarCategoryAlreadyExistsWithThisNameError', async () => {
    const error = new CarCategoryAlreadyExistsWithThisNameError();

    jest
      .spyOn(updateCarCategoryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await updateCarCategoryController.handle(
      updateCarCategoryControllerRequestMock
    );

    expect(response).toEqual(conflict(error));
  });

  it('should return no content (204) on success', async () => {
    const response = await updateCarCategoryController.handle(
      updateCarCategoryControllerRequestMock
    );

    expect(response).toEqual(noContent());
  });
});
