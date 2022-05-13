import {
  UserNotFoundWithProvidedIdError,
  WrongPasswordError,
} from '@domain/errors';

import { UpdateUserPasswordController } from '@presentation/controllers/user/UpdatePassword';
import {
  badRequest,
  noContent,
  notFound,
  unprocessableEntity,
} from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  makeUpdateUserPasswordControllerRequestMock,
  makeUpdateUserPasswordUseCaseOutputMock,
  makeValidationErrorMock,
  UpdateUserPasswordUseCaseSpy,
  ValidationSpy,
} from '../../mocks';

let validationSpy: ValidationSpy;
let updateUserPasswordUseCaseSpy: UpdateUserPasswordUseCaseSpy;

let updateUserPasswordController: UpdateUserPasswordController;

describe('UpdateUserPasswordController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    updateUserPasswordUseCaseSpy = new UpdateUserPasswordUseCaseSpy();

    updateUserPasswordController = new UpdateUserPasswordController(
      validationSpy,
      updateUserPasswordUseCaseSpy
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const request = makeUpdateUserPasswordControllerRequestMock();

    await updateUserPasswordController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(request.body);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const request = makeUpdateUserPasswordControllerRequestMock();

    const promise = updateUserPasswordController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const request = makeUpdateUserPasswordControllerRequestMock();

    const response = await updateUserPasswordController.handle(request);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call UpdateUserPasswordUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(updateUserPasswordUseCaseSpy, 'execute');

    const request = makeUpdateUserPasswordControllerRequestMock();

    await updateUserPasswordController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      id: request.user.id,
      old_password: request.body.old_password,
      new_password: request.body.new_password,
    });
  });

  it('should throw if UpdateUserPasswordUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(updateUserPasswordUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeUpdateUserPasswordControllerRequestMock();

    const promise = updateUserPasswordController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if UpdateUserPasswordUseCase throws UserNotFoundWithProvidedIdError', async () => {
    const errorMock = new UserNotFoundWithProvidedIdError();

    jest
      .spyOn(updateUserPasswordUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeUpdateUserPasswordControllerRequestMock();

    const response = await updateUserPasswordController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return unprocessable entity (422) if UpdateUserPasswordUseCase throws WrongPasswordError', async () => {
    const errorMock = new WrongPasswordError();

    jest
      .spyOn(updateUserPasswordUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeUpdateUserPasswordControllerRequestMock();

    const response = await updateUserPasswordController.handle(request);

    expect(response).toEqual(unprocessableEntity(errorMock));
  });

  it('should return no content (204) on success', async () => {
    const outputMock = makeUpdateUserPasswordUseCaseOutputMock();

    jest
      .spyOn(updateUserPasswordUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const request = makeUpdateUserPasswordControllerRequestMock();

    const response = await updateUserPasswordController.handle(request);

    expect(response).toEqual(noContent());
  });
});
