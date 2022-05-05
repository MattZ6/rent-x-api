import {
  CarCategoryNotFoundWithProvidedIdError,
  CarCategoryAlreadyExistsWithProvidedNameError,
} from '@domain/errors';

import { UpdateCarCategoryController } from '@presentation/controllers/car/category/Update';
import {
  notFound,
  conflict,
  noContent,
  badRequest,
} from '@presentation/helpers/http';

import { makeErrorMock } from '../../../../domain';
import {
  UpdateCarCategoryUseCaseSpy,
  makeUpdateCarCategoryControllerRequestMock,
  ValidationSpy,
  makeValidationErrorMock,
} from '../../../mocks';

let validationSpy: ValidationSpy;
let updateCarCategoryUseCaseSpy: UpdateCarCategoryUseCaseSpy;

let updateCarCategoryController: UpdateCarCategoryController;

describe('UpdateCarCategoryController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    updateCarCategoryUseCaseSpy = new UpdateCarCategoryUseCaseSpy();

    updateCarCategoryController = new UpdateCarCategoryController(
      validationSpy,
      updateCarCategoryUseCaseSpy
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const request = makeUpdateCarCategoryControllerRequestMock();

    await updateCarCategoryController.handle(request);

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

    const request = makeUpdateCarCategoryControllerRequestMock();

    const promise = updateCarCategoryController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const request = makeUpdateCarCategoryControllerRequestMock();

    const response = await updateCarCategoryController.handle(request);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call UpdateCarCategoryUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(updateCarCategoryUseCaseSpy, 'execute');

    const request = makeUpdateCarCategoryControllerRequestMock();

    await updateCarCategoryController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      id: request.params.id,
      name: request.body.name,
      description: request.body.description,
    });
  });

  it('should throw if UpdateCarCategoryUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(updateCarCategoryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeUpdateCarCategoryControllerRequestMock();

    const promise = updateCarCategoryController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return no found (404) if UpdateCarCategoryUseCase throws CarCategoryNotFoundWithProvidedIdError', async () => {
    const errorMock = new CarCategoryNotFoundWithProvidedIdError();

    jest
      .spyOn(updateCarCategoryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeUpdateCarCategoryControllerRequestMock();

    const response = await updateCarCategoryController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return conflict (409) if UpdateCarCategoryUseCase throws CarCategoryAlreadyExistsWithProvidedNameError', async () => {
    const errorMock = new CarCategoryAlreadyExistsWithProvidedNameError();

    jest
      .spyOn(updateCarCategoryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeUpdateCarCategoryControllerRequestMock();

    const response = await updateCarCategoryController.handle(request);

    expect(response).toEqual(conflict(errorMock));
  });

  it('should return no content (204) on success', async () => {
    const request = makeUpdateCarCategoryControllerRequestMock();

    const response = await updateCarCategoryController.handle(request);

    expect(response).toEqual(noContent());
  });
});
