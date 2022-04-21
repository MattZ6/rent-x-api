import {
  UserNotFoundWithProvidedIdError,
  UserHasOutstandingRentPaymentsError,
  CarNotFoundWithProvidedIdError,
  InvalidRentDurationTimeError,
  CarAlreadyBookedOnThisDateError,
} from '@domain/errors';

import { CreateRentController } from '@presentation/controllers/rent/Create';
import {
  notFound,
  paymentRequired,
  unprocessableEntity,
  conflict,
  created,
} from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  CreateRentUseCaseSpy,
  makeCreateRentControllerRequestMock,
} from '../../mocks';

let createRentUseCaseSpy: CreateRentUseCaseSpy;

let createRentController: CreateRentController;

describe('CreateRentController', () => {
  beforeEach(() => {
    createRentUseCaseSpy = new CreateRentUseCaseSpy();

    createRentController = new CreateRentController(createRentUseCaseSpy);
  });

  it('should call CreateRentUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(createRentUseCaseSpy, 'execute');

    const request = makeCreateRentControllerRequestMock();

    await createRentController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      user_id: request.user_id,
      car_id: request.body.car_id,
      start_date: request.body.start_date,
      expected_return_date: request.body.end_date,
    });
  });

  it('should throw if CreateRentUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(createRentUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeCreateRentControllerRequestMock();

    const promise = createRentController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if CreateRentUseCase throws UserNotFoundWithProvidedIdError', async () => {
    const errorMock = new UserNotFoundWithProvidedIdError();

    jest
      .spyOn(createRentUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeCreateRentControllerRequestMock();

    const response = await createRentController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return payment required (402) if CreateRentUseCase throws UserHasOutstandingRentPaymentsError', async () => {
    const errorMock = new UserHasOutstandingRentPaymentsError();

    jest
      .spyOn(createRentUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeCreateRentControllerRequestMock();

    const response = await createRentController.handle(request);

    expect(response).toEqual(paymentRequired(errorMock));
  });

  it('should return not found (404) if CreateRentUseCase throws CarNotFoundWithProvidedIdError', async () => {
    const errorMock = new CarNotFoundWithProvidedIdError();

    jest
      .spyOn(createRentUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeCreateRentControllerRequestMock();

    const response = await createRentController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return unprocessable entity (422) if CreateRentUseCase throws InvalidRentDurationTimeError', async () => {
    const errorMock = new InvalidRentDurationTimeError();

    jest
      .spyOn(createRentUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeCreateRentControllerRequestMock();

    const response = await createRentController.handle(request);

    expect(response).toEqual(unprocessableEntity(errorMock));
  });

  it('should return conflict (409) if CreateRentUseCase throws CarAlreadyBookedOnThisDateError', async () => {
    const errorMock = new CarAlreadyBookedOnThisDateError();

    jest
      .spyOn(createRentUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeCreateRentControllerRequestMock();

    const response = await createRentController.handle(request);

    expect(response).toEqual(conflict(errorMock));
  });

  it('should return created (201) on success', async () => {
    const request = makeCreateRentControllerRequestMock();

    const response = await createRentController.handle(request);

    expect(response).toEqual(created<void>());
  });
});
