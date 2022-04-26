import { CarBrandAlreadyExistsWithProvidedNameError } from '@domain/errors';

import { CreateCarBrandController } from '@presentation/controllers/car/brand/Create';
import { badRequest, conflict, created } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../../domain';
import {
  CreateCarBrandUseCaseSpy,
  makeCreateCarBrandControllerRequestMock,
  makeValidationErrorMock,
  ValidationSpy,
} from '../../../mocks';

let validationSpy: ValidationSpy;
let createCarBrandUseCaseSpy: CreateCarBrandUseCaseSpy;

let createCarBrandController: CreateCarBrandController;

describe('CreateCarBrandController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    createCarBrandUseCaseSpy = new CreateCarBrandUseCaseSpy();

    createCarBrandController = new CreateCarBrandController(
      validationSpy,
      createCarBrandUseCaseSpy
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const request = makeCreateCarBrandControllerRequestMock();

    await createCarBrandController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(request.body);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const request = makeCreateCarBrandControllerRequestMock();

    const promise = createCarBrandController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const request = makeCreateCarBrandControllerRequestMock();

    const response = await createCarBrandController.handle(request);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call CreateCarBrandUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(createCarBrandUseCaseSpy, 'execute');

    const request = makeCreateCarBrandControllerRequestMock();

    await createCarBrandController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      name: request.body.name,
    });
  });

  it('should throw if CreateCarBrandUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(createCarBrandUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeCreateCarBrandControllerRequestMock();

    const promise = createCarBrandController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return conflict (409) if CreateCarBrandUseCase throws CarBrandAlreadyExistsWithProvidedNameError', async () => {
    const errorMock = new CarBrandAlreadyExistsWithProvidedNameError();

    jest
      .spyOn(createCarBrandUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeCreateCarBrandControllerRequestMock();

    const response = await createCarBrandController.handle(request);

    expect(response).toEqual(conflict(errorMock));
  });

  it('should return created (201) on success', async () => {
    const request = makeCreateCarBrandControllerRequestMock();

    const response = await createCarBrandController.handle(request);

    expect(response).toEqual(created<void>());
  });
});
