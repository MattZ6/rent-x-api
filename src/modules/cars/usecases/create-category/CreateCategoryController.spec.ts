import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as generateUuid } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

const email = 'administrator@rentx.com.br';
const password = 'rentxadministrator';

describe('CreateCategoryController', () => {
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

  it('should be able to create a new category', async () => {
    const {
      body: { access_token },
    } = await request(app).post('/v1/authentication/sessions').send({
      email,
      password,
    });

    const response = await request(app)
      .post('/v1/categories')
      .set({
        Authorization: `Bearer ${access_token}`,
      })
      .send({
        name: 'Integration test',
        description: 'Create category - integration test',
      });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a category with name of another', async () => {
    const {
      body: { access_token },
    } = await request(app).post('/v1/authentication/sessions').send({
      email,
      password,
    });

    const name = 'Category with same name';

    await request(app)
      .post('/v1/categories')
      .set({
        Authorization: `Bearer ${access_token}`,
      })
      .send({
        name,
        description: 'Create category - integration test',
      });

    const response = await request(app)
      .post('/v1/categories')
      .set({
        Authorization: `Bearer ${access_token}`,
      })
      .send({
        name,
        description: 'Create category - integration test',
      });

    expect(response.status).toBe(422);
  });
});
