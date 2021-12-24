import faker from 'faker';

import { CarSpecificationNotFoundWithThisIdError } from '@domain/errors';

import { DeleteCarSpecificationController } from '@presentation/controllers/car/specification/DeleteCarSpecification';
import { noContent, notFound } from '@presentation/helpers/http/http';

import { DeleteCarSpecificationUseCaseSpy } from '../../../mocks';

let deleteCarSpecificationUseCaseSpy: DeleteCarSpecificationUseCaseSpy;

let deleteCarSpecificationController: DeleteCarSpecificationController;

const deleteCarSpecificationControllerRequest: DeleteCarSpecificationController.Request =
  {
    params: {
      id: faker.datatype.uuid(),
    },
  };

describe('DeleteCarSpecificationController', () => {
  beforeEach(() => {
    deleteCarSpecificationUseCaseSpy = new DeleteCarSpecificationUseCaseSpy();

    deleteCarSpecificationController = new DeleteCarSpecificationController(
      deleteCarSpecificationUseCaseSpy
    );
  });

  it('should call DeleteCarSpecificationUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(deleteCarSpecificationUseCaseSpy, 'execute');

    await deleteCarSpecificationController.handle(
      deleteCarSpecificationControllerRequest
    );

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      id: deleteCarSpecificationControllerRequest.params.id,
    });
  });

  it('should throw if DeleteCarSpecificationUseCase throws', async () => {
    jest
      .spyOn(deleteCarSpecificationUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = deleteCarSpecificationController.handle(
      deleteCarSpecificationControllerRequest
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return conflict (409) if DeleteCarSpecificationUseCase throws CarSpecificationNotFoundWithThisIdError', async () => {
    const error = new CarSpecificationNotFoundWithThisIdError();

    jest
      .spyOn(deleteCarSpecificationUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await deleteCarSpecificationController.handle(
      deleteCarSpecificationControllerRequest
    );

    expect(response).toEqual(notFound(error));
  });

  it('should return no content (204) on success', async () => {
    const response = await deleteCarSpecificationController.handle(
      deleteCarSpecificationControllerRequest
    );

    expect(response).toEqual(noContent());
  });
});
