(function(){
  'use strict';

  /**
   * Using Rails-like standard naming convention for endpoints.
   * GET     /campus              ->  index
   * POST    /campus              ->  create
   * GET     /campus/:id          ->  show
   * PUT     /campus/:id          ->  update
   * DELETE  /campus/:id          ->  destroy
   */


    var _ = require('lodash');
    var Campu = require('./campus.model');

    // Get list of campus
    exports.index = function(req, res) {
      Campu.find(function (err, campus) {
        if(err) { return handleError(res, err); }
        return res.json(200, campus);
      });
    };

    // Get a single campu
    exports.show = function(req, res) {
      Campu.findById(req.params.id, function (err, campu) {
        if(err) { return handleError(res, err); }
        if(!campu) { return res.send(404); }
        return res.json(campu);
      });
    };

    // Creates a new campu in the DB.
    exports.create = function(req, res) {
      Campu.create(req.body, function(err, campu) {
        if(err) { return handleError(res, err); }
        return res.json(201, campu);
      });
    };

    // Updates an existing campu in the DB.
    exports.update = function(req, res) {
      if(req.body._id) { delete req.body._id; }
      Campu.findById(req.params.id, function (err, campu) {
        if (err) { return handleError(res, err); }
        if(!campu) { return res.send(404); }
        var updated = _.merge(campu, req.body);
        updated.save(function (err) {
          if (err) { return handleError(res, err); }
          return res.json(200, campu);
        });
      });
    };

    // Deletes a campu from the DB.
    exports.destroy = function(req, res) {
      Campu.findById(req.params.id, function (err, campu) {
        if(err) { return handleError(res, err); }
        if(!campu) { return res.send(404); }
        campu.remove(function(err) {
          if(err) { return handleError(res, err); }
          return res.send(204);
        });
      });
    };

    /**
     * Campu middleware
     */
    exports.campuByID = function(req, res, next, id) {
      Campu.findById(id).populate('user', 'displayName').exec(function(err, campu) {
        if (err) return next(err);
        if (!campu) return next(new Error('Failed to load Campu ' + id));
        req.campu = campu;
        next();
      });
    };

    /**
     * Campu authorization middleware
     */
    exports.hasAuthorization = function(req, res, next) {
      if (req.campu.user.id !== req.user.id) {
        return res.send(403, 'User is not authorized');
      }
      next();
    };
    function handleError(res, err) {
      return res.send(500, err);
    }

})();
