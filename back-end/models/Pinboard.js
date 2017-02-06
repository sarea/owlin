var mongoose = require('mongoose');

module.exports = mongoose.model('Pinboard',{
	name: String,
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}
});