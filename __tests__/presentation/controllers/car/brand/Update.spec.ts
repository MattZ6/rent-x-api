import {
  CarBrandAlreadyExistsWithProvidedNameError,
  CarBrandNotFoundWithProvidedIdError,
} from '@domain/errors';

import { UpdateCarBrandController } from '@presentation/controllers/car/brand/Update';
import { conflict, noContent, notFound } from '@presentation/helpers/http';

import {
  updateCarBrandControllerRequestMock,
  UpdateCarBrandUseCaseSpy,
} from '../../../mocks';

let updateCarBrandUseCaseSpy: UpdateCarBrandUseCaseSpy;

let updateCarBrandController: UpdateCarBrandController;

describe('UpdateCarBrandController', () => {
  beforeEach(() => {
    updateCarBrandUseCaseSpy = new UpdateCarBrandUseCaseSpy();

    updateCarBrandController = new UpdateCarBrandController(
      updateCarBrandUseCaseSpy
    );
  });

  it('should call UpdateCarBrandUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(updateCarBrandUseCaseSpy, 'execute');

    await updateCarBrandController.handle(updateCarBrandControllerRequestMock);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      id: updateCarBrandControllerRequestMock.params.id,
      name: updateCarBrandControllerRequestMock.body.name,
    });
  });

  it('should throw if UpdateCarBrandUseCase throws', async () => {
    jest
      .spyOn(updateCarBrandUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = updateCarBrandController.handle(
      updateCarBrandControllerRequestMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return no found (404) if UpdateCarBrandUseCase throws CarBrandNotFoundWithThisIdError', async () => {
    const error = new CarBrandNotFoundWithProvidedIdError();

    jest
      .spyOn(updateCarBrandUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await updateCarBrandController.handle(
      updateCarBrandControllerRequestMock
    );

    expect(response).toEqual(notFound(error));
  });

  it('should return conflict (409) if UpdateCarBrandUseCase throws CarBrandAlreadyExistsWithThisNameError', async () => {
    const error = new CarBrandAlreadyExistsWithProvidedNameError();

    jest
      .spyOn(updateCarBrandUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await updateCarBrandController.handle(
      updateCarBrandControllerRequestMock
    );

    expect(response).toEqual(conflict(error));
  });

  it('should return no content (204) on success', async () => {
    const response = await updateCarBrandController.handle(
      updateCarBrandControllerRequestMock
    );

    expect(response).toEqual(noContent());
  });
});
