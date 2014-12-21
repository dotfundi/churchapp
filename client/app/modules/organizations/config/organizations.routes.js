;(function(){
'use strict';

  //Setting up route
  angular
    .module('organization')
    .config( Configuration );

  /* @inject */
  function Configuration($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('organizations', {
        url: '/organizations',
        templateUrl: 'app/modules/organizations/views/organizations.view.html',
        controller: 'OrganizationsController as vm',
        resolve: {
          resolvedList: resolvedList
        }
      })
      .state('organizations-create', {
        url: '/organizations/create',
        templateUrl: 'app/modules/organizations/views/organizations.create.view.html',
        controller: 'OrganizationsCreateController as vm'
      })
      .state('organizations-detail', {
        url: '/organization/:organizationId',
        templateUrl: 'app/modules/organizations/views/organizations.detail.view.html',
        controller: 'OrganizationsDetailController as vm',
        resolve: {
          resolvedDetail: resolvedDetail
        }
      })
      .state('organizations-edit', {
        url: '/organization/:organizationId/edit',
        templateUrl: 'app/modules/organizations/views/organizations.edit.view.html',
        controller: 'OrganizationsDetailController as vm',
        resolve: {
          resolvedDetail: resolvedDetail
        }
      })
      .state('organizations-campus-create', {
        url: '/organization/:organizationId/create/campus',
        templateUrl: 'app/modules/campus/views/campus.create.view.html',
        controller: 'CampusCreateController as vm',
        resolve: {
          resolvedDetail: resolvedDetail
        }
      });

    ////////////////

    /**
     * [resolvedDetail description]
     * @return {[type]}    [description]
     */
    function resolvedDetail($stateParams, Organizations){
      return Organizations.one($stateParams.organizationId)
        .then( function ( response ){
          return response.data;
        })
    }

    /**
     * [resolvedList description]
     * @return {[type]}     [description]
     */
    function resolvedList(Organizations){
      return Organizations.all()
        .then( function ( response ){
          return response.data;
        })
    }
  }
}).call(this);
