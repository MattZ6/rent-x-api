import { faker } from '@faker-js/faker';

import { UserNotFoundWithProvidedEmailError } from '@domain/errors';
import { ISendForgotUserPasswordMailUseCase } from '@domain/usecases/user/SendForgotPasssordMail';

import { SendForgotUserPasswordMailUseCase } from '@application/usecases/user/SendForgotPasswordMail';

import { makeErrorMock, makeUserMock } from '../../../domain';
import {
  FindUserByEmailRepositorySpy,
  GenerateUuidProviderSpy,
  CreateUserTokenRepositorySpy,
  SendMailProviderSpy,
  makeSendForgotUserPasswordMailUseCaseEmailExpiresTimeInMillisseconds,
  makeSendForgotUserPasswordMailUseCaseEmailDataMock,
  makeSendForgotUserPasswordMailUseCasePasswordResetLinkDataMock,
  makeSendForgotUserPasswordMailUseCaseInputMock,
  makeGenerateUuidProviderOutputMock,
} from '../../mocks';

let findUserByEmailRepositorySpy: FindUserByEmailRepositorySpy;
let generateUuidProviderSpy: GenerateUuidProviderSpy;
let sendForgotUserPasswordMailUseCaseEmailExpiresTimeInMillisseconds: number;
let createUserTokenRepositorySpy: CreateUserTokenRepositorySpy;
let sendForgotUserPasswordMailUseCaseEmailDataMock: ISendForgotUserPasswordMailUseCase.EmailData;
let sendForgotUserPasswordMailUseCasePasswordResetLinkDataMock: ISendForgotUserPasswordMailUseCase.PasswordResetLinkData;
let sendMailProviderSpy: SendMailProviderSpy;

let sendForgotUserPasswordMailUseCase: SendForgotUserPasswordMailUseCase;

