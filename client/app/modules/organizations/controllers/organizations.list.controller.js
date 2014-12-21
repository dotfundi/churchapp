;(function(){
'use strict';

  // Organizations controller
  angular
    .module('organization')
    .controller('OrganizationsController', OrganizationsController);

  /* @inject */
  function OrganizationsController(resolvedList, $scope, $stateParams, $state, Organizations, logger, socket) {


    var vm = this;
    vm.organizations = resolvedList;
    vm.isActive = isActive;
    vm.shown = {};

    socket.syncUpdates('organizations', vm.organizations);
    //////////////////////


    function isActive(state) {
      // console.log(state === $state.params.organizationId)
      return $state.includes('organizations', {organizationsId: state});
    }

    // show Organizations
    function showArticle(organization){
        if(article._id === vm.shown._id){
          $state.go('organizations');
          vm.showDetail = false;
          vm.shown = {};
        } else {
          $state.go('organizations.detail', {organizationsId: organizations._id});
          vm.shown = article;
          // vm.showDetail = true;
        }
    }
    /*
        Event emitted from child states.
     */
    $scope.$on('child:closed', function ( event ){
      vm.shown = {};
      vm.showDetail = false;
    });
    $scope.$on('child:opened', function ( event ){
      vm.shown = {};
      vm.showDetail = true;
    });
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('organizations');
    });
  }
}).call(this);