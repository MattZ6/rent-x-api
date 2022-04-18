import { UserNotFoundWithProvidedEmailError } from '@domain/errors';

import { SendForgotUserPasswordMailController } from '@presentation/controllers/user/SendForgotPasswordMail';
import { noContent } from '@presentation/helpers/http';

import {
  sendForgotUserPasswordMailControllerRequestMock,
  SendForgotUserPasswordMailUseCaseSpy,
} from '../../mocks';

let sendForgotUserPasswordMailUseCaseSpy: SendForgotUserPasswordMailUseCaseSpy;

let sendForgotUserPasswordMailController: SendForgotUserPasswordMailController;

describe('SendForgotUserPasswordMailController', () => {
  beforeEach(() => {
    sendForgotUserPasswordMailUseCaseSpy =
      new SendForgotUserPasswordMailUseCaseSpy();

    sendForgotUserPasswordMailController =
      new SendForgotUserPasswordMailController(
        sendForgotUserPasswordMailUseCaseSpy
      );
  });

  it('should call SendForgotUserPasswordMailUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(
      sendForgotUserPasswordMailUseCaseSpy,
      'execute'
    );

    await sendForgotUserPasswordMailController.handle(
      sendForgotUserPasswordMailControllerRequestMock
    );

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      email: sendForgotUserPasswordMailControllerRequestMock.body.email,
    });
  });

  it('should throw if SendForgotUserPasswordMailUseCase throws', async () => {
    jest
      .spyOn(sendForgotUserPasswordMailUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = sendForgotUserPasswordMailController.handle(
      sendForgotUserPasswordMailControllerRequestMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return no content (204) if SendForgotUserPasswordMailUseCase throws UserNotFoundWithThisEmailError', async () => {
    jest
      .spyOn(sendForgotUserPasswordMailUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new UserNotFoundWithProvidedEmailError());

    const response = await sendForgotUserPasswordMailController.handle(
      sendForgotUserPasswordMailControllerRequestMock
    );

    expect(response).toEqual(noContent());
  });

  it('should return no content (204) on success', async () => {
    const response = await sendForgotUserPasswordMailController.handle(
      sendForgotUserPasswordMailControllerRequestMock
    );

    expect(response).toEqual(noContent());
  });
});
