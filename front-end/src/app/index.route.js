export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('auth', {
		url: '/',
		template: '<owlin-auth></owlin-auth>'
    })    
    .state('main', {
		url: '/main',
		template: '<owlin-main></owlin-main>'
    });

  $urlRouterProvider.otherwise('/');
}
