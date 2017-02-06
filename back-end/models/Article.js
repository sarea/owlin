var mongoose = require('mongoose');

module.exports = mongoose.model('Article',{
    article: String,
    user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});