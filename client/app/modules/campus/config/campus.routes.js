;(function(){
'use strict';

  //Setting up route
  angular
    .module('campus')
    .config( Configuration );

  /* @inject */
  function Configuration($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('campus', {
        url: '/campus',
        templateUrl: 'app/modules/campus/views/campus.view.html',
        controller: 'CampusController as vm',
        resolve: {
          resolvedList: resolvedList
        }
      })
      .state('campus-create', {
        url: '/campus/create',
        templateUrl: 'app/modules/campus/views/campus.create.view.html',
        controller: 'CampusCreateController as vm'
      })
      .state('campus-detail', {
        url: '/campus/:campusId',
        templateUrl: 'app/modules/campus/views/campus.detail.view.html',
        controller: 'CampusDetailController as vm',
        resolve: {
          resolvedDetail: resolvedDetail
        }
      })
      .state('campus-edit', {
        url: '/campus/:campusId/edit',
        templateUrl: 'app/modules/campus/views/campus.edit.view.html',
        controller: 'CampusDetailController as vm',
        resolve: {
          resolvedDetail: resolvedDetail
        }
      });

    ////////////////

    /**
     * [resolvedDetail description]
     * @return {[type]}    [description]
     */
    function resolvedDetail($stateParams, Campus){
      return Campus.one($stateParams.campusId)
        .then( function ( response ){
          return response.data;
        })
    }

    /**
     * [resolvedList description]
     * @return {[type]}     [description]
     */
    function resolvedList(Campus){
      return Campus.all()
        .then( function ( response ){
          return response.data;
        })
    }
  }
}).call(this);
