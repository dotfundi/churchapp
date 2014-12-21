;(function(){
'use strict';

  // Campus controller
  angular
    .module('campus')
    .controller('CampusController', CampusController);

  /* @inject */
  function CampusController(resolvedList, $scope, $stateParams, $state, Campus, logger, socket) {


    var vm = this;
    vm.campus = resolvedList;
    vm.isActive = isActive;
    vm.shown = {};

    socket.syncUpdates('campus', vm.campus);
    //////////////////////


    function isActive(state) {
      // console.log(state === $state.params.campuId)
      return $state.includes('campus', {campusId: state});
    }

    // show Campus
    function showArticle(campu){
        if(article._id === vm.shown._id){
          $state.go('campus');
          vm.showDetail = false;
          vm.shown = {};
        } else {
          $state.go('campus.detail', {campusId: campus._id});
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
      socket.unsyncUpdates('campus');
    });
  }
}).call(this);