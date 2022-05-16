import { UserNotFoundWithProvidedIdError } from '@domain/errors';

import { UpdateUserAvatarController } from '@presentation/controllers/user/UpdateAvatar';
import { badRequest, noContent, notFound } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  makeUpdateUserAvatarControllerRequestMock,
  makeValidationErrorMock,
  UpdateUserAvatarUseCaseSpy,
  ValidationSpy,
} from '../../mocks';

let validationSpy: ValidationSpy;
let updateUserAvatarUseCaseSpy: UpdateUserAvatarUseCaseSpy;

let updateUserAvatarController: UpdateUserAvatarController;

describe('UpdateUserAvatarController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    updateUserAvatarUseCaseSpy = new UpdateUserAvatarUseCaseSpy();

    updateUserAvatarController = new UpdateUserAvatarController(
      validationSpy,
      updateUserAvatarUseCaseSpy
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const request = makeUpdateUserAvatarControllerRequestMock();

    await updateUserAvatarController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(request);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const request = makeUpdateUserAvatarControllerRequestMock();

    const promise = updateUserAvatarController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const request = makeUpdateUserAvatarControllerRequestMock();

    const response = await updateUserAvatarController.handle(request);

    expect(response).toEqual(badRequest(validationErrorMock));
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
