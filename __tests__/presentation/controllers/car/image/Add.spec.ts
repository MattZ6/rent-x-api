import { CarNotFoundWithProvidedIdError } from '@domain/errors';

import { AddImagesToCarController } from '@presentation/controllers/car/images/Add';
import { badRequest, created, notFound } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../../domain';
import {
  AddImagesToCarUseCaseSpy,
  makeAddImagesToCarControllerRequestMock,
  makeValidationErrorMock,
  ValidationSpy,
} from '../../../mocks';

let validationSpy: ValidationSpy;
let addImagesToCarUseCaseSpy: AddImagesToCarUseCaseSpy;

let addImagesToCarController: AddImagesToCarController;

describe('AddImagesToCarController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    addImagesToCarUseCaseSpy = new AddImagesToCarUseCaseSpy();

    addImagesToCarController = new AddImagesToCarController(
      validationSpy,
      addImagesToCarUseCaseSpy
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const request = makeAddImagesToCarControllerRequestMock();

    await addImagesToCarController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith({
      ...request.params,
      files: request.files,
    });
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const request = makeAddImagesToCarControllerRequestMock();

    const promise = addImagesToCarController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const request = makeAddImagesToCarControllerRequestMock();

    const response = await addImagesToCarController.handle(request);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call AddImagesToCarUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(addImagesToCarUseCaseSpy, 'execute');

    const request = makeAddImagesToCarControllerRequestMock();

    await addImagesToCarController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      car_id: request.params.car_id,
      files: request.files.map(file => ({
        name: file.name,
        type: file.mimetype,
        extension: String(file.name.split('.').pop()),
        size: file.size,
        content: file.buffer,
      })),
    });
  });

  it('should throw if AddImagesToCarUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(addImagesToCarUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeAddImagesToCarControllerRequestMock();

    const promise = addImagesToCarController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if AddImagesToCarUseCase throws a CarNotFoundWithProvidedIdError', async () => {
    const errorMock = new CarNotFoundWithProvidedIdError();

    jest
      .spyOn(addImagesToCarUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeAddImagesToCarControllerRequestMock();

    const response = await addImagesToCarController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return created (201) if AddImagesToCarUseCase throws a CarNotFoundWithProvidedIdError', async () => {
    const request = makeAddImagesToCarControllerRequestMock();

    const response = await addImagesToCarController.handle(request);

    expect(response).toEqual(created<void>());
  });
});
