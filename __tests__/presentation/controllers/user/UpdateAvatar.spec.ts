import { UserNotFoundWithProvidedIdError } from '@domain/errors';

import { UpdateUserAvatarController } from '@presentation/controllers/user/UpdateAvatar';
import { noContent, notFound } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  makeUpdateUserAvatarControllerRequestMock,
  UpdateUserAvatarUseCaseSpy,
} from '../../mocks';

let updateUserAvatarUseCaseSpy: UpdateUserAvatarUseCaseSpy;

let updateUserAvatarController: UpdateUserAvatarController;

describe('UpdateUserAvatarController', () => {
  beforeEach(() => {
    updateUserAvatarUseCaseSpy = new UpdateUserAvatarUseCaseSpy();

    updateUserAvatarController = new UpdateUserAvatarController(
      updateUserAvatarUseCaseSpy
    );
  });

  it('should call UpdateUserAvatarUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(updateUserAvatarUseCaseSpy, 'execute');

    const request = makeUpdateUserAvatarControllerRequestMock();

    await updateUserAvatarController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      user_id: request.user.id,
      file: {
        name: request.file.name,
        type: request.file.mimetype,
        extension: String(request.file.name.split('.').pop()),
        size: request.file.size,
        content: request.file.buffer,
      },
    });
  });

  it('should throw if UpdateUserAvatarUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(updateUserAvatarUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeUpdateUserAvatarControllerRequestMock();

    const promise = updateUserAvatarController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if UpdateUserAvatarUseCase throws UserNotFoundWithProvidedIdError', async () => {
    const errorMock = new UserNotFoundWithProvidedIdError();

    jest
      .spyOn(updateUserAvatarUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeUpdateUserAvatarControllerRequestMock();

    const response = await updateUserAvatarController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return no content (204) on success', async () => {
    const request = makeUpdateUserAvatarControllerRequestMock();

    const response = await updateUserAvatarController.handle(request);

    expect(response).toEqual(noContent());
  });
});
