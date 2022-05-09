import { UserAlreadyExistsWithProvidedEmailError } from '@domain/errors';

import { UpdateUserEmailController } from '@presentation/controllers/user/UpdateEmail';
import { badRequest, conflict, noContent } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  ValidationSpy,
  UpdateUserEmailUseCaseSpy,
  makeUpdateUserEmailControllerRequestMock,
  makeValidationErrorMock,
  makeUpdateUserEmailUseCaseOutputMock,
} from '../../mocks';

let validationSpy: ValidationSpy;
let updateUserEmailUseCaseSpy: UpdateUserEmailUseCaseSpy;

let updateUserEmailController: UpdateUserEmailController;

describe('UpdateUserEmailController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    updateUserEmailUseCaseSpy = new UpdateUserEmailUseCaseSpy();

    updateUserEmailController = new UpdateUserEmailController(
      validationSpy,
      updateUserEmailUseCaseSpy
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const request = makeUpdateUserEmailControllerRequestMock();

    await updateUserEmailController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(request.body);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const request = makeUpdateUserEmailControllerRequestMock();

    const promise = updateUserEmailController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const request = makeUpdateUserEmailControllerRequestMock();

    const response = await updateUserEmailController.handle(request);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call UpdateUserEmailUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(updateUserEmailUseCaseSpy, 'execute');

    const request = makeUpdateUserEmailControllerRequestMock();

    await updateUserEmailController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      id: request.user.id,
      email: request.body.email,
    });
  });

  it('should throw if UpdateUserEmailUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(updateUserEmailUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeUpdateUserEmailControllerRequestMock();

    const promise = updateUserEmailController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return conflict (409) if UpdateUserEmailUseCase throws UserAlreadyExistsWithProvidedEmailError', async () => {
    const errorMock = new UserAlreadyExistsWithProvidedEmailError();

    jest
      .spyOn(updateUserEmailUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeUpdateUserEmailControllerRequestMock();

    const response = await updateUserEmailController.handle(request);

    expect(response).toEqual(conflict(errorMock));
  });

  it('should return no content (204) on success', async () => {
    const outputMock = makeUpdateUserEmailUseCaseOutputMock();

    jest
      .spyOn(updateUserEmailUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const request = makeUpdateUserEmailControllerRequestMock();

    const response = await updateUserEmailController.handle(request);

    expect(response).toEqual(noContent());
  });
});
