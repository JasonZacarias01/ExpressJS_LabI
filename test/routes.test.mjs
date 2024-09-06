// test/routes.test.js
import {expect} from 'chai';
import request from 'supertest';
import express from 'express';
import indexRouter from '../routes/index.js';
import userRouter from '../routes/users.js';

describe('Express App', () => {
  const app = express();
  app.set('view engine', 'jade');
  app.use('/', indexRouter);
  app.use('/users', userRouter);

  it('Should respond with a greeting message when getting the root endpoint (GET:localhost/', async () => {
    const response = await request(app).get('/');
    expect(response.status).to.equal(200);
    expect(response.text).to.contain('Welcome to Express');
  });

  it('Should respond with a  message when getting the users endpoint (GET:localhost/users', async () => {
      const response = await request(app).get('/users');
      expect(response.status).to.equal(200);
      expect(response.text).to.equal('respond with a resource');
  });
});

