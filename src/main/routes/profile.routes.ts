import { Router } from 'express';
import multer from 'multer';

import { adaptMiddleware } from '@main/adapters/express/middleware';
import { adaptRoute } from '@main/adapters/express/route';
import { makeGetUserProfileController } from '@main/factories/controllers/user/GetUserProfileControllerFactory';
import { makeUpdateUserAvatarController } from '@main/factories/controllers/user/UpdateUserAvatarControllerFactory';
import { makeAuthenticationMiddleware } from '@main/factories/middlewares/Authentication';

const profileRoutes = Router();

const upload = multer();

profileRoutes.get(
  '/',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeGetUserProfileController())
);

profileRoutes.patch(
  '/avatar',
  adaptMiddleware(makeAuthenticationMiddleware()),
  upload.single('file'),
  adaptRoute(makeUpdateUserAvatarController())
);

export default profileRoutes;
