import { Router } from 'express';

import { adaptMiddleware } from '@main/adapters/express/middleware';
import { adaptRoute } from '@main/adapters/express/route';
import { makeListAllUserRentalsController } from '@main/factories/controllers/rent/user/ListAll';
import { makeAuthenticationMiddleware } from '@main/factories/middlewares/Authentication';

const userRentRoutes = Router();

userRentRoutes.get(
  '/',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeListAllUserRentalsController())
);

export default userRentRoutes;
