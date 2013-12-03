/**
 * Workaround to make defining and retrieving angular modules easier and more intuitive.
 * http://www.hiddentao.com/archives/2013/11/04/an-improved-angular-module-split-your-modules-into-multiple-files/
 */
  
(function(angular) {
  var origMethod = angular.module;
  
  var alreadyRegistered = {};
  
  /**
   * Register/fetch a module.
   *
   * @param name {string} module name.
   * @param reqs {array} list of modules this module depends upon.
   * @param configFn {function} config function to run when module loads (only applied for the first call to create this module).
   * @returns {*} the created/existing module.
   */
  angular.module = function(name, reqs, configFn) {
   reqs = reqs || [];
   var module = null;
  
    if (alreadyRegistered[name]) {
      module = origMethod(name);
      module.requires.push.apply(module.requires, reqs);
    } else {
      module = origMethod(name, reqs, configFn);
      alreadyRegistered[name] = module;
    }
  
    return module;
  };
  
})(angular);

angular.module( 'ngBoilerplateShop', [
  'templates-app',
  'templates-common',
  'ngbps.home',
  'ngbps.shopDB',
  'ngbps.shopGateway',
  'ngbps.filters',
  'ngbps.jsonRepository',
  'shoppingCart',
  'checkout',
  'placeholders',
  'ui.router'
])

.config( function checkoutConfig ( CheckoutProvider ) {
  CheckoutProvider.gateway('');
  CheckoutProvider.costs({});
})

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run ( titleService ) {
  titleService.setSuffix( ' | ngBoilerplateShop' );
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, Admin ) {
  $scope.admin = Admin;
})

;
