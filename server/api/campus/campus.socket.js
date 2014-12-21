(function(){
  'use strict';

    /**
     * Broadcast updates to client when the model changes
     */

    var campu = require('./campus.model');
    exports.register = function(socket) {
      campu.schema.post('save', function (doc) {
        onSave(socket, doc);
      });
      campu.schema.post('remove', function (doc) {
        onRemove(socket, doc);
      });
    }

    function onSave(socket, doc, cb) {
      socket.emit('campus:save', doc);
    }

    function onRemove(socket, doc, cb) {
      socket.emit('campus:remove', doc);
    }

})();
