import { resolve } from 'path';

import { ISendForgotUserPasswordMailUseCase } from '@domain/usecases/user/SendForgotPasssordMail';

import { SendForgotUserPasswordMailUseCase } from '@application/usecases/user/SendForgotPasswordMail';

import { mailConfig } from '@main/config/environment/mail';
import { makeEtherealMailProvider } from '@main/factories/providers/EtherealMailProviderFactory';
import { makeUuidProvider } from '@main/factories/providers/UuidProviderFactory';
import { makeUsersRepository } from '@main/factories/repositories/User';
import { makeUserTokensRepository } from '@main/factories/repositories/UserToken';

export function makeSendForgotUserPasswordMailUseCase() {
  const usersRepository = makeUsersRepository();
  const uuidProvider = makeUuidProvider();
  const userTokensRepository = makeUserTokensRepository();
  const etherealMailProvider = makeEtherealMailProvider();

  const passwordResetLinkExpiresInMillisseconds =
    mailConfig.RESET_PASSWORD_EXPIRES_IN_MILLISSECONDS;

  const emailTemplatePath = resolve(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'presentation',
    'views',
    'emails',
    'forgotPassword.hbs'
  );

  const emailData: ISendForgotUserPasswordMailUseCase.EmailData = {
    from_email: {
      name: mailConfig.TEAM_EMAIL_NAME,
      address: mailConfig.TEAM_EMAIL_ADDRESS,
    },
    subject: 'Password reset 🛡',
    text_content: 'Password reset dummy text for now',
    html_template_path: emailTemplatePath,
  };

  const passwordResetLinkData: ISendForgotUserPasswordMailUseCase.PasswordResetLinkData =
    {
      base_url: mailConfig.RESET_PASSWORD_LINK_URL,
      query_param_name: mailConfig.RESET_PASSWORD_LINK_QUERY_PARAM_NAME,
    };

  return new SendForgotUserPasswordMailUseCase(
    usersRepository,
    uuidProvider,
    passwordResetLinkExpiresInMillisseconds,
    userTokensRepository,
    emailData,
    passwordResetLinkData,
    etherealMailProvider
  );
}
