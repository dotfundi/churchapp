(function(){
  'use strict';

  var express = require('express');
  var controller = require('./organization.controller.js');

  module.exports = function(app){

    // Instantiate a new express router
    // bind the router to the app at the end.
    var router = express.Router();


    // GET: /api/organizations
    router.get('/', controller.index);
    // GET: /api/organizations/:id
    router.get('/:id', controller.show);
    // POST: /api/organizations
    router.post('/', controller.create);
    // PUT: /api/organizations/:id
    router.put('/:id', controller.update);
    // DELETE: /api/organizations/:id
    router.delete('/:id', controller.destroy);
    router.param('id', controller.organizationByID);
    app.use('/api/organizations', router);

  }

})();