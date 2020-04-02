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

  it('gets all memes', async() => {
    const meme = await Meme.create({
      top: 'To meme not to meme',
      image: 'https://cdn.britannica.com/37/75437-004-EFD403D1/detail-William-Shakespeare-portrait-oil-painting-John-1610.jpg',
      bottom: 'That is a question'
    });

    return request(app)
      .get('/api/v1/memes')
      .then(res => {
        const memeJSON = JSON.parse(JSON.stringify(meme));
        expect(res.body).toEqual([memeJSON]);
      });
  });

  it('gets meme by id', async() => {
    const meme = await Meme.create({
      top: 'To meme not to meme',
      image: 'https://cdn.britannica.com/37/75437-004-EFD403D1/detail-William-Shakespeare-portrait-oil-painting-John-1610.jpg',
      bottom: 'That is a question'
    });

    return request(app)
      .get(`/api/v1/memes/${meme._id}`)
      .then(res => {
        const memeJSON = JSON.parse(JSON.stringify(meme));
        expect(res.body).toEqual(memeJSON);
      });
  });

  it('updates a meme by id', async() => {
    const meme = await Meme.create({
      top: 'To meme not to meme',
      image: 'https://cdn.britannica.com/37/75437-004-EFD403D1/detail-William-Shakespeare-portrait-oil-painting-John-1610.jpg',
      bottom: 'That is a question'
    });

    const update = {
      top: 'Here\'s',
      bottom: 'an update'
    };

    return request(app)
      .patch(`/api/v1/memes/${meme._id}`)
      .send(update)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          top: 'Here\'s',
          image: 'https://cdn.britannica.com/37/75437-004-EFD403D1/detail-William-Shakespeare-portrait-oil-painting-John-1610.jpg',
          bottom: 'an update',
          __v: 0
        });
      });
  });
});
