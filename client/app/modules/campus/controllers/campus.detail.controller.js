;(function(){
'use strict';

  // Campus controller
  angular
    .module('campus')
    .controller('CampusDetailController', CampusDetailController);

  /* @inject */
  function CampusDetailController(resolvedDetail, $scope, $stateParams, $state, Campus, logger) {

    var vm;

    vm          = this;
    vm.remove   = remove;
    vm.update   = update;
    vm.campu = resolvedDetail;

    //////////////////////

    // Remove existing Campu
    function remove(campu) {
      var campu = campu || vm.campu;
      Campus.destroy(campu._id)
        .then( function(){
          $state.go('campus');
        });

    }

    // Update existing Campu
    function update() {
      var campu = vm.campu;
      Campus.update(campu._id, campu)
        .then( function ( data ){
          $state.go('campus-detail', {campuId: campu._id});
        })
        .catch( function (error){
          $scope.error = error.data.message;

        });
    }
  }
}).call(this);
