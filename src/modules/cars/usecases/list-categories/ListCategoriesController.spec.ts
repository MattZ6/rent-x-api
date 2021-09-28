import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as generateUuid } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

const email = 'administrator@rentx.com.br';
const password = 'rentxadministrator';

describe('ListCategoriesController', () => {
  beforeAll(async () => {
    connection = await createConnection('localhost');

    await connection.runMigrations();

    const id = generateUuid();
    const passwordHash = await hash(password, 8);

    await connection.query(
      `INSERT INTO users (id, name, email, password, driver_license, is_admin) VALUES ('${id}', 'Administrator', '${email}', '${passwordHash}', 'XXX-6661', true)`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to list all available categories', async () => {
    const {
      body: { access_token },
    } = await request(app).post('/v1/authentication/sessions').send({
      email,
      password,
    });

    await request(app)
      .post('/v1/categories')
      .set({
        Authorization: `Bearer ${access_token}`,
      })
      .send({
        name: 'Integration test',
        description: 'List categories - integration test',
      });

    const response = await request(app).get('/v1/categories');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0].name).toBe('Integration test');
    expect(response.body[0].description).toBe(
      'List categories - integration test'
    );
  });
});
