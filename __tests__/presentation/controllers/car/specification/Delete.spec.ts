import { CarSpecificationNotFoundWithProvidedIdError } from '@domain/errors';

import { DeleteCarSpecificationController } from '@presentation/controllers/car/specification/Delete';
import { notFound, noContent, badRequest } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../../domain';
import {
  DeleteCarSpecificationUseCaseSpy,
  makeDeleteCarSpecificationControllerRequestMock,
  makeValidationErrorMock,
  ValidationSpy,
} from '../../../mocks';

let validationSpy: ValidationSpy;
let deleteCarSpecificationUseCaseSpy: DeleteCarSpecificationUseCaseSpy;

let deleteCarSpecificationController: DeleteCarSpecificationController;

describe('DeleteCarSpecificationController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    deleteCarSpecificationUseCaseSpy = new DeleteCarSpecificationUseCaseSpy();

    deleteCarSpecificationController = new DeleteCarSpecificationController(
      validationSpy,
      deleteCarSpecificationUseCaseSpy
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const request = makeDeleteCarSpecificationControllerRequestMock();

    await deleteCarSpecificationController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(request.params);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const request = makeDeleteCarSpecificationControllerRequestMock();

    const promise = deleteCarSpecificationController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const request = makeDeleteCarSpecificationControllerRequestMock();

    const response = await deleteCarSpecificationController.handle(request);

    expect(response).toEqual(badRequest(validationErrorMock));
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
