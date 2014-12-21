;(function(){
'use strict';

  angular
    .module('campus')
    .factory('Campus', Campus);

    /* @inject */
    function Campus($http, serverUrl, $q, logger) {
      // Define Private Variables
      var api = createUrl(serverUrl, 'campuses');

      // Define the public api
      var instance = {
        all: all,
        one: one,
        create: create,
        update: update,
        destroy: destroy
      };
      return instance;

      ////////////////

      function all (){
        return $http.get( api );
      }
      function one ( id ){
        return $http.get( createUrl( api, id) );
      }
      function create ( data ){
        return $http.post( api, data )
          .then( function (response){
            logger.logSuccess('Campus Saved');
            return response.data;
          })
          .catch( function (err){
            logger.logError('Error Saving');
            return err;
          });
      }
      function update ( id, data ){
        return $http.put( createUrl( api, id ), data )
          .then( function (response){
            logger.logSuccess('Campu Updated Successfully');
            return response.data;
          })
          .catch( function (err){
            logger.logError('Error Saving');
            return err
          });
      }
      function destroy ( id ){
        return $http.delete( createUrl( api, id ) )
          .then( function (response){
            logger.logSuccess('Successfully Deleted');
            return response.data;
          })
          .catch( function (err){
            logger.logError('Error Deleting');
            return err;
          });
      }
      function createUrl(){
        var args = Array.prototype.slice.call(arguments);
        return args.join('/');
      }
    }

}).call(this);
