(function(){
  'use strict';

    /**
     * Broadcast updates to client when the model changes
     */

    var organization = require('./organization.model');
    exports.register = function(socket) {
      organization.schema.post('save', function (doc) {
        onSave(socket, doc);
      });
      organization.schema.post('remove', function (doc) {
        onRemove(socket, doc);
      });
    }

    function onSave(socket, doc, cb) {
      socket.emit('organizations:save', doc);
    }

    function onRemove(socket, doc, cb) {
      socket.emit('organizations:remove', doc);
    }

})();