import { CarCategoryAlreadyExistsWithProvidedNameError } from '@domain/errors';

import { CreateCarCategoryController } from '@presentation/controllers/car/category/Create';
import { badRequest, conflict, created } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../../domain';
import {
  CreateCarCategoryUseCaseSpy,
  makeCreateCarCategoryControllerRequestMock,
  makeValidationErrorMock,
  ValidationSpy,
} from '../../../mocks';

let validationSpy: ValidationSpy;
let createCarCategoryUseCaseSpy: CreateCarCategoryUseCaseSpy;

let createCarCategoryController: CreateCarCategoryController;

describe('CreateCarCategoryController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    createCarCategoryUseCaseSpy = new CreateCarCategoryUseCaseSpy();

    createCarCategoryController = new CreateCarCategoryController(
      validationSpy,
      createCarCategoryUseCaseSpy
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const request = makeCreateCarCategoryControllerRequestMock();

    await createCarCategoryController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(request.body);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const request = makeCreateCarCategoryControllerRequestMock();

    const promise = createCarCategoryController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const request = makeCreateCarCategoryControllerRequestMock();

    const response = await createCarCategoryController.handle(request);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call CreateCarCategoryUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(createCarCategoryUseCaseSpy, 'execute');

    const request = makeCreateCarCategoryControllerRequestMock();

    await createCarCategoryController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      name: request.body.name,
      description: request.body.description,
    });
  });

  it('should throw if CreateCarCategoryUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(createCarCategoryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeCreateCarCategoryControllerRequestMock();

    const promise = createCarCategoryController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return conflict (409) if CreateCarCategoryUseCase throws CarCategoryAlreadyExistsWithProvidedNameError', async () => {
    const errorMock = new CarCategoryAlreadyExistsWithProvidedNameError();

    jest
      .spyOn(createCarCategoryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeCreateCarCategoryControllerRequestMock();

    const response = await createCarCategoryController.handle(request);

    expect(response).toEqual(conflict(errorMock));
  });

  it('should return created (201) on success', async () => {
    const request = makeCreateCarCategoryControllerRequestMock();

    const response = await createCarCategoryController.handle(request);

    expect(response).toEqual(created<void>());
  });
});
