import { hash } from 'bcryptjs';
import { Connection } from 'typeorm';
import { v4 as generateUuid } from 'uuid';

import createConnection from '..';

async function seed() {
  let connection: Connection;

  try {
    connection = await createConnection('localhost');

    const id = generateUuid();
    const passwordHash = await hash('rentxadministrator', 8);

    await connection.query(
      `INSERT INTO USERS (id, name, email, password, driver_license, is_admin) VALUES ('${id}', 'Administrator', 'administrator@rentx.com.br', '${passwordHash}', 'XXX-6661', true)`
    );

    await connection.close();
  } catch (error) {
    await connection?.close();

    throw error;
  }
}

seed()
  .then(() => console.log('Admin user created'))
  .catch(error => {
    console.log('Fail to create admin user');

    console.error(error);
  });
