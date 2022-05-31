import { Express, json } from 'express';

export function setupBodyParser(app: Express) {
  app.use(json());
}
