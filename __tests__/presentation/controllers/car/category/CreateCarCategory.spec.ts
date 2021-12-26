import faker from 'faker';

import { CarCategoryAlreadyExistsWithThisNameError } from '@domain/errors';

import { CreateCarCategoryController } from '@presentation/controllers/car/category/CreateCarCategory';
import { conflict, created } from '@presentation/helpers/http/http';

import { CreateCarCategoryUseCaseSpy } from '../../../mocks';

let createCarCategoryUseCaseSpy: CreateCarCategoryUseCaseSpy;

let createCarCategoryController: CreateCarCategoryController;

const createCarCategoryControllerRequest: CreateCarCategoryController.Request =
  {
    body: {
      name: faker.datatype.string(),
      description: faker.datatype.string(),
    },
  };

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
      createCarCategoryControllerRequest
    );

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      name: createCarCategoryControllerRequest.body.name,
      description: createCarCategoryControllerRequest.body.description,
    });
  });

  it('should throw if CreateCarCategoryUseCase throws', async () => {
    jest
      .spyOn(createCarCategoryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = createCarCategoryController.handle(
      createCarCategoryControllerRequest
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return conflict (409) if CreateCarCategoryUseCase throws CarCategoryAlreadyExistsWithThisNameError', async () => {
    const error = new CarCategoryAlreadyExistsWithThisNameError();

    jest
      .spyOn(createCarCategoryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await createCarCategoryController.handle(
      createCarCategoryControllerRequest
    );

    expect(response).toEqual(conflict(error));
  });

  it('should return created (201) on success', async () => {
    const response = await createCarCategoryController.handle(
      createCarCategoryControllerRequest
    );

    expect(response).toEqual(created<void>());
  });
});
