import { faker } from '@faker-js/faker';

import {
  RentAlreadyClosedError,
  RentBelongsToAnotherUserError,
  RentNotFoundWithProvidedIdError,
  RentalIsNotInProgressError,
} from '@domain/errors';

import { ReturnRentController } from '@presentation/controllers/rent/Return';
import {
  conflict,
  noContent,
  notFound,
  unprocessableEntity,
} from '@presentation/helpers/http';

import {
  makeReturnRentControllerRequestMock,
  ReturnRentUseCaseSpy,
} from '../../mocks';

let returnRentUseCaseSpy: ReturnRentUseCaseSpy;

let returnRentController: ReturnRentController;

describe('ReturnRentController', () => {
  beforeEach(() => {
    returnRentUseCaseSpy = new ReturnRentUseCaseSpy();

    returnRentController = new ReturnRentController(returnRentUseCaseSpy);
  });

  it('should call ReturnRentUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(returnRentUseCaseSpy, 'execute');

    const request = makeReturnRentControllerRequestMock();

    await returnRentController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      rent_id: request.params.id,
      user_id: request.user_id,
    });
  });

  it('should throw if ReturnRentUseCase throws', async () => {
    const errorMock = new Error(faker.datatype.string());

    jest
      .spyOn(returnRentUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeReturnRentControllerRequestMock();

    const promise = returnRentController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if ReturnRentUseCase throws RentNotFoundWithProvidedIdError', async () => {
    const errorMock = new RentNotFoundWithProvidedIdError();

    jest
      .spyOn(returnRentUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeReturnRentControllerRequestMock();

    const response = await returnRentController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return not found (404) if ReturnRentUseCase throws RentBelongsToAnotherUserError', async () => {
    const errorMock = new RentBelongsToAnotherUserError();

    jest
      .spyOn(returnRentUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeReturnRentControllerRequestMock();

    const response = await returnRentController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return unprocessable entity (422) if ReturnRentUseCase throws RentalIsNotInProgressError', async () => {
    const errorMock = new RentalIsNotInProgressError();

    jest
      .spyOn(returnRentUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeReturnRentControllerRequestMock();

    const response = await returnRentController.handle(request);

    expect(response).toEqual(unprocessableEntity(errorMock));
  });

  it('should return conflict (409) if ReturnRentUseCase throws RentAlreadyClosedError', async () => {
    const errorMock = new RentAlreadyClosedError();

    jest
      .spyOn(returnRentUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeReturnRentControllerRequestMock();

    const response = await returnRentController.handle(request);

    expect(response).toEqual(conflict(errorMock));
  });

  it('should return no content (204) on success', async () => {
    const request = makeReturnRentControllerRequestMock();

    const response = await returnRentController.handle(request);

    expect(response).toEqual(noContent());
  });
});
