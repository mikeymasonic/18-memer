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
  })

  .get('/:id', (req, res, next) => {
    Meme
      .findById(req.params.id)
      .then(meme => res.send(meme))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const {
      top,
      bottom
    } = req.body;

    Meme
      .findByIdAndUpdate(req.params.id, { top, bottom }, { new: true })
      .then(meme => res.send(meme))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Meme
      .findByIdAndDelete(req.params.id)
      .then(meme => res.send(meme))
      .catch(next);
  });

