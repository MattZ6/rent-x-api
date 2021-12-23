import faker from 'faker';

import {
  TokenExpiredError,
  UserNotFoundWithThisIdError,
  UserTokenNotFoundWithThisTokenError,
} from '@domain/errors';

import { ResetUserPasswordController } from '@presentation/controllers/user/ResetUserPassword';
import {
  notFound,
  unprocessableEntity,
  noContent,
} from '@presentation/helpers/http/http';

import { ResetUserPasswordUseCaseSpy } from '../../mocks';

let resetUserPasswordUseCaseSpy: ResetUserPasswordUseCaseSpy;

let resetUserPasswordController: ResetUserPasswordController;

const resetUserPasswordControllerRequest: ResetUserPasswordController.Request =
  {
    body: {
      token: faker.datatype.string(),
      new_password: faker.internet.password(),
    },
  };

describe('ResetUserPasswordController', () => {
  beforeEach(() => {
    resetUserPasswordUseCaseSpy = new ResetUserPasswordUseCaseSpy();

    resetUserPasswordController = new ResetUserPasswordController(
      resetUserPasswordUseCaseSpy
    );
  });

  it('should call RefreshUserAccessTokenUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(resetUserPasswordUseCaseSpy, 'execute');

    await resetUserPasswordController.handle(
      resetUserPasswordControllerRequest
    );

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      token: resetUserPasswordControllerRequest.body.token,
      new_password: resetUserPasswordControllerRequest.body.new_password,
    });
  });

  it('should throw if RefreshUserAccessTokenUseCase throws', async () => {
    jest
      .spyOn(resetUserPasswordUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = resetUserPasswordController.handle(
      resetUserPasswordControllerRequest
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return not found (404) if RefreshUserAccessTokenUseCase throws UserTokenNotFoundWithThisTokenError', async () => {
    const error = new UserTokenNotFoundWithThisTokenError();

    jest
      .spyOn(resetUserPasswordUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await resetUserPasswordController.handle(
      resetUserPasswordControllerRequest
    );

    expect(response).toEqual(notFound(error));
  });

  it('should return unprocessable entity (422) if RefreshUserAccessTokenUseCase throws TokenExpiredError', async () => {
    const error = new TokenExpiredError();

    jest
      .spyOn(resetUserPasswordUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await resetUserPasswordController.handle(
      resetUserPasswordControllerRequest
    );

    expect(response).toEqual(unprocessableEntity(error));
  });

  it('should return not found (404) if RefreshUserAccessTokenUseCase throws UserNotFoundWithThisIdError', async () => {
    const error = new UserNotFoundWithThisIdError();

    jest
      .spyOn(resetUserPasswordUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await resetUserPasswordController.handle(
      resetUserPasswordControllerRequest
    );

    expect(response).toEqual(notFound(error));
  });

  it('should return no content (204) on success', async () => {
    const response = await resetUserPasswordController.handle(
      resetUserPasswordControllerRequest
    );

    expect(response).toEqual(noContent());
  });
});
