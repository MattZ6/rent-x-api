import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';

import { AppError } from '@shared/errors/AppError';
import routes from '@shared/infra/http/routes';
import createConnection from '@shared/infra/typeorm';

import swaggerFile from '../../../docs/swagger.json';

import '@shared/container';

createConnection();

const app = express();

app.use(express.json());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(routes);

app.use((error: Error, _: Request, response: Response, __: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      error: error.message,
    });
  }

  console.log(error);

  return response
    .status(500)
    .json({ status: 'internal_error', message: error.message });
});

app.listen(3333, () =>
  console.log('Server is running at http://localhost:3333\n')
);
