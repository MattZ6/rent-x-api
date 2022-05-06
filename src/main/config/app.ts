import express from 'express';

import setupSwagger from '@main/config/swagger';
import routes from '@main/routes';

const app = express();

app.use(express.json());
app.use(routes);

setupSwagger(app);

export { app };
