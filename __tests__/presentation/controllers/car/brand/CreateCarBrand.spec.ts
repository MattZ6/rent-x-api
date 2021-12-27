import faker from 'faker';

import { CarBrandAlreadyExistsWithThisNameError } from '@domain/errors';

import { CreateCarBrandController } from '@presentation/controllers/car/brand/CreateCarBrand';
import { conflict, created } from '@presentation/helpers/http/http';

import { CreateCarBrandUseCaseSpy } from '../../../mocks';

let createCarBrandUseCaseSpy: CreateCarBrandUseCaseSpy;

let createCarBrandController: CreateCarBrandController;

const createCarBrandControllerRequest: CreateCarBrandController.Request = {
  body: {
    name: faker.datatype.string(),
  },
};

describe('CreateCarBrandController', () => {
  beforeEach(() => {
    createCarBrandUseCaseSpy = new CreateCarBrandUseCaseSpy();

    createCarBrandController = new CreateCarBrandController(
      createCarBrandUseCaseSpy
    );
  });

  it('should call CreateCarBrandUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(createCarBrandUseCaseSpy, 'execute');

    await createCarBrandController.handle(createCarBrandControllerRequest);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      name: createCarBrandControllerRequest.body.name,
    });
  });

  it('should throw if CreateCarBrandUseCase throws', async () => {
    jest
      .spyOn(createCarBrandUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = createCarBrandController.handle(
      createCarBrandControllerRequest
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return conflict (409) if CreateCarBrandUseCase throws CarBrandAlreadyExistsWithThisNameError', async () => {
    const error = new CarBrandAlreadyExistsWithThisNameError();

    jest
      .spyOn(createCarBrandUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await createCarBrandController.handle(
      createCarBrandControllerRequest
    );

    expect(response).toEqual(conflict(error));
  });

  it('should return created (201) on success', async () => {
    const response = await createCarBrandController.handle(
      createCarBrandControllerRequest
    );

    expect(response).toEqual(created<void>());
  });
});