import { Request, Response } from 'express';

import { IController } from '@presentation/protocols/Controller';

export const adaptRoute =
  (controller: IController) =>
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const response = await controller.handle({
        params: req.params || {},
        query: req.query || {},
        body: req.body || {},
        user_id: req.user_id,
      });

      return res.status(response.statusCode).json(response.body);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: 'Internal server error' });
    }
  };
