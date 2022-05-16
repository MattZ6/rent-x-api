import {
  UserAvatarNotFoundWithProvidedUserIdError,
  UserNotFoundWithProvidedIdError,
} from '@domain/errors';

import { RemoveUserAvatarController } from '@presentation/controllers/user/RemoveAvatar';
import { noContent, notFound } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  makeRemoveUserAvatarControllerRequestMock,
  RemoveUserAvatarUseCaseSpy,
} from '../../mocks';

let removeUserAvatarUseCaseSpy: RemoveUserAvatarUseCaseSpy;

let removeUserAvatarController: RemoveUserAvatarController;

describe('RemoveUserAvatarController', () => {
  beforeEach(() => {
    removeUserAvatarUseCaseSpy = new RemoveUserAvatarUseCaseSpy();

    removeUserAvatarController = new RemoveUserAvatarController(
      removeUserAvatarUseCaseSpy
    );
  });

  it('should call RemoveUserAvatarUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(removeUserAvatarUseCaseSpy, 'execute');

    const request = makeRemoveUserAvatarControllerRequestMock();

    await removeUserAvatarController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({ user_id: request.user.id });
  });

  it('should throw if RemoveUserAvatarUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(removeUserAvatarUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeRemoveUserAvatarControllerRequestMock();

    const promise = removeUserAvatarController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if RemoveUserAvatarUseCase throws UserNotFoundWithProvidedIdError', async () => {
    const errorMock = new UserNotFoundWithProvidedIdError();

    jest
      .spyOn(removeUserAvatarUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeRemoveUserAvatarControllerRequestMock();

    const response = await removeUserAvatarController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return not found (404) if RemoveUserAvatarUseCase throws UserAvatarNotFoundWithProvidedUserIdError', async () => {
    const errorMock = new UserAvatarNotFoundWithProvidedUserIdError();

    jest
      .spyOn(removeUserAvatarUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeRemoveUserAvatarControllerRequestMock();

    const response = await removeUserAvatarController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return no content (204) on success', async () => {
    const request = makeRemoveUserAvatarControllerRequestMock();

    const response = await removeUserAvatarController.handle(request);

    expect(response).toEqual(noContent());
  });
});
