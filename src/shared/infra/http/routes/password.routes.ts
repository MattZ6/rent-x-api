import { Router } from 'express';

import { ResetPasswordController } from '@modules/users/usecases/reset-password/ResetPasswordController';
import { SendForgotPasswordMailController } from '@modules/users/usecases/send-forgot-password-mail/SendForgotPasswordMailController';

const routes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

routes.post('/forgot', sendForgotPasswordMailController.handle);
routes.post('/reset', resetPasswordController.handle);

export default routes;
