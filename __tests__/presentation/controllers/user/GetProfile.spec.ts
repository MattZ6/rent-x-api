import { UserNotFoundWithProvidedIdError } from '@domain/errors';

import { GetUserProfileController } from '@presentation/controllers/user/GetProfile';
import { notFound, ok } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  GetUserProfileUseCaseSpy,
  makeGetUserProfileControllerRequestMock,
  makeGetUserProfileUseCaseOutputMock,
} from '../../mocks';

let getUserProfileUseCaseSpy: GetUserProfileUseCaseSpy;

let getUserProfileController: GetUserProfileController;

describe('GetUserProfileController', () => {
  beforeEach(() => {
    getUserProfileUseCaseSpy = new GetUserProfileUseCaseSpy();

    getUserProfileController = new GetUserProfileController(
      getUserProfileUseCaseSpy
    );
  });

  it('should call GetUserProfileUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(getUserProfileUseCaseSpy, 'execute');

    const request = makeGetUserProfileControllerRequestMock();

    await getUserProfileController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({ id: request.user_id });
  });

  it('should throw if GetUserProfileUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(getUserProfileUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeGetUserProfileControllerRequestMock();

    const promise = getUserProfileController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if GetUserProfileUseCase throws UserNotFoundWithProvidedIdError', async () => {
    const errorMock = new UserNotFoundWithProvidedIdError();

    jest
      .spyOn(getUserProfileUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeGetUserProfileControllerRequestMock();

    const response = await getUserProfileController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return ok (200) on success', async () => {
    const outputMock = makeGetUserProfileUseCaseOutputMock();

    jest
      .spyOn(getUserProfileUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const request = makeGetUserProfileControllerRequestMock();

    const response = await getUserProfileController.handle(request);

    expect(response).toEqual(ok(outputMock));
  });
});
