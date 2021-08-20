import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from '@modules/users/usecases/create-user/CreateUserController';
import { UpdateUserAvatarController } from '@modules/users/usecases/update-user-avatar/UpdateUserAvatarController';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated';

import uploadConfig from '../config/upload';

const routes = Router();

const uploadAvatar = multer(uploadConfig.upload('./temp/avatar'));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

routes.post('/', createUserController.handle);

routes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
);

export default routes;
