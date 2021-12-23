import faker from 'faker';

import {
  TokenExpiredError,
  UserTokenNotFoundWithThisTokenError,
} from '@domain/errors';
import { IRefreshUserAccessTokenUseCase } from '@domain/usecases/user/RefreshUserAccessToken';

import { RefreshUserAccessTokenController } from '@presentation/controllers/user/RefreshUserAccessToken';
import {
  notFound,
  ok,
  unprocessableEntity,
} from '@presentation/helpers/http/http';

import { RefreshUserAccessTokenUseCaseSpy } from '../../mocks';

let refreshUserAccessTokenUseCaseSpy: RefreshUserAccessTokenUseCaseSpy;

let refreshUserAccessTokenController: RefreshUserAccessTokenController;

const refreshUserAccessTokenControllerRequest: RefreshUserAccessTokenController.Request =
  {
    body: { refresh_token: faker.datatype.string() },
  };

describe('RefreshUserAccessTokenController', () => {
  beforeEach(() => {
    refreshUserAccessTokenUseCaseSpy = new RefreshUserAccessTokenUseCaseSpy();

    refreshUserAccessTokenController = new RefreshUserAccessTokenController(
      refreshUserAccessTokenUseCaseSpy
    );
  });

  it('should call RefreshUserAccessTokenUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(refreshUserAccessTokenUseCaseSpy, 'execute');

    await refreshUserAccessTokenController.handle(
      refreshUserAccessTokenControllerRequest
    );

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      refresh_token: refreshUserAccessTokenControllerRequest.body.refresh_token,
    });
  });

  it('should throw if RefreshUserAccessTokenUseCase throws', async () => {
    jest
      .spyOn(refreshUserAccessTokenUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = refreshUserAccessTokenController.handle(
      refreshUserAccessTokenControllerRequest
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return not found (404) if RefreshUserAccessTokenUseCase throws UserTokenNotFoundWithThisTokenError', async () => {
    const error = new UserTokenNotFoundWithThisTokenError();

    jest
      .spyOn(refreshUserAccessTokenUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await refreshUserAccessTokenController.handle(
      refreshUserAccessTokenControllerRequest
    );

    expect(response).toEqual(notFound(error));
  });

  it('should return unprocessable entity (422) if RefreshUserAccessTokenUseCase throws TokenExpiredError', async () => {
    const error = new TokenExpiredError();

    jest
      .spyOn(refreshUserAccessTokenUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await refreshUserAccessTokenController.handle(
      refreshUserAccessTokenControllerRequest
    );

    expect(response).toEqual(unprocessableEntity(error));
  });

  it('should return ok (200) on success', async () => {
    const authentication: IRefreshUserAccessTokenUseCase.Output = {
      access_token: faker.datatype.string(),
      refresh_token: faker.datatype.string(),
    };

    jest
      .spyOn(refreshUserAccessTokenUseCaseSpy, 'execute')
      .mockResolvedValueOnce(authentication);

    const response = await refreshUserAccessTokenController.handle(
      refreshUserAccessTokenControllerRequest
    );

    expect(response).toEqual(ok(authentication));
  });
});
