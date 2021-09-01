import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import { AddSpecificationsToCarController } from '@modules/cars/usecases/add-specifications-to-car/AddSpecificationsToCarController';
import { CreateCarController } from '@modules/cars/usecases/create-car/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/usecases/list-available-cars-use-case/ListAvailableCarsController';
import { UploadCarImagesController } from '@modules/cars/usecases/upload-car-image/UploadCarImagesController';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated';
import { ensureIsAdminUser } from '@shared/infra/http/middlewares/ensure-is-admin-user';

const routes = Router();

const upload = multer(uploadConfig.upload('./temp/car_images'));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const addSpecificationsToCarController = new AddSpecificationsToCarController();
const uploadCarImagesController = new UploadCarImagesController();

routes.post(
  '/',
  ensureAuthenticated,
  ensureIsAdminUser,
  createCarController.handle
);

routes.get('/available', listAvailableCarsController.handle);

routes.post(
  '/:id/specifications',
  ensureAuthenticated,
  ensureIsAdminUser,
  addSpecificationsToCarController.handle
);

routes.post(
  '/:id/images',
  ensureAuthenticated,
  ensureIsAdminUser,
  upload.array('images'),
  uploadCarImagesController.handle
);

export default routes;