describe('SendForgotUserPasswordMailUseCase', () => {
  beforeEach(() => {
    findUserByEmailRepositorySpy = new FindUserByEmailRepositorySpy();
    generateUuidProviderSpy = new GenerateUuidProviderSpy();
    sendForgotUserPasswordMailUseCaseEmailExpiresTimeInMillisseconds =
      makeSendForgotUserPasswordMailUseCaseEmailExpiresTimeInMillisseconds();
    createUserTokenRepositorySpy = new CreateUserTokenRepositorySpy();
    sendForgotUserPasswordMailUseCaseEmailDataMock =
      makeSendForgotUserPasswordMailUseCaseEmailDataMock();
    sendForgotUserPasswordMailUseCasePasswordResetLinkDataMock =
      makeSendForgotUserPasswordMailUseCasePasswordResetLinkDataMock();
    sendMailProviderSpy = new SendMailProviderSpy();

    sendForgotUserPasswordMailUseCase = new SendForgotUserPasswordMailUseCase(
      findUserByEmailRepositorySpy,
      generateUuidProviderSpy,
      sendForgotUserPasswordMailUseCaseEmailExpiresTimeInMillisseconds,
      createUserTokenRepositorySpy,
      sendForgotUserPasswordMailUseCaseEmailDataMock,
      sendForgotUserPasswordMailUseCasePasswordResetLinkDataMock,
      sendMailProviderSpy
    );
  });

  it('should call FindUserByEmailRepository once with correct values', async () => {
    const findByEmailSpy = jest.spyOn(
      findUserByEmailRepositorySpy,
      'findByEmail'
    );

    const input = makeSendForgotUserPasswordMailUseCaseInputMock();

    await sendForgotUserPasswordMailUseCase.execute(input);

    expect(findByEmailSpy).toHaveBeenCalledTimes(1);
    expect(findByEmailSpy).toHaveBeenCalledWith({ email: input.email });
  });

  it('should throw if FindUserByEmailRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockRejectedValueOnce(errorMock);

    const input = makeSendForgotUserPasswordMailUseCaseInputMock();

    const promise = sendForgotUserPasswordMailUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw UserNotFoundWithProvidedEmailError if FindUserByEmailRepository returns null', async () => {
    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockResolvedValueOnce(null);

    const input = makeSendForgotUserPasswordMailUseCaseInputMock();

    const promise = sendForgotUserPasswordMailUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      UserNotFoundWithProvidedEmailError
    );
  });

  it('should call GenerateUuidProvider once', async () => {
    const generateSpy = jest.spyOn(generateUuidProviderSpy, 'generate');

    const input = makeSendForgotUserPasswordMailUseCaseInputMock();

    await sendForgotUserPasswordMailUseCase.execute(input);

    expect(generateSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if GenerateUuidProvider throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockRejectedValueOnce(errorMock);

    const input = makeSendForgotUserPasswordMailUseCaseInputMock();

    const promise = sendForgotUserPasswordMailUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call CreateUserTokenRepositorySpy once with correct values', async () => {
    const userMock = makeUserMock();

    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockResolvedValueOnce(userMock);

    const generateUuidProviderOutputMock = makeGenerateUuidProviderOutputMock();

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockResolvedValueOnce(generateUuidProviderOutputMock);

    const now = faker.datatype.datetime();

    jest.spyOn(Date, 'now').mockReturnValueOnce(now.getTime());

    const expiresDate = new Date(
      now.getTime() +
        sendForgotUserPasswordMailUseCaseEmailExpiresTimeInMillisseconds
    );

    const createSpy = jest.spyOn(createUserTokenRepositorySpy, 'create');

    const input = makeSendForgotUserPasswordMailUseCaseInputMock();

    await sendForgotUserPasswordMailUseCase.execute(input);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      token: generateUuidProviderOutputMock,
      user_id: userMock.id,
      expires_in: expiresDate,
    });
  });

  it('should throw if CreateUserTokenRepositorySpy throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(createUserTokenRepositorySpy, 'create')
      .mockRejectedValueOnce(errorMock);

    const input = makeSendForgotUserPasswordMailUseCaseInputMock();

    const promise = sendForgotUserPasswordMailUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call SendMailProvider once with correct values', async () => {
    const userMock = makeUserMock();

    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockResolvedValueOnce(userMock);

    const token = faker.datatype.uuid();

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockResolvedValueOnce(token);

    const sendSpy = jest.spyOn(sendMailProviderSpy, 'send');

    const input = makeSendForgotUserPasswordMailUseCaseInputMock();

    await sendForgotUserPasswordMailUseCase.execute(input);

    const [userFirstName] = userMock.name.trim().split(' ');
    const passwordResetLink = `${sendForgotUserPasswordMailUseCasePasswordResetLinkDataMock.base_url}?${sendForgotUserPasswordMailUseCasePasswordResetLinkDataMock.query_param_name}=${token}`;

    expect(sendSpy).toHaveBeenCalledTimes(1);
    expect(sendSpy).toHaveBeenCalledWith({
      from: {
        name: sendForgotUserPasswordMailUseCaseEmailDataMock.from_email.name,
        address:
          sendForgotUserPasswordMailUseCaseEmailDataMock.from_email.address,
      },
      to: {
        name: userMock.name,
        address: userMock.email,
      },
      subject: sendForgotUserPasswordMailUseCaseEmailDataMock.subject,
      content: {
        text: sendForgotUserPasswordMailUseCaseEmailDataMock.text_content,
        html: {
          template_path:
            sendForgotUserPasswordMailUseCaseEmailDataMock.html_template_path,
          template_variables: {
            user_first_name: userFirstName,
            password_reset_link: passwordResetLink,
          },
        },
      },
    });
  });

  it('should throw if SendMailProvider throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(sendMailProviderSpy, 'send').mockRejectedValueOnce(errorMock);

    const input = makeSendForgotUserPasswordMailUseCaseInputMock();

    const promise = sendForgotUserPasswordMailUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });
});
