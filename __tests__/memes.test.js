require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Meme = require('../lib/models/Meme');

describe('meme routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('posts a meme', () => {
    return request(app)
      .post('/api/v1/memes')
      .send({
        top: 'To meme not to meme',
        image: 'https://cdn.britannica.com/37/75437-004-EFD403D1/detail-William-Shakespeare-portrait-oil-painting-John-1610.jpg',
        bottom: 'That is a question'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          top: 'To meme not to meme',
          image: 'https://cdn.britannica.com/37/75437-004-EFD403D1/detail-William-Shakespeare-portrait-oil-painting-John-1610.jpg',
          bottom: 'That is a question',
          __v: 0
        });
      });
  });
});
