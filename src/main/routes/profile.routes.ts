import { Router } from 'express';
import multer from 'multer';

import { adaptMiddleware } from '@main/adapters/express/middleware';
import { adaptRoute } from '@main/adapters/express/route';
import { makeGetUserProfileController } from '@main/factories/controllers/user/GetProfile';
import { makeUpdateUserAvatarController } from '@main/factories/controllers/user/UpdateAvatar';
import { makeUpdateUserEmailController } from '@main/factories/controllers/user/UpdateEmail';
import { makeUpdateUserNameController } from '@main/factories/controllers/user/UpdateName';
import { makeUpdateUserPasswordController } from '@main/factories/controllers/user/UpdatePassword';
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

profileRoutes.patch(
  '/name',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeUpdateUserNameController())
);

profileRoutes.patch(
  '/email',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeUpdateUserEmailController())
);

profileRoutes.patch(
  '/password',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeUpdateUserPasswordController())
);

export default profileRoutes;
