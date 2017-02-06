export var owlinAuth = {
	controller: OwlinAuth,
	controllerAs: 'vm',
	templateUrl: 'app/components/auth/auth.html'
};

function OwlinAuth($auth, $state) {
	'ngInject';
	var vm = this;
	vm.$auth = $auth;
	vm.$state = $state;
	vm.register = register;
	vm.login = login;


	function register() {
		vm.$auth.signup(vm.user).then(function(token){
			vm.$auth.setToken(token);
			vm.user = {};
			vm.$state.go('main');
		});
	}

	function login() {
		vm.$auth.login(vm.login.user).then(function(token){
			vm.$auth.setToken(token);
			vm.login = {};
			vm.$state.go('main');
		});
	}
}
