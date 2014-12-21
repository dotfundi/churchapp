(function(){
  'use strict';

  var express = require('express');
  var controller = require('./campus.controller.js');

  module.exports = function(app){

    // Instantiate a new express router
    // bind the router to the app at the end.
    var router = express.Router();


    // GET: /api/campus
    router.get('/', controller.index);
    // GET: /api/campus/:id
    router.get('/:id', controller.show);
    // POST: /api/campus
    router.post('/', controller.create);
    // PUT: /api/campus/:id
    router.put('/:id', controller.update);
    // DELETE: /api/campus/:id
    router.delete('/:id', controller.destroy);
    router.param('id', controller.campuByID);
    app.use('/api/campuses', router);

  }

})();
