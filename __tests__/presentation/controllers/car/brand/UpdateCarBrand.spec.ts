import faker from 'faker';

import {
  CarBrandAlreadyExistsWithThisNameError,
  CarBrandNotFoundWithThisIdError,
} from '@domain/errors';

import { UpdateCarBrandController } from '@presentation/controllers/car/brand/UpdateCarBrand';
import { conflict, noContent, notFound } from '@presentation/helpers/http/http';

import { UpdateCarBrandUseCaseSpy } from '../../../mocks';

let updateCarBrandUseCaseSpy: UpdateCarBrandUseCaseSpy;

let updateCarBrandController: UpdateCarBrandController;

const updateCarBrandControllerRequest: UpdateCarBrandController.Request = {
  params: {
    id: faker.datatype.uuid(),
  },
  body: {
    name: faker.datatype.string(),
  },
};

describe('UpdateCarBrandController', () => {
  beforeEach(() => {
    updateCarBrandUseCaseSpy = new UpdateCarBrandUseCaseSpy();

    updateCarBrandController = new UpdateCarBrandController(
      updateCarBrandUseCaseSpy
    );
  });

  it('should call UpdateCarBrandUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(updateCarBrandUseCaseSpy, 'execute');

    await updateCarBrandController.handle(updateCarBrandControllerRequest);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      id: updateCarBrandControllerRequest.params.id,
      name: updateCarBrandControllerRequest.body.name,
    });
  });

  it('should throw if UpdateCarBrandUseCase throws', async () => {
    jest
      .spyOn(updateCarBrandUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = updateCarBrandController.handle(
      updateCarBrandControllerRequest
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return no found (404) if UpdateCarBrandUseCase throws CarBrandNotFoundWithThisIdError', async () => {
    const error = new CarBrandNotFoundWithThisIdError();

    jest
      .spyOn(updateCarBrandUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await updateCarBrandController.handle(
      updateCarBrandControllerRequest
    );

    expect(response).toEqual(notFound(error));
  });

  it('should return conflict (409) if UpdateCarBrandUseCase throws CarBrandAlreadyExistsWithThisNameError', async () => {
    const error = new CarBrandAlreadyExistsWithThisNameError();

    jest
      .spyOn(updateCarBrandUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await updateCarBrandController.handle(
      updateCarBrandControllerRequest
    );

    expect(response).toEqual(conflict(error));
  });

  it('should return no content (204) on success', async () => {
    const response = await updateCarBrandController.handle(
      updateCarBrandControllerRequest
    );

    expect(response).toEqual(noContent());
  });
});