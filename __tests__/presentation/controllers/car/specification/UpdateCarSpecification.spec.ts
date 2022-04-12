import {
  CarSpecificationAlreadyExistsWithThisNameError,
  CarSpecificationNotFoundWithThisIdError,
} from '@domain/errors';

import { UpdateCarSpecificationController } from '@presentation/controllers/car/specification/UpdateCarSpecification';
import { conflict, noContent, notFound } from '@presentation/helpers/http';

import {
  updateCarSpecificationControllerRequestMock,
  UpdateCarSpecificationUseCaseSpy,
} from '../../../mocks';

let updateCarSpecificationUseCaseSpy: UpdateCarSpecificationUseCaseSpy;

let updateCarSpecificationController: UpdateCarSpecificationController;

describe('UpdateCarSpecificationController', () => {
  beforeEach(() => {
    updateCarSpecificationUseCaseSpy = new UpdateCarSpecificationUseCaseSpy();

    updateCarSpecificationController = new UpdateCarSpecificationController(
      updateCarSpecificationUseCaseSpy
    );
  });

  it('should call UpdateCarSpecificationUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(updateCarSpecificationUseCaseSpy, 'execute');

    await updateCarSpecificationController.handle(
      updateCarSpecificationControllerRequestMock
    );

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      id: updateCarSpecificationControllerRequestMock.params.id,
      name: updateCarSpecificationControllerRequestMock.body.name,
      description: updateCarSpecificationControllerRequestMock.body.description,
    });
  });

  it('should throw if UpdateCarSpecificationUseCase throws', async () => {
    jest
      .spyOn(updateCarSpecificationUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = updateCarSpecificationController.handle(
      updateCarSpecificationControllerRequestMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return not found (404) if UpdateCarSpecificationUseCase throws CarSpecificationNotFoundWithThisIdError', async () => {
    const error = new CarSpecificationNotFoundWithThisIdError();

    jest
      .spyOn(updateCarSpecificationUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await updateCarSpecificationController.handle(
      updateCarSpecificationControllerRequestMock
    );

    expect(response).toEqual(notFound(error));
  });

  it('should return conflict (409) if UpdateCarSpecificationUseCase throws CarSpecificationAlreadyExistsWithThisNameError', async () => {
    const error = new CarSpecificationAlreadyExistsWithThisNameError();

    jest
      .spyOn(updateCarSpecificationUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await updateCarSpecificationController.handle(
      updateCarSpecificationControllerRequestMock
    );

    expect(response).toEqual(conflict(error));
  });

  it('should return no content (204) on success', async () => {
    const response = await updateCarSpecificationController.handle(
      updateCarSpecificationControllerRequestMock
    );

    expect(response).toEqual(noContent());
  });
});
