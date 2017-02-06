import { owlinAuth } from './auth.component';

export default angular.module('owlin.auth', [])
	.component('owlinAuth', owlinAuth)
	.name;
