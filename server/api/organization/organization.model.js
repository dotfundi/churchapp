(function(){

  'use strict';

  var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var OrganizationSchema = new Schema({
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
    campuses: [{
      type: Schema.ObjectId,
      ref: 'Campus'
    }],
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    }
  });

  module.exports = mongoose.model('Organization', OrganizationSchema);
})();
