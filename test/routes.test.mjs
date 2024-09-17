// test/routes.test.js
import express from 'express';
import { expect } from 'chai';
import request from 'supertest';
import Joi from 'joi';
import indexRouter from '../routes/index.js';
import userRouter from '../routes/users.js';
import users from '../data/users.json' assert { type: 'json' };

const userSchema = Joi.array().items(
  Joi.object({
    userId: Joi.number().integer().required(),
    name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    billing_address: Joi.object({
      street: Joi.string().required(),
      number: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
      zip: Joi.string().required(),
    }).required()
  }).required()
);

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
    expect(response.text).to.equal(JSON.stringify(users));
  });

  it('Should /users endpoint return an array (GET:localhost/users)', async () => {
    const response = await request(app).get('/users');
    expect(Array.isArray(response.body)).to.be.true;
  });

  it('Should /users endpoint array response is greater than 0 (GET:localhost/users)', async () => {
    const response = await request(app).get('/users');
    expect(response.body.length).to.be.greaterThan(0);
  });

  it('Should /users endpoint array have the specific format (GET:localhost/users)', async () => {
    const response = await request(app).get('/users');
    const { error } = userSchema.validate(response.body);
    if (error) {
      console.error('Validation Error:', error.details);
      throw new Error('Validation failed');
    }
  });
});

