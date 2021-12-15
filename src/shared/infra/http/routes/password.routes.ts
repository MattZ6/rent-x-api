import { Router } from 'express';

import { SendForgotPasswordMailController } from '@modules/users/usecases/send-forgot-password-mail/SendForgotPasswordMailController';

const routes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();

routes.post('/forgot', sendForgotPasswordMailController.handle);

export default routes;
