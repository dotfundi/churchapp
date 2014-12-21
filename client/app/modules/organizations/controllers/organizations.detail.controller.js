;(function(){
'use strict';

  // Organizations controller
  angular
    .module('organization')
    .controller('OrganizationsDetailController', OrganizationsDetailController);

  /* @inject */
  function OrganizationsDetailController(resolvedDetail, $scope, $stateParams, $state, Organizations, logger) {

    var vm;

    vm          = this;
    vm.remove   = remove;
    vm.update   = update;
    vm.organization = resolvedDetail;

    //////////////////////

    // Remove existing Organization
    function remove(organization) {
      var organization = organization || vm.organization;
      Organizations.destroy(organization._id)
        .then( function(){
          $state.go('organizations');
        });

    }

    // Update existing Organization
    function update() {
      var organization = vm.organization;
      Organizations.update(organization._id, organization)
        .then( function ( data ){
          $state.go('organizations-detail', {organizationId: organization._id});
        })
        .catch( function (error){
          $scope.error = error.data.message;

        });
    }
  }
}).call(this);
