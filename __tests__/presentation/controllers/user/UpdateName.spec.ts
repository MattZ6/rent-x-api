import { UserNotFoundWithProvidedIdError } from '@domain/errors';

import { UpdateUserNameController } from '@presentation/controllers/user/UpdateName';
import { badRequest, noContent, notFound } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  ValidationSpy,
  UpdateUserNameUseCaseSpy,
  makeUpdateUserNameControllerRequestMock,
  makeValidationErrorMock,
  makeUpdateUserNameUseCaseOutputMock,
} from '../../mocks';

let validationSpy: ValidationSpy;
let updateUserNameUseCaseSpy: UpdateUserNameUseCaseSpy;

let updateUserNameController: UpdateUserNameController;

describe('UpdateUserNameController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    updateUserNameUseCaseSpy = new UpdateUserNameUseCaseSpy();

    updateUserNameController = new UpdateUserNameController(
      validationSpy,
      updateUserNameUseCaseSpy
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const request = makeUpdateUserNameControllerRequestMock();

    await updateUserNameController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(request.body);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const request = makeUpdateUserNameControllerRequestMock();

    const promise = updateUserNameController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const request = makeUpdateUserNameControllerRequestMock();

    const response = await updateUserNameController.handle(request);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call UpdateUserNameUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(updateUserNameUseCaseSpy, 'execute');

    const request = makeUpdateUserNameControllerRequestMock();

    await updateUserNameController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      id: request.user.id,
      name: request.body.name,
    });
  });

  it('should throw if UpdateUserNameUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(updateUserNameUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeUpdateUserNameControllerRequestMock();

    const promise = updateUserNameController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if UpdateUserNameUseCase throws UserNotFoundWithProvidedIdError', async () => {
    const errorMock = new UserNotFoundWithProvidedIdError();

    jest
      .spyOn(updateUserNameUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeUpdateUserNameControllerRequestMock();

    const response = await updateUserNameController.handle(request);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return no content (204) on success', async () => {
    const outputMock = makeUpdateUserNameUseCaseOutputMock();

    jest
      .spyOn(updateUserNameUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const request = makeUpdateUserNameControllerRequestMock();

    const response = await updateUserNameController.handle(request);

    expect(response).toEqual(noContent());
  });
});
