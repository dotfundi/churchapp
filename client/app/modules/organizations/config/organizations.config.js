;(function(){
'use strict';


  // Configuring the Articles module
  angular
    .module('organization')
    .run( Run );

  /* @inject */
  function Run(Menus) {
    // Set top bar menu items
    Menus.set('Organizations', '/organization', 'grey-500');
  }

}).call(this);