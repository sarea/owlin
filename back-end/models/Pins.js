var mongoose = require('mongoose');

module.exports = mongoose.model('Pins',{
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	article: {
		type: mongoose.Schema.ObjectId,
		ref: 'Article'
	},
	pinboard: {
		type: mongoose.Schema.ObjectId,
		ref: 'Pinboard'
	}
});