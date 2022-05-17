import express from 'express';

import { setupSwagger } from '@main/config/swagger';
import { setupRoutes } from '@main/routes';

const app = express();

app.use(express.json());

setupRoutes(app);
setupSwagger(app);

export { app };
