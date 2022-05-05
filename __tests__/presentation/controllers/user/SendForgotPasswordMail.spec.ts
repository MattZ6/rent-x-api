import { UserNotFoundWithProvidedEmailError } from '@domain/errors';

import { SendForgotUserPasswordMailController } from '@presentation/controllers/user/SendForgotPasswordMail';
import { badRequest, noContent } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  SendForgotUserPasswordMailUseCaseSpy,
  makeSendForgotUserPasswordMailControllerRequestMock,
  ValidationSpy,
  makeValidationErrorMock,
} from '../../mocks';

let validationSpy: ValidationSpy;
let sendForgotUserPasswordMailUseCaseSpy: SendForgotUserPasswordMailUseCaseSpy;

let sendForgotUserPasswordMailController: SendForgotUserPasswordMailController;

describe('SendForgotUserPasswordMailController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    sendForgotUserPasswordMailUseCaseSpy =
      new SendForgotUserPasswordMailUseCaseSpy();

    sendForgotUserPasswordMailController =
      new SendForgotUserPasswordMailController(
        validationSpy,
        sendForgotUserPasswordMailUseCaseSpy
      );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const request = makeSendForgotUserPasswordMailControllerRequestMock();

    await sendForgotUserPasswordMailController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(request.body);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const request = makeSendForgotUserPasswordMailControllerRequestMock();

    const promise = sendForgotUserPasswordMailController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const request = makeSendForgotUserPasswordMailControllerRequestMock();

    const response = await sendForgotUserPasswordMailController.handle(request);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call SendForgotUserPasswordMailUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(
      sendForgotUserPasswordMailUseCaseSpy,
      'execute'
    );

    const request = makeSendForgotUserPasswordMailControllerRequestMock();

    await sendForgotUserPasswordMailController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({ email: request.body.email });
  });

  it('should throw if SendForgotUserPasswordMailUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(sendForgotUserPasswordMailUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeSendForgotUserPasswordMailControllerRequestMock();

    const promise = sendForgotUserPasswordMailController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return no content (204) if SendForgotUserPasswordMailUseCase throws UserNotFoundWithProvidedEmailError', async () => {
    jest
      .spyOn(sendForgotUserPasswordMailUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new UserNotFoundWithProvidedEmailError());

    const request = makeSendForgotUserPasswordMailControllerRequestMock();

    const response = await sendForgotUserPasswordMailController.handle(request);

    expect(response).toEqual(noContent());
  });

  it('should return no content (204) on success', async () => {
    const request = makeSendForgotUserPasswordMailControllerRequestMock();

    const response = await sendForgotUserPasswordMailController.handle(request);

    expect(response).toEqual(noContent());
  });
});
