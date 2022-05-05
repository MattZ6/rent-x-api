import {
  UserTokenExpiredError,
  UserTokenNotFoundWithProvidedTokenError,
} from '@domain/errors';

import { ResetUserPasswordController } from '@presentation/controllers/user/ResetPassword';
import {
  notFound,
  unprocessableEntity,
  noContent,
  badRequest,
} from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  makeResetUserPasswordControllerRequestMock,
  makeValidationErrorMock,
  ResetUserPasswordUseCaseSpy,
  ValidationSpy,
} from '../../mocks';

let validationSpy: ValidationSpy;
let resetUserPasswordUseCaseSpy: ResetUserPasswordUseCaseSpy;

let resetUserPasswordController: ResetUserPasswordController;

describe('ResetUserPasswordController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    resetUserPasswordUseCaseSpy = new ResetUserPasswordUseCaseSpy();

    resetUserPasswordController = new ResetUserPasswordController(
      validationSpy,
      resetUserPasswordUseCaseSpy
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const request = makeResetUserPasswordControllerRequestMock();

    await resetUserPasswordController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(request.body);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const request = makeResetUserPasswordControllerRequestMock();

    const promise = resetUserPasswordController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const request = makeResetUserPasswordControllerRequestMock();

    const response = await resetUserPasswordController.handle(request);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call RefreshUserAccessTokenUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(resetUserPasswordUseCaseSpy, 'execute');

    const request = makeResetUserPasswordControllerRequestMock();

    await resetUserPasswordController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      token: request.body.token,
      new_password: request.body.new_password,
    });
  });

  it('should throw if RefreshUserAccessTokenUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(resetUserPasswordUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeResetUserPasswordControllerRequestMock();

    const promise = resetUserPasswordController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if RefreshUserAccessTokenUseCase throws UserTokenNotFoundWithProvidedTokenError', async () => {
    const errorMock = new UserTokenNotFoundWithProvidedTokenError();

    jest
      .spyOn(resetUserPasswordUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeResetUserPasswordControllerRequestMock();

    const response = await resetUserPasswordController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return unprocessable entity (422) if RefreshUserAccessTokenUseCase throws UserTokenExpiredError', async () => {
    const errorMock = new UserTokenExpiredError();

    jest
      .spyOn(resetUserPasswordUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeResetUserPasswordControllerRequestMock();

    const response = await resetUserPasswordController.handle(request);

    expect(response).toEqual(unprocessableEntity(errorMock));
  });

  it('should return no content (204) on success', async () => {
    const request = makeResetUserPasswordControllerRequestMock();

    const response = await resetUserPasswordController.handle(request);

    expect(response).toEqual(noContent());
  });
});
