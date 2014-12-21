;(function(){
'use strict';

  // Organizations controller
  angular
    .module('organization')
    .controller('OrganizationsCreateController', OrganizationsCreateController);

  /* @inject */
  function OrganizationsCreateController($scope, $state, Organizations, logger) {

    var vm;

    vm        = this;
    vm.create = create;

    $scope.$emit('child:opened');

    //////////////////////

    // Create new Organization
    function create() {
      Organizations.create( vm.organization )
        .then( function (response){
          // Redirect after save
          $state.go('organizations', {organizationId: response._id});

        })
        .catch( function (error){
          $scope.error = error.message;
        })
      // Clear form fields
      this.name = '';
    }


  }
}).call(this);