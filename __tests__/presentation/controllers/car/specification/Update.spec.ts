import {
  CarSpecificationNotFoundWithProvidedIdError,
  CarSpecificationAlreadyExistsWithProvidedNameError,
} from '@domain/errors';

import { UpdateCarSpecificationController } from '@presentation/controllers/car/specification/Update';
import {
  notFound,
  conflict,
  noContent,
  badRequest,
} from '@presentation/helpers/http';

import { makeErrorMock } from '../../../../domain';
import {
  UpdateCarSpecificationUseCaseSpy,
  makeUpdateCarSpecificationControllerRequestMock,
  ValidationSpy,
  makeValidationErrorMock,
} from '../../../mocks';

let validationSpy: ValidationSpy;
let updateCarSpecificationUseCaseSpy: UpdateCarSpecificationUseCaseSpy;

let updateCarSpecificationController: UpdateCarSpecificationController;

describe('UpdateCarSpecificationController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    updateCarSpecificationUseCaseSpy = new UpdateCarSpecificationUseCaseSpy();

    updateCarSpecificationController = new UpdateCarSpecificationController(
      validationSpy,
      updateCarSpecificationUseCaseSpy
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const request = makeUpdateCarSpecificationControllerRequestMock();

    await updateCarSpecificationController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith({
      ...request.body,
      ...request.params,
    });
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const request = makeUpdateCarSpecificationControllerRequestMock();

    const promise = updateCarSpecificationController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const request = makeUpdateCarSpecificationControllerRequestMock();

    const response = await updateCarSpecificationController.handle(request);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call UpdateCarSpecificationUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(updateCarSpecificationUseCaseSpy, 'execute');

    const request = makeUpdateCarSpecificationControllerRequestMock();

    await updateCarSpecificationController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      id: request.params.id,
      name: request.body.name,
      description: request.body.description,
    });
  });

  it('should throw if UpdateCarSpecificationUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(updateCarSpecificationUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeUpdateCarSpecificationControllerRequestMock();

    const promise = updateCarSpecificationController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if UpdateCarSpecificationUseCase throws CarSpecificationNotFoundWithProvidedIdError', async () => {
    const errorMock = new CarSpecificationNotFoundWithProvidedIdError();

    jest
      .spyOn(updateCarSpecificationUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeUpdateCarSpecificationControllerRequestMock();

    const response = await updateCarSpecificationController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return conflict (409) if UpdateCarSpecificationUseCase throws CarSpecificationAlreadyExistsWithProvidedNameError', async () => {
    const errorMock = new CarSpecificationAlreadyExistsWithProvidedNameError();

    jest
      .spyOn(updateCarSpecificationUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeUpdateCarSpecificationControllerRequestMock();

    const response = await updateCarSpecificationController.handle(request);

    expect(response).toEqual(conflict(errorMock));
  });

  it('should return no content (204) on success', async () => {
    const request = makeUpdateCarSpecificationControllerRequestMock();

    const response = await updateCarSpecificationController.handle(request);

    expect(response).toEqual(noContent());
  });
});
