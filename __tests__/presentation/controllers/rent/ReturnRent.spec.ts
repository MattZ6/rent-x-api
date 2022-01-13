import faker from 'faker';

import { RentNotFoundWithProvidedIdError } from '@domain/errors';

import { ReturnRentController } from '@presentation/controllers/rent/ReturnRent';
import { notFound } from '@presentation/helpers/http/http';

import {
  returnRentControllerRequestMock,
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

    await returnRentController.handle(returnRentControllerRequestMock);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      rent_id: returnRentControllerRequestMock.params.id,
      user_id: returnRentControllerRequestMock.user_id,
    });
  });

  it('should throw if ReturnRentUseCase throws', async () => {
    const error = new Error(faker.datatype.string());

    jest.spyOn(returnRentUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const promise = returnRentController.handle(
      returnRentControllerRequestMock
    );

    await expect(promise).rejects.toThrowError(error);
  });

  it('should return not found (404) if ReturnRentUseCase throws RentNotFoundWithProvidedIdError', async () => {
    const error = new RentNotFoundWithProvidedIdError();

    jest.spyOn(returnRentUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const response = await returnRentController.handle(
      returnRentControllerRequestMock
    );

    expect(response).toEqual(notFound(error));
  });
});
