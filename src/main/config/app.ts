import 'reflect-metadata';

import express from 'express';

import routes from '@main/routes';

const app = express();

app.use(express.json());

app.use(routes);

export default app;
