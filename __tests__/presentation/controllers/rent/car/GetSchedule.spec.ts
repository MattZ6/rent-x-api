import { CarNotFoundWithProvidedIdError } from '@domain/errors';

import { GetCarScheduleController } from '@presentation/controllers/rent/car/GetSchedule';
import { badRequest, notFound, ok } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../../domain';
import {
  GetCarScheduleUseCaseSpy,
  makeGetCarScheduleControllerRequestMock,
  makeValidationErrorMock,
  makeGetCarScheduleUseCaseOutputMock,
  ValidationSpy,
} from '../../../mocks';

let validationSpy: ValidationSpy;
let getCarScheduleUseCaseSpy: GetCarScheduleUseCaseSpy;

let getCarScheduleController: GetCarScheduleController;

describe('GetCarScheduleController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    getCarScheduleUseCaseSpy = new GetCarScheduleUseCaseSpy();

    getCarScheduleController = new GetCarScheduleController(
      validationSpy,
      getCarScheduleUseCaseSpy
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const request = makeGetCarScheduleControllerRequestMock();

    await getCarScheduleController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(request.params);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const request = makeGetCarScheduleControllerRequestMock();

    const promise = getCarScheduleController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const request = makeGetCarScheduleControllerRequestMock();

    const response = await getCarScheduleController.handle(request);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call GetCarScheduleUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(getCarScheduleUseCaseSpy, 'execute');

    const request = makeGetCarScheduleControllerRequestMock();

    await getCarScheduleController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      car_id: request.params.id,
    });
  });

  it('should throw if GetCarScheduleUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(getCarScheduleUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeGetCarScheduleControllerRequestMock();

    const promise = getCarScheduleController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if GetCarScheduleUseCase throws a CarNotFoundWithProvidedIdError', async () => {
    const errorMock = new CarNotFoundWithProvidedIdError();

    jest
      .spyOn(getCarScheduleUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeGetCarScheduleControllerRequestMock();

    const response = await getCarScheduleController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return ok (200) on success', async () => {
    const outputMock = makeGetCarScheduleUseCaseOutputMock();

    jest
      .spyOn(getCarScheduleUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const request = makeGetCarScheduleControllerRequestMock();

    const response = await getCarScheduleController.handle(request);

    expect(response).toEqual(ok(outputMock));
  });
});
