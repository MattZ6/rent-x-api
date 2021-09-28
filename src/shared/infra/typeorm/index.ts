import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'database_rentx'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  const isTestEnv = process.env.NODE_ENV === 'test';

  return createConnection(
    Object.assign(defaultOptions, {
      host: isTestEnv ? 'localhost' : host,
      database: isTestEnv ? 'rentx_test' : defaultOptions.database,
    })
  );
};
