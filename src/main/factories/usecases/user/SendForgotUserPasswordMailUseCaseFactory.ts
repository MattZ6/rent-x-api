import { resolve } from 'path';

import { ISendForgotUserPasswordMailUseCase } from '@domain/usecases/user/SendForgotUserPasssordMail';

import { SendForgotUserPasswordMailUseCase } from '@data/usecases/user/SendForgotUserPasswordMail';

import { makeEtherealMailProvider } from '@main/factories/providers/EtherealMailProviderFactory';
import { makeUuidProvider } from '@main/factories/providers/UuidProviderFactory';
import { makePostgresUsersRepository } from '@main/factories/repositories/PostgresUsersRepositoryFactory';
import { makePostgresUserTokensRepository } from '@main/factories/repositories/PostgresUserTokensRepositoryFactory';

// TODO: Move some data to env variables

export function makeSendForgotUserPasswordMailUseCase() {
  const postgresUsersRepository = makePostgresUsersRepository();
  const uuidProvider = makeUuidProvider();
  const passwordResetLinkExpiresTimeInMillisseconds = 3 * 24 * 60 * 60 * 1000; // 👈 3 days
  const postgresUserTokensRepository = makePostgresUserTokensRepository();
  const emailData: ISendForgotUserPasswordMailUseCase.EmailData = {
    from_email: {
      name: '🏎 RentX Team',
      address: 'noreply@rentx.com.br',
    },
    subject: 'Password reset 🛡',
    text_content: 'Password reset dummy text for now',
    html_template_path: resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'presentation',
      'views',
      'emails',
      'forgotPassword.hbs'
    ),
  };
  const passwordResetLinkData: ISendForgotUserPasswordMailUseCase.PasswordResetLinkData =
    {
      base_url: 'http://localhost:3000/password-reset',
      query_param_name: 'token',
    };
  const etherealMailProvider = makeEtherealMailProvider();

  return new SendForgotUserPasswordMailUseCase(
    postgresUsersRepository,
    uuidProvider,
    passwordResetLinkExpiresTimeInMillisseconds,
    postgresUserTokensRepository,
    emailData,
    passwordResetLinkData,
    etherealMailProvider
  );
}
