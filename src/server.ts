import express from 'express';
import swaggerUI from 'swagger-ui-express';

import swaggerFile from './docs/swagger.json';
import { routes } from './routes';

import './database';

import './shared/container';

const app = express();

app.use(express.json());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(routes);

app.listen(3333, () =>
  console.log('Server is running at http://localhost:3333')
);
