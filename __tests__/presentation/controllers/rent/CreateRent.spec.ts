import {
  CarNotFoundWithThisIdError,
  InvalidRentDurationTimeError,
  CarAlreadyBookedOnThisDateError,
  UserHasOutstandingRentPaymentsError,
  UserNotFoundWithThisIdError,
} from '@domain/errors';

import { CreateRentController } from '@presentation/controllers/rent/CreateRent';
import {
  conflict,
  created,
  notFound,
  paymentRequired,
  unprocessableEntity,
} from '@presentation/helpers/http/http';

import {
  createRentControllerRequestMock,
  CreateRentUseCaseSpy,
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

    await createRentController.handle(createRentControllerRequestMock);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      user_id: createRentControllerRequestMock.user_id,
      car_id: createRentControllerRequestMock.body.car_id,
      start_date: createRentControllerRequestMock.body.start_date,
      expected_return_date: createRentControllerRequestMock.body.end_date,
    });
  });

  it('should throw if CreateRentUseCase throws', async () => {
    jest
      .spyOn(createRentUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = createRentController.handle(
      createRentControllerRequestMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return not found (404) if CreateRentUseCase throws UserNotFoundWithThisIdError', async () => {
    const error = new UserNotFoundWithThisIdError();

    jest.spyOn(createRentUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const response = await createRentController.handle(
      createRentControllerRequestMock
    );

    expect(response).toEqual(notFound(error));
  });

  it('should return payment required (402) if CreateRentUseCase throws UserHasRentsWithPendingPaymentError', async () => {
    const error = new UserHasOutstandingRentPaymentsError();

    jest.spyOn(createRentUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const response = await createRentController.handle(
      createRentControllerRequestMock
    );

    expect(response).toEqual(paymentRequired(error));
  });

  it('should return not found (404) if CreateRentUseCase throws CarNotFoundWithThisIdError', async () => {
    const error = new CarNotFoundWithThisIdError();

    jest.spyOn(createRentUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const response = await createRentController.handle(
      createRentControllerRequestMock
    );

    expect(response).toEqual(notFound(error));
  });

  it('should return unprocessable entity (422) if CreateRentUseCase throws InvalidRentDurationTimeError', async () => {
    const error = new InvalidRentDurationTimeError();

    jest.spyOn(createRentUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const response = await createRentController.handle(
      createRentControllerRequestMock
    );

    expect(response).toEqual(unprocessableEntity(error));
  });

  it('should return conflict (409) if CreateRentUseCase throws RentAlreadyExistsInThisDateForThisCarError', async () => {
    const error = new CarAlreadyBookedOnThisDateError();

    jest.spyOn(createRentUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const response = await createRentController.handle(
      createRentControllerRequestMock
    );

    expect(response).toEqual(conflict(error));
  });

  it('should return created (201) on success', async () => {
    const response = await createRentController.handle(
      createRentControllerRequestMock
    );

    expect(response).toEqual(created<void>());
  });
});
