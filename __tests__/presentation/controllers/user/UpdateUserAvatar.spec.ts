import { faker } from '@faker-js/faker';

import { UserNotFoundWithThisIdError } from '@domain/errors';

import { UpdateUserAvatarController } from '@presentation/controllers/user/UpdateUserAvatar';
import { noContent, notFound } from '@presentation/helpers/http/http';

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
      user_id: request.user_id,
      file: {
        name: request.body.file.originalname,
        type: request.body.file.mimetype,
        extension: String(request.body.file.originalname.split('.').pop()),
        size: request.body.file.size,
        content: request.body.file.buffer,
      },
    });
  });

  it('should throw if UpdateUserAvatarUseCase throws', async () => {
    const error = new Error(faker.datatype.string());

    jest
      .spyOn(updateUserAvatarUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const request = makeUpdateUserAvatarControllerRequestMock();

    const promise = updateUserAvatarController.handle(request);

    await expect(promise).rejects.toThrowError(error);
  });

  it('should return not found (404) if UpdateUserAvatarUseCase throws UserNotFoundWithThisIdError', async () => {
    const error = new UserNotFoundWithThisIdError();

    jest
      .spyOn(updateUserAvatarUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const request = makeUpdateUserAvatarControllerRequestMock();

    const response = await updateUserAvatarController.handle(request);

    expect(response).toEqual(notFound(error));
  });

  it('should return no content (204) on success', async () => {
    const request = makeUpdateUserAvatarControllerRequestMock();

    const response = await updateUserAvatarController.handle(request);

    expect(response).toEqual(noContent());
  });
});
