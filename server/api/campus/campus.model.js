(function(){

  'use strict';

  var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var CampuSchema = new Schema({
    created: {
      type: Date,
      default: Date.now
    },
    title: {
      type: String,
      default: '',
      trim: true,
      required: 'Title cannot be blank'
    },
    content: {
      type: String,
      default: '',
      trim: true
    },
    country: {
      type: String
    },
    phone: {
      type: String
    },
    organization: {
      type: Schema.ObjectId,
      ref: 'Organization'
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    }
  });

  module.exports = mongoose.model('Campus', CampuSchema);
})();
