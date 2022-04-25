import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/route';
import { makeAuthenticateUserController } from '@main/factories/controllers/user/Authenticate';
import { makeCreateAccountController } from '@main/factories/controllers/user/Create';
import { makeRefreshUserAccessTokenController } from '@main/factories/controllers/user/RefreshAccessToken';
import { makeResetUserPasswordController } from '@main/factories/controllers/user/ResetPassword';
import { makeSendForgotUserPasswordMailController } from '@main/factories/controllers/user/SendForgotPasswordMail';

const authenticationRoutes = Router();

authenticationRoutes.post(
  '/sign/up',
  adaptRoute(makeCreateAccountController())
);

authenticationRoutes.post(
  '/sign/in',
  adaptRoute(makeAuthenticateUserController())
);

authenticationRoutes.post(
  '/refresh-token',
  adaptRoute(makeRefreshUserAccessTokenController())
);

authenticationRoutes.post(
  '/password/forgot',
  adaptRoute(makeSendForgotUserPasswordMailController())
);

authenticationRoutes.post(
  '/password/reset',
  adaptRoute(makeResetUserPasswordController())
);

export default authenticationRoutes;
