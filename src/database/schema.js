const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  serverid: {
    type: String,
    required: true
  },
  channelid: {
    type: [String],
    require: true
  },
});

const wishlistSchema = new mongoose.Schema({
  appid: {
    type: String,
    required: true,
  },
  listee: {
    type: [String],
  }
});

module.exports = { alertSchema, wishlistSchema };