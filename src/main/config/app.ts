import express from 'express';

import { setupBodyParser } from '@main/config/bodyParser';
import { setupHelmet } from '@main/config/helmet';
import { setupSwagger } from '@main/config/swagger';
import { setupRoutes } from '@main/routes';

const app = express();

setupHelmet(app);

setupBodyParser(app);

setupSwagger(app);
setupRoutes(app);

export { app };
