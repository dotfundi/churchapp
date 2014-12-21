;(function(){
'use strict';


  // Configuring the Articles module
  angular
    .module('campus')
    .run( Run );

  /* @inject */
  function Run(Menus) {
    // Set top bar menu items
    Menus.set('Campus', '/campus', 'grey-500');
  }

}).call(this);