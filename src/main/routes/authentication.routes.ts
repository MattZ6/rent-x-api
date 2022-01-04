import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/express-route-adapter';
import { makeAuthenticateUserController } from '@main/factories/controllers/user/AuthenticateUserControllerFactory';
import { makeCreateAccountController } from '@main/factories/controllers/user/CreateAccountControllerFactory';
import { makeRefreshUserAccessTokenController } from '@main/factories/controllers/user/RefreshUserAccessTokenControllerFactory';
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

export default authenticationRoutes;
