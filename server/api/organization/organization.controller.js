(function(){
  'use strict';

  /**
   * Using Rails-like standard naming convention for endpoints.
   * GET     /organizations              ->  index
   * POST    /organizations              ->  create
   * GET     /organizations/:id          ->  show
   * PUT     /organizations/:id          ->  update
   * DELETE  /organizations/:id          ->  destroy
   */


    var _ = require('lodash');
    var Organization = require('./organization.model');

    // Get list of organizations
    exports.index = function(req, res) {
      Organization.find(function (err, organizations) {
        if(err) { return handleError(res, err); }
        return res.json(200, organizations);
      });
    };

    // Get a single organization
    exports.show = function(req, res) {
      Organization.findById(req.params.id, function (err, organization) {
        if(err) { return handleError(res, err); }
        if(!organization) { return res.send(404); }
        return res.json(organization);
      });
    };

    // Creates a new organization in the DB.
    exports.create = function(req, res) {
      Organization.create(req.body, function(err, organization) {
        if(err) { return handleError(res, err); }
        return res.json(201, organization);
      });
    };

    // Updates an existing organization in the DB.
    exports.update = function(req, res) {
      if(req.body._id) { delete req.body._id; }
      Organization.findById(req.params.id, function (err, organization) {
        if (err) { return handleError(res, err); }
        if(!organization) { return res.send(404); }
        var updated = _.merge(organization, req.body);
        updated.save(function (err) {
          if (err) { return handleError(res, err); }
          return res.json(200, organization);
        });
      });
    };

    // Deletes a organization from the DB.
    exports.destroy = function(req, res) {
      Organization.findById(req.params.id, function (err, organization) {
        if(err) { return handleError(res, err); }
        if(!organization) { return res.send(404); }
        organization.remove(function(err) {
          if(err) { return handleError(res, err); }
          return res.send(204);
        });
      });
    };

    /**
     * Organization middleware
     */
    exports.organizationByID = function(req, res, next, id) {
      Organization.findById(id).populate('user', 'displayName').exec(function(err, organization) {
        if (err) return next(err);
        if (!organization) return next(new Error('Failed to load Organization ' + id));
        req.organization = organization;
        next();
      });
    };

    /**
     * Organization authorization middleware
     */
    exports.hasAuthorization = function(req, res, next) {
      if (req.organization.user.id !== req.user.id) {
        return res.send(403, 'User is not authorized');
      }
      next();
    };
    function handleError(res, err) {
      return res.send(500, err);
    }

})();