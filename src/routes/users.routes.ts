import { Router } from 'express';
import multer from 'multer';

import { ensureAuthenticated } from '@middlewares/ensure-authenticated';

import { CreateUserController } from '@modules/users/usecases/create-user/CreateUserController';
import { UpdateUserAvatarController } from '@modules/users/usecases/update-user-avatar/UpdateUserAvatarController';

import uploadConfig from '../config/upload';

const routes = Router();

const uploadAvatar = multer(uploadConfig.upload('./temp/avatar'));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

routes.post('/', createUserController.handle);

/** Auth routes */

routes.use(ensureAuthenticated);

routes.patch(
  '/avatar',
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
);

export default routes;
