import {
  CarBrandNotFoundWithProvidedIdError,
  CarBrandAlreadyExistsWithProvidedNameError,
} from '@domain/errors';

import { UpdateCarBrandController } from '@presentation/controllers/car/brand/Update';
import {
  notFound,
  conflict,
  noContent,
  badRequest,
} from '@presentation/helpers/http';

import { makeErrorMock } from '../../../../domain';
import {
  UpdateCarBrandUseCaseSpy,
  makeUpdateCarBrandControllerRequestMock,
  ValidationSpy,
  makeValidationErrorMock,
} from '../../../mocks';

let validationSpy: ValidationSpy;
let updateCarBrandUseCaseSpy: UpdateCarBrandUseCaseSpy;

let updateCarBrandController: UpdateCarBrandController;

describe('UpdateCarBrandController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    updateCarBrandUseCaseSpy = new UpdateCarBrandUseCaseSpy();

    updateCarBrandController = new UpdateCarBrandController(
      validationSpy,
      updateCarBrandUseCaseSpy
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const request = makeUpdateCarBrandControllerRequestMock();

    await updateCarBrandController.handle(request);

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

    const request = makeUpdateCarBrandControllerRequestMock();

    const promise = updateCarBrandController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const request = makeUpdateCarBrandControllerRequestMock();

    const response = await updateCarBrandController.handle(request);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call UpdateCarBrandUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(updateCarBrandUseCaseSpy, 'execute');

    const request = makeUpdateCarBrandControllerRequestMock();

    await updateCarBrandController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      id: request.params.id,
      name: request.body.name,
    });
  });

  it('should throw if UpdateCarBrandUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(updateCarBrandUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeUpdateCarBrandControllerRequestMock();

    const promise = updateCarBrandController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return no found (404) if UpdateCarBrandUseCase throws CarBrandNotFoundWithProvidedIdError', async () => {
    const errorMock = new CarBrandNotFoundWithProvidedIdError();

    jest
      .spyOn(updateCarBrandUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeUpdateCarBrandControllerRequestMock();

    const response = await updateCarBrandController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return conflict (409) if UpdateCarBrandUseCase throws CarBrandAlreadyExistsWithProvidedNameError', async () => {
    const errorMock = new CarBrandAlreadyExistsWithProvidedNameError();

    jest
      .spyOn(updateCarBrandUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeUpdateCarBrandControllerRequestMock();

    const response = await updateCarBrandController.handle(request);

    expect(response).toEqual(conflict(errorMock));
  });

  it('should return no content (204) on success', async () => {
    const request = makeUpdateCarBrandControllerRequestMock();

    const response = await updateCarBrandController.handle(request);

    expect(response).toEqual(noContent());
  });
});
