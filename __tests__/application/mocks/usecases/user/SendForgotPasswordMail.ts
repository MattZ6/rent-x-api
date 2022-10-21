import { faker } from '@faker-js/faker';

import { ISendForgotUserPasswordMailUseCase } from '@domain/usecases/user/SendForgotPasssordMail';

export function makeSendForgotUserPasswordMailUseCaseEmailExpiresTimeInMillisseconds() {
  return faker.datatype.number({ min: 1 });
}

export function makeSendForgotUserPasswordMailUseCasePasswordResetLinkDataMock(): ISendForgotUserPasswordMailUseCase.PasswordResetLinkData {
  return {
    base_url: faker.internet.url(),
    query_param_name: faker.internet.domainWord(),
  };
}

export function makeSendForgotUserPasswordMailUseCaseEmailDataMock(): ISendForgotUserPasswordMailUseCase.EmailData {
  return {
    from_email: {
      name: faker.name.fullName(),
      address: faker.internet.email(),
    },
    subject: faker.datatype.string(),
    text_content: faker.datatype.string(),
    html_template_path: faker.system.filePath(),
  };
}

export function makeSendForgotUserPasswordMailUseCaseInputMock(): ISendForgotUserPasswordMailUseCase.Input {
  return {
    email: faker.internet.email(),
  };
}
