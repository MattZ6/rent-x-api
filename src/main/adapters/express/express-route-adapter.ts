import { Request, Response } from 'express';

import { IController } from '@presentation/protocols/Controller';

export const adaptRoute =
  (controller: IController) =>
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const body = req.body || {};

      if (req.file) {
        Object.assign(body, {
          file: req.file,
        });
      }

      if (req.files) {
        Object.assign(body, {
          files: req.files,
        });
      }

      const response = await controller.handle({
        params: req.params || {},
        query: req.query || {},
        body,
        user_id: req.user_id,
      });

      return res.status(response.statusCode).json(response.body);
    } catch (error) {
      console.log(error);
      console.log('\n');

      return res.status(500).json({ message: 'Internal server error' });
    }
  };
