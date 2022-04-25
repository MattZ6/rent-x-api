import {
  UserTokenExpiredError,
  UserTokenNotFoundWithProvidedTokenError,
} from '@domain/errors';

import { RefreshUserAccessTokenController } from '@presentation/controllers/user/RefreshAccessToken';
import {
  badRequest,
  notFound,
  ok,
  unprocessableEntity,
} from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  makeRefreshUserAccessTokenControllerRequestMock,
  makeRefreshUserAccessTokenUseCaseOutputMock,
  makeValidationErrorMock,
  RefreshUserAccessTokenUseCaseSpy,
  ValidationSpy,
} from '../../mocks';

let validationSpy: ValidationSpy;
let refreshUserAccessTokenUseCaseSpy: RefreshUserAccessTokenUseCaseSpy;

let refreshUserAccessTokenController: RefreshUserAccessTokenController;

describe('RefreshUserAccessTokenController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    refreshUserAccessTokenUseCaseSpy = new RefreshUserAccessTokenUseCaseSpy();

    refreshUserAccessTokenController = new RefreshUserAccessTokenController(
      validationSpy,
      refreshUserAccessTokenUseCaseSpy
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const request = makeRefreshUserAccessTokenControllerRequestMock();

    await refreshUserAccessTokenController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(request.body);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const request = makeRefreshUserAccessTokenControllerRequestMock();

    const promise = refreshUserAccessTokenController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const request = makeRefreshUserAccessTokenControllerRequestMock();

    const response = await refreshUserAccessTokenController.handle(request);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call RefreshUserAccessTokenUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(refreshUserAccessTokenUseCaseSpy, 'execute');

    const request = makeRefreshUserAccessTokenControllerRequestMock();

    await refreshUserAccessTokenController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      refresh_token: request.body.refresh_token,
    });
  });

  it('should throw if RefreshUserAccessTokenUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(refreshUserAccessTokenUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeRefreshUserAccessTokenControllerRequestMock();

    const promise = refreshUserAccessTokenController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if RefreshUserAccessTokenUseCase throws UserTokenNotFoundWithProvidedTokenError', async () => {
    const errorMock = new UserTokenNotFoundWithProvidedTokenError();

    jest
      .spyOn(refreshUserAccessTokenUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeRefreshUserAccessTokenControllerRequestMock();

    const response = await refreshUserAccessTokenController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return unprocessable entity (422) if RefreshUserAccessTokenUseCase throws UserTokenExpiredError', async () => {
    const errorMock = new UserTokenExpiredError();

    jest
      .spyOn(refreshUserAccessTokenUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeRefreshUserAccessTokenControllerRequestMock();

    const response = await refreshUserAccessTokenController.handle(request);

    expect(response).toEqual(unprocessableEntity(errorMock));
  });

  it('should return ok (200) on success', async () => {
    const outputMock = makeRefreshUserAccessTokenUseCaseOutputMock();

    jest
      .spyOn(refreshUserAccessTokenUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const request = makeRefreshUserAccessTokenControllerRequestMock();

    const response = await refreshUserAccessTokenController.handle(request);

    expect(response).toEqual(ok(outputMock));
  });
});
