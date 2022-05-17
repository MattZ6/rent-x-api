import {
  CarNotFoundWithProvidedIdError,
  OneOrMoreCarSpecificationsAlreadyRelatedToCarError,
  OneOrMoreCarSpecificationsNotFoundWithProvidedIdsError,
} from '@domain/errors';

import { AddSpecificationsToCarController } from '@presentation/controllers/car/specification/AddToCar';
import {
  badRequest,
  conflict,
  created,
  notFound,
} from '@presentation/helpers/http';

import { makeErrorMock } from '../../../../domain';
import {
  AddSpecificationsToCarUseCaseSpy,
  makeAddSpecificationsToCarControllerRequestMock,
  makeValidationErrorMock,
  ValidationSpy,
} from '../../../mocks';

let validationSpy: ValidationSpy;
let addSpecificationsToCarUseCase: AddSpecificationsToCarUseCaseSpy;

let addSpecificationsToCarController: AddSpecificationsToCarController;

describe('AddSpecificationsToCarController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    addSpecificationsToCarUseCase = new AddSpecificationsToCarUseCaseSpy();

    addSpecificationsToCarController = new AddSpecificationsToCarController(
      validationSpy,
      addSpecificationsToCarUseCase
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const request = makeAddSpecificationsToCarControllerRequestMock();

    await addSpecificationsToCarController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith({
      ...request.params,
      ...request.body,
    });
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const request = makeAddSpecificationsToCarControllerRequestMock();

    const promise = addSpecificationsToCarController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const request = makeAddSpecificationsToCarControllerRequestMock();

    const response = await addSpecificationsToCarController.handle(request);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call AddSpecificationsToCarUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(addSpecificationsToCarUseCase, 'execute');

    const request = makeAddSpecificationsToCarControllerRequestMock();

    await addSpecificationsToCarController.handle(request);

    expect(executeSpy).toHaveBeenCalledWith({
      car_id: request.params.id,
      specifications_ids: request.body.specifications_ids,
    });
    expect(executeSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if AddSpecificationsToCarUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(addSpecificationsToCarUseCase, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeAddSpecificationsToCarControllerRequestMock();

    const promise = addSpecificationsToCarController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if AddSpecificationsToCarUseCase throws CarNotFoundWithProvidedIdError', async () => {
    const errorMock = new CarNotFoundWithProvidedIdError();

    jest
      .spyOn(addSpecificationsToCarUseCase, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeAddSpecificationsToCarControllerRequestMock();

    const response = await addSpecificationsToCarController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return not found (404) if AddSpecificationsToCarUseCase throws OneOrMoreCarSpecificationsNotFoundWithProvidedIdsError', async () => {
    const errorMock =
      new OneOrMoreCarSpecificationsNotFoundWithProvidedIdsError();

    jest
      .spyOn(addSpecificationsToCarUseCase, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeAddSpecificationsToCarControllerRequestMock();

    const response = await addSpecificationsToCarController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return conflict (409) if AddSpecificationsToCarUseCase throws OneOrMoreCarSpecificationsAlreadyRelatedToCarError', async () => {
    const errorMock = new OneOrMoreCarSpecificationsAlreadyRelatedToCarError();

    jest
      .spyOn(addSpecificationsToCarUseCase, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeAddSpecificationsToCarControllerRequestMock();

    const response = await addSpecificationsToCarController.handle(request);

    expect(response).toEqual(conflict(errorMock));
  });

  it('should return created (201) on success', async () => {
    const request = makeAddSpecificationsToCarControllerRequestMock();

    const response = await addSpecificationsToCarController.handle(request);

    expect(response).toEqual(created<void>());
  });
});
