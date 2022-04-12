import { faker } from '@faker-js/faker';

import { UserNotFoundWithThisEmailError } from '@domain/errors';

import { SendForgotUserPasswordMailUseCase } from '@application/usecases/user/SendForgotUserPasswordMail';

import { userMock } from '../../../domain/models/user.mock';
import {
  CreateUserTokenRepositorySpy,
  FindUserByEmailRepositorySpy,
  forgotEmailExpiresTimeInMillissecondsMock,
  GenerateUuidProviderSpy,
  mailDataMock,
  passwordResetLinkDataMock,
  sendForgotUserPasswordMailUseCaseInputMock,
  SendMailProviderSpy,
} from '../../mocks';

let findUserByEmailRepositorySpy: FindUserByEmailRepositorySpy;
let generateUuidProviderSpy: GenerateUuidProviderSpy;
let createUserTokenRepositorySpy: CreateUserTokenRepositorySpy;
let sendMailProviderSpy: SendMailProviderSpy;

let sendForgotUserPasswordMailUseCase: SendForgotUserPasswordMailUseCase;

describe('SendForgotUserPasswordMailUseCase', () => {
  beforeEach(() => {
    findUserByEmailRepositorySpy = new FindUserByEmailRepositorySpy();
    generateUuidProviderSpy = new GenerateUuidProviderSpy();
    createUserTokenRepositorySpy = new CreateUserTokenRepositorySpy();
    sendMailProviderSpy = new SendMailProviderSpy();

    sendForgotUserPasswordMailUseCase = new SendForgotUserPasswordMailUseCase(
      findUserByEmailRepositorySpy,
      generateUuidProviderSpy,
      forgotEmailExpiresTimeInMillissecondsMock,
      createUserTokenRepositorySpy,
      mailDataMock,
      passwordResetLinkDataMock,
      sendMailProviderSpy
    );
  });

  it('should call FindUserByEmailRepository once with correct values', async () => {
    const findByEmailSpy = jest.spyOn(
      findUserByEmailRepositorySpy,
      'findByEmail'
    );

    await sendForgotUserPasswordMailUseCase.execute(
      sendForgotUserPasswordMailUseCaseInputMock
    );

    expect(findByEmailSpy).toHaveBeenCalledTimes(1);
    expect(findByEmailSpy).toHaveBeenCalledWith({
      email: sendForgotUserPasswordMailUseCaseInputMock.email,
    });
  });

  it('should throw if FindUserByEmailRepository throws', async () => {
    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockRejectedValueOnce(new Error());

    const promise = sendForgotUserPasswordMailUseCase.execute(
      sendForgotUserPasswordMailUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should throw UserNotFoundWithThisEmailError if user not exists', async () => {
    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockResolvedValueOnce(undefined);

    const promise = sendForgotUserPasswordMailUseCase.execute(
      sendForgotUserPasswordMailUseCaseInputMock
    );

    await expect(promise).rejects.toBeInstanceOf(
      UserNotFoundWithThisEmailError
    );
  });

  it('should call GenerateUuidProvider once', async () => {
    const generateSpy = jest.spyOn(generateUuidProviderSpy, 'generate');

    await sendForgotUserPasswordMailUseCase.execute(
      sendForgotUserPasswordMailUseCaseInputMock
    );

    expect(generateSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if GenerateUuidProvider throws', async () => {
    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockRejectedValueOnce(new Error());

    const promise = sendForgotUserPasswordMailUseCase.execute(
      sendForgotUserPasswordMailUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should call CreateUserTokenRepositorySpy once with correct values', async () => {
    const createSpy = jest.spyOn(createUserTokenRepositorySpy, 'create');

    const userId = faker.datatype.uuid();

    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockResolvedValueOnce({ ...userMock, id: userId });

    const token = faker.datatype.uuid();

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockResolvedValueOnce(token);

    const now = faker.datatype.datetime();

    jest.spyOn(Date, 'now').mockReturnValueOnce(now.getTime());

    await sendForgotUserPasswordMailUseCase.execute(
      sendForgotUserPasswordMailUseCaseInputMock
    );

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      token,
      user_id: userId,
      expires_in: new Date(
        now.getTime() + forgotEmailExpiresTimeInMillissecondsMock
      ),
    });
  });

  it('should throw if CreateUserTokenRepositorySpy throws', async () => {
    jest
      .spyOn(createUserTokenRepositorySpy, 'create')
      .mockRejectedValueOnce(new Error());

    const promise = sendForgotUserPasswordMailUseCase.execute(
      sendForgotUserPasswordMailUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should call SendMailProvider once with correct values', async () => {
    const userName = faker.name.findName();
    const userEmail = faker.internet.email();

    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockResolvedValueOnce({ ...userMock, name: userName, email: userEmail });

    const token = faker.datatype.uuid();

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockResolvedValueOnce(token);

    const sendSpy = jest.spyOn(sendMailProviderSpy, 'send');

    await sendForgotUserPasswordMailUseCase.execute(
      sendForgotUserPasswordMailUseCaseInputMock
    );

    const [userFirstName] = userName.trim().split(' ');
    const passwordResetLink = `${passwordResetLinkDataMock.base_url}?${passwordResetLinkDataMock.query_param_name}=${token}`;

    expect(sendSpy).toHaveBeenCalledTimes(1);
    expect(sendSpy).toHaveBeenCalledWith({
      from: {
        name: mailDataMock.from_email.name,
        address: mailDataMock.from_email.address,
      },
      to: {
        name: userName,
        address: userEmail,
      },
      subject: mailDataMock.subject,
      content: {
        text: mailDataMock.text_content,
        html: {
          template_path: mailDataMock.html_template_path,
          template_variables: {
            user_first_name: userFirstName,
            password_reset_link: passwordResetLink,
          },
        },
      },
    });
  });

  it('should throw if SendMailProvider throws', async () => {
    jest.spyOn(sendMailProviderSpy, 'send').mockRejectedValueOnce(new Error());

    const promise = sendForgotUserPasswordMailUseCase.execute(
      sendForgotUserPasswordMailUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });
});
