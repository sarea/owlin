export var owlinMain = {
	controller: OwlinMain,
	controllerAs: 'vm',
	templateUrl: 'app/components/main/main.html'
};

function OwlinMain($http, $auth, $state) {
	'ngInject';
	var vm = this;
	vm.$auth = $auth;
	vm.isAuthenticated = $auth.isAuthenticated;
	vm.$state = $state;

	vm.$onInit = init;
	vm.postArticle = postArticle;
	vm.deleteArticle = deleteArticle;
	vm.createPinboard = createPinboard;
	vm.deletePinboard = deletePinboard;
	vm.pinArticle = pinArticle;
	vm.unPin = unPin;
	vm.logout = logout;

	function getArticle() {
		$http.get('http://localhost:5000/api/article').then(function(result){
			vm.articles = result.data;
		});

	}

	function postArticle() {
		if (vm.article == undefined) {
			return alert("Please type an article!");
		}
		$http.post('http://localhost:5000/api/article', {
			article: vm.article
		});
		vm.article = '';
		init();
	}

	function deleteArticle(index) {
		var pinboardId = vm.articles[index]._id;
		$http({
			method:'DELETE',
			url: 'http://localhost:5000/api/article/'+pinboardId
		})
		.then(function() {
			init();
		});
	}

	function createPinboard() {
		//var token = $auth.getToken();
		if (vm.pinboards.length > 0) {
			return alert("Be a Golden member to add more than one pinboard!!");
		}
		if (vm.name == undefined) {
			return alert("Please choose a name!");
		}
		$http({
			method: 'POST',
			url: 'http://localhost:5000/api/pinboard',
			data: {
			'name': vm.name
			}
		})
		.then(function() {
			vm.name = '';
			init();
		});
	}

	function getPinboard() {
		$http.get('http://localhost:5000/api/pinboard').then(function(result){
			vm.pinboards = result.data;
		});
	}

	function deletePinboard(index) {
		var pinboardId = vm.pinboards[index]._id;
		$http({
			method:'DELETE',
			url: 'http://localhost:5000/api/pinboard/' + pinboardId
		})
		init();
	}

	function pinArticle(index) {
		var article_id = vm.articles[index]._id,
			pinboards_id = vm.pinboards[0]._id,
			pins = {};
		pins.user = $auth.getPayload().sub;
		$http({
			method: 'POST',
			url: 'http://localhost:5000/api/pins/'+pinboards_id+'/'+article_id ,
			data: {
			'pins': pins
			}
		})
		pins = {};
		init();
	}

	function unPin(index) {
		var pin_id = vm.pins[index]._id;
		$http({
			method: 'DELETE',
			url: 'http://localhost:5000/api/pins/'+pin_id
		});
		init();
	}

	function getPins() {
		$http.get('http://localhost:5000/api/pins').then(function(result){
			vm.pins = result.data;
		});
	}

	function logout() {
		vm.$auth.logout();
		vm.$state.go('auth')
	}

	function init() {
		getArticle();
		getPinboard();
		getPins();
	}
}
