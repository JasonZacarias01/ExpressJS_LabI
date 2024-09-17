// test/routes.test.js
import express from 'express';
import { expect } from 'chai';
import request from 'supertest';
import Joi from 'joi';
import shipmentRouter from '../routes/shipments.js';

const shipmentSchema = Joi.array().items(
    Joi.object({
      shipmentId: Joi.number().integer().required(),
      userId: Joi.number().integer().required(),
      shipping_address: Joi.object({
        address: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().valid('MX', 'United States', 'Canada').required(),
        zip: Joi.string().required()
      }).required(),
      shipping_date: Joi.string().pattern(/^\d{2}\/\d{2}\/\d{4}$/).required(),
      deliveredInDays: Joi.string().required(),
      estimated_arrival: Joi.string().pattern(/^\d{2}\/\d{2}\/\d{4}$/).required(),
      status: Joi.string().valid('sent', 'pending', 'delivered', 'preparing', 'cancelled').required()
    }).required()
  );


describe('Express App', () => {
  const app = express();
  app.set('view engine', 'jade');
  app.use('/shipments', shipmentRouter);
  const shipmentId = 1;

  it('Should respond with a 200 status (GET:localhost/shipments', async () => {
    const response = await request(app).get('/shipments');
    expect(response.status).to.equal(200);
  });

  it('Should /shipments endpoint return an array (GET:localhost/shipments)', async () => {
    const response = await request(app).get('/shipments');
    expect(Array.isArray(response.body)).to.be.true;
  });

  it('Should /shipments endpoint array response is greater than 0 (GET:localhost/shipments)', async () => {
    const response = await request(app).get('/shipments');
    expect(response.body.length).to.be.greaterThan(0);
  });

  it('Should /shipments endpoint array have the specific format (GET:localhost/shipments)', async () => {
    const response = await request(app).get('/shipments');
    const { error } = shipmentSchema.validate(response.body);
    if (error) {
        console.error('Validation Error:', error.details);
        throw new Error('Validation failed');
    }
  });

  it('should return status only with the allowed values', async () => {
    const response = await request(app).get('/shipments');
    const allowedStatuses = ['preparing', 'sent', 'delivered', 'cancelled'];
    response.body.forEach(shipment => {
      expect(allowedStatuses).to.include(shipment.status);
    });
  });

  it('should return status 200 for /shipments/{shipmentId}', async () => {
    const response = await request(app).get(`/shipments/${shipmentId}`);
    expect(response.status).to.equal(200);
  });

  it('should return an array for /shipments/{shipmentId}', async () => {
    const response = await request(app).get(`/shipments/${shipmentId}`);
    expect(Array.isArray(response.body)).to.be.true;
  });

  it('should return an array with size 0 or 1 for /shipments/{shipmentId}', async () => {
    const response = await request(app).get(`/shipments/${shipmentId}`);
    expect(response.body.length).to.be.oneOf([0, 1]);
  });

  it('should return the correct object format for /shipments/{shipmentId} when array size > 0', async () => {
    const response = await request(app).get(`/shipments/${shipmentId}`);
    expect(response.body.length).to.be.greaterThan(0);
    const shipment = response.body[0];
    const { error } = shipmentSchema.validate([shipment]);
    expect(error).to.be.undefined;
  });

});

