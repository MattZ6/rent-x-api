import faker from 'faker';

import { ISendForgotUserPasswordMailUseCase } from '@domain/usecases/user/SendForgotUserPasssordMail';

export const forgotEmailExpiresTimeInMillissecondsMock = faker.datatype.number({
  min: 1_000,
  max: 100_000_000,
});

export const sendForgotUserPasswordMailUseCaseInputMock: ISendForgotUserPasswordMailUseCase.Input =
  {
    email: faker.internet.email(),
  };

export const passwordResetLinkDataMock: ISendForgotUserPasswordMailUseCase.PasswordResetLinkData =
  {
    base_url: faker.internet.url(),
    query_param_name: faker.internet.domainWord(),
  };

export const mailDataMock: ISendForgotUserPasswordMailUseCase.EmailData = {
  from_email: {
    name: faker.name.findName(),
    address: faker.internet.email(),
  },
  subject: faker.datatype.string(),
  text_content: faker.datatype.string(),
  html_template_path: faker.system.filePath(),
};
