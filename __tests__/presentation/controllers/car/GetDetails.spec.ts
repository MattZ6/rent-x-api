import { CarNotFoundWithProvidedIdError } from '@domain/errors';

import { GetCarDetailsController } from '@presentation/controllers/car/GetDetails';
import { badRequest, notFound, ok } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  GetCarDetailsUseCaseSpy,
  makeGetCarDetailsControllerRequestMock,
  makeGetCarDetailsUseCaseOutputMock,
  makeValidationErrorMock,
  ValidationSpy,
} from '../../mocks';

let validationSpy: ValidationSpy;
let getCarDetailsUseCaseSpy: GetCarDetailsUseCaseSpy;

let getCarDetailsController: GetCarDetailsController;

describe('GetCarDetailsController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    getCarDetailsUseCaseSpy = new GetCarDetailsUseCaseSpy();

    getCarDetailsController = new GetCarDetailsController(
      validationSpy,
      getCarDetailsUseCaseSpy
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const request = makeGetCarDetailsControllerRequestMock();

    await getCarDetailsController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(request.params);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const request = makeGetCarDetailsControllerRequestMock();

    const promise = getCarDetailsController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const request = makeGetCarDetailsControllerRequestMock();

    const response = await getCarDetailsController.handle(request);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call GetCarDetailsUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(getCarDetailsUseCaseSpy, 'execute');

    const request = makeGetCarDetailsControllerRequestMock();

    await getCarDetailsController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenLastCalledWith({ id: request.params.id });
  });

  it('should throw if GetCarDetailsUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(getCarDetailsUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeGetCarDetailsControllerRequestMock();

    const promise = getCarDetailsController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if GetCarDetailsUseCase throws CarNotFoundWithProvidedIdError', async () => {
    const errorMock = new CarNotFoundWithProvidedIdError();

    jest
      .spyOn(getCarDetailsUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeGetCarDetailsControllerRequestMock();

    const result = await getCarDetailsController.handle(request);

    expect(result).toEqual(notFound(errorMock));
  });

  it('should return ok (200) on success', async () => {
    const outputMock = makeGetCarDetailsUseCaseOutputMock();

    jest
      .spyOn(getCarDetailsUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const request = makeGetCarDetailsControllerRequestMock();

    const result = await getCarDetailsController.handle(request);

    expect(result).toEqual(ok(outputMock));
  });
});
