import {
  CarNotFoundWithProvidedIdError,
  CarSpecificationNotFoundWithProvidedIdError,
  NotFoundWithProvidedIdFromCar,
} from '@domain/errors';

import { RemoveSpecificationFromCarController } from '@presentation/controllers/car/specification/RemoveFromCar';
import { badRequest, noContent, notFound } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../../domain';
import {
  RemoveSpecificationFromCarUseCaseSpy,
  makeRemoveSpecificationFromCarControllerRequestMock,
  makeValidationErrorMock,
  ValidationSpy,
} from '../../../mocks';

let validationSpy: ValidationSpy;
let removeSpecificationFromCarUseCaseSpy: RemoveSpecificationFromCarUseCaseSpy;

let removeSpecificationFromCarController: RemoveSpecificationFromCarController;

describe('RemoveSpecificationFromCarController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    removeSpecificationFromCarUseCaseSpy =
      new RemoveSpecificationFromCarUseCaseSpy();

    removeSpecificationFromCarController =
      new RemoveSpecificationFromCarController(
        validationSpy,
        removeSpecificationFromCarUseCaseSpy
      );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const request = makeRemoveSpecificationFromCarControllerRequestMock();

    await removeSpecificationFromCarController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(request.params);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const request = makeRemoveSpecificationFromCarControllerRequestMock();

    const promise = removeSpecificationFromCarController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const request = makeRemoveSpecificationFromCarControllerRequestMock();

    const response = await removeSpecificationFromCarController.handle(request);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call RemoveSpecificationFromCarUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(
      removeSpecificationFromCarUseCaseSpy,
      'execute'
    );

    const request = makeRemoveSpecificationFromCarControllerRequestMock();

    await removeSpecificationFromCarController.handle(request);

    expect(executeSpy).toHaveBeenCalledWith({
      car_id: request.params.id,
      specification_id: request.params.specification_id,
    });
    expect(executeSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if RemoveSpecificationFromCarUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(removeSpecificationFromCarUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeRemoveSpecificationFromCarControllerRequestMock();

    const promise = removeSpecificationFromCarController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if RemoveSpecificationFromCarUseCase throws CarNotFoundWithProvidedIdError', async () => {
    const errorMock = new CarNotFoundWithProvidedIdError();

    jest
      .spyOn(removeSpecificationFromCarUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeRemoveSpecificationFromCarControllerRequestMock();

    const response = await removeSpecificationFromCarController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return not found (404) if RemoveSpecificationFromCarUseCase throws CarSpecificationNotFoundWithProvidedIdError', async () => {
    const errorMock = new CarSpecificationNotFoundWithProvidedIdError();

    jest
      .spyOn(removeSpecificationFromCarUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeRemoveSpecificationFromCarControllerRequestMock();

    const response = await removeSpecificationFromCarController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return not found (404) if RemoveSpecificationFromCarUseCase throws NotFoundWithProvidedIdFromCar', async () => {
    const errorMock = new NotFoundWithProvidedIdFromCar();

    jest
      .spyOn(removeSpecificationFromCarUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeRemoveSpecificationFromCarControllerRequestMock();

    const response = await removeSpecificationFromCarController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return no content (204) on success', async () => {
    const request = makeRemoveSpecificationFromCarControllerRequestMock();

    const response = await removeSpecificationFromCarController.handle(request);

    expect(response).toEqual(noContent());
  });
});
