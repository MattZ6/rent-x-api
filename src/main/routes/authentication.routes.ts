import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/express-route-adapter';
import { makeAuthenticateUserController } from '@main/factories/controllers/user/AuthenticateUserControllerFactory';
import { makeCreateAccountController } from '@main/factories/controllers/user/CreateAccountControllerFactory';
import { makeRefreshUserAccessTokenController } from '@main/factories/controllers/user/RefreshUserAccessTokenControllerFactory';
import { makeResetUserPasswordController } from '@main/factories/controllers/user/ResetUserPasswordControllerFactory';
import { makeSendForgotUserPasswordMailController } from '@main/factories/controllers/user/SendForgotUserPasswordMailControllerFactory';

const authenticationRoutes = Router();

authenticationRoutes.post(
  '/account',
  adaptRoute(makeCreateAccountController())
);

authenticationRoutes.post(
  '/login',
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
