const { Router } = require('express');
const Meme = require('../models/Meme');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      top,
      image,
      bottom
    } = req.body;

    Meme
      .create({ top, image, bottom })
      .then(meme => res.send(meme))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Meme
      .find()
      .then(memes => res.send(memes))
      .catch(next);
  });

