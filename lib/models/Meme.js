const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  top: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  bottom: {
    type: String,
    required: true
  }
});

const Meme = mongoose.model('Meme', schema);

module.exports = Meme;
