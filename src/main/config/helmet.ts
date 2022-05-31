import type { Express } from 'express';
import helmet from 'helmet';

export function setupHelmet(app: Express) {
  app.use(helmet());
}
