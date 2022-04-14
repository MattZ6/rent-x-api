import {
  UserTokenExpiredError,
  UserTokenNotFoundWithThisTokenError,
} from '@domain/errors';

import { RefreshUserAccessTokenController } from '@presentation/controllers/user/RefreshUserAccessToken';
import { notFound, ok, unprocessableEntity } from '@presentation/helpers/http';

import {
  refreshUserAccessTokenControllerRequestMock,
  refreshUserAccessTokenUseCaseOutputMock,
  RefreshUserAccessTokenUseCaseSpy,
} from '../../mocks';

let refreshUserAccessTokenUseCaseSpy: RefreshUserAccessTokenUseCaseSpy;

let refreshUserAccessTokenController: RefreshUserAccessTokenController;

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
      refreshUserAccessTokenControllerRequestMock
    );

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      refresh_token:
        refreshUserAccessTokenControllerRequestMock.body.refresh_token,
    });
  });

  it('should throw if RefreshUserAccessTokenUseCase throws', async () => {
    jest
      .spyOn(refreshUserAccessTokenUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = refreshUserAccessTokenController.handle(
      refreshUserAccessTokenControllerRequestMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return not found (404) if RefreshUserAccessTokenUseCase throws UserTokenNotFoundWithThisTokenError', async () => {
    const error = new UserTokenNotFoundWithThisTokenError();

    jest
      .spyOn(refreshUserAccessTokenUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await refreshUserAccessTokenController.handle(
      refreshUserAccessTokenControllerRequestMock
    );

    expect(response).toEqual(notFound(error));
  });

  it('should return unprocessable entity (422) if RefreshUserAccessTokenUseCase throws UserTokenExpiredError', async () => {
    const error = new UserTokenExpiredError();

    jest
      .spyOn(refreshUserAccessTokenUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await refreshUserAccessTokenController.handle(
      refreshUserAccessTokenControllerRequestMock
    );

    expect(response).toEqual(unprocessableEntity(error));
  });

  it('should return ok (200) on success', async () => {
    jest
      .spyOn(refreshUserAccessTokenUseCaseSpy, 'execute')
      .mockResolvedValueOnce(refreshUserAccessTokenUseCaseOutputMock);

    const response = await refreshUserAccessTokenController.handle(
      refreshUserAccessTokenControllerRequestMock
    );

    expect(response).toEqual(ok(refreshUserAccessTokenUseCaseOutputMock));
  });
});
