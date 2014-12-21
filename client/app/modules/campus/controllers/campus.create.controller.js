;(function(){
'use strict';

  // Campus controller
  angular
    .module('campus')
    .controller('CampusCreateController', CampusCreateController);

  /* @inject */
  function CampusCreateController($scope, $state, Campus, logger, $stateParams) {

    var vm;

    vm        = this;
    vm.create = create;

    $scope.$emit('child:opened');

    //////////////////////

    // Create new Campu
    function create() {
      //if($stateParams.organizationId) vm.campu.organization = $stateParams.organizationId;
      //console.log(vm.)
      Campus.create( vm.campu )
        .then( function (response){
          // Redirect after save
          $state.go('campus', {campuId: response._id});

        })
        .catch( function (error){
          $scope.error = error.message;
        })
      // Clear form fields
      this.name = '';
    }


  }
}).call(this);
