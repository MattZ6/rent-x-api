import { CarSpecificationNotFoundWithProvidedIdError } from '@domain/errors';

import { DeleteCarSpecificationController } from '@presentation/controllers/car/specification/Delete';
import { notFound, noContent } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../../domain';
import {
  DeleteCarSpecificationUseCaseSpy,
  makeDeleteCarSpecificationControllerRequestMock,
} from '../../../mocks';

let deleteCarSpecificationUseCaseSpy: DeleteCarSpecificationUseCaseSpy;

let deleteCarSpecificationController: DeleteCarSpecificationController;

describe('DeleteCarSpecificationController', () => {
  beforeEach(() => {
    deleteCarSpecificationUseCaseSpy = new DeleteCarSpecificationUseCaseSpy();

    deleteCarSpecificationController = new DeleteCarSpecificationController(
      deleteCarSpecificationUseCaseSpy
    );
  });

  it('should call DeleteCarSpecificationUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(deleteCarSpecificationUseCaseSpy, 'execute');

    const request = makeDeleteCarSpecificationControllerRequestMock();

    await deleteCarSpecificationController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({ id: request.params.id });
  });

  it('should throw if DeleteCarSpecificationUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(deleteCarSpecificationUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeDeleteCarSpecificationControllerRequestMock();

    const promise = deleteCarSpecificationController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return conflict (409) if DeleteCarSpecificationUseCase throws CarSpecificationNotFoundWithProvidedIdError', async () => {
    const errorMock = new CarSpecificationNotFoundWithProvidedIdError();

    jest
      .spyOn(deleteCarSpecificationUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeDeleteCarSpecificationControllerRequestMock();

    const response = await deleteCarSpecificationController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return no content (204) on success', async () => {
    const request = makeDeleteCarSpecificationControllerRequestMock();

    const response = await deleteCarSpecificationController.handle(request);

    expect(response).toEqual(noContent());
  });
});
