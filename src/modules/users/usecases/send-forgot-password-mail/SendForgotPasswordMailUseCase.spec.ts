import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { InMemoryMailProvider } from '@shared/container/providers/MailProvider/in-memory/InMemoryMailProvider';
import { AppError } from '@shared/errors/AppError';

import { InMemoryUserRefreshTokensRepository } from '../../repositories/in-memory/InMemoryUserRefreshTokensRepository';
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let usersRepository: InMemoryUsersRepository;
let userRefreshTokensRepository: InMemoryUserRefreshTokensRepository;
let dateProvider: DayjsDateProvider;
let mailProvider: InMemoryMailProvider;

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe('SendForgotPasswordMailUseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    userRefreshTokensRepository = new InMemoryUserRefreshTokensRepository();
    dateProvider = new DayjsDateProvider();
    mailProvider = new InMemoryMailProvider();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepository,
      userRefreshTokensRepository,
      dateProvider,
      mailProvider
    );
  });

  it('should be able to send forgot password mail to user', async () => {
    const sendMailSpy = jest.spyOn(mailProvider, 'sendMail');

    await usersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'anypassword',
      driver_license: '123456',
    });

    await sendForgotPasswordMailUseCase.execute({
      email: 'john@doe.com',
    });

    expect(sendMailSpy).toHaveBeenCalledTimes(1);
  });

  it('should not be able to send an email if user does not exists', async () => {
    const promise = sendForgotPasswordMailUseCase.execute({
      email: 'john@doe.com',
    });

    await expect(promise).rejects.toBeInstanceOf(AppError);
  });

  it('should create a refresh token', async () => {
    const createSpy = jest.spyOn(userRefreshTokensRepository, 'create');

    const email = 'john@doe.com';

    await usersRepository.create({
      name: 'John Doe',
      email,
      password: 'anypassword',
      driver_license: '123456',
    });

    await sendForgotPasswordMailUseCase.execute({
      email,
    });

    expect(createSpy).toHaveBeenCalledTimes(1);
  });
});
