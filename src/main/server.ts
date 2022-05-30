import { app } from './config/app';
import { apiConfig } from './config/environment/api';

async function startServer() {
  app.listen(apiConfig.PORT, () => {
    console.log(`🏎 App is running at port ${apiConfig.PORT}`);
  });
}

startServer();
