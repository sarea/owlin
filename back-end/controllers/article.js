var Article = require('../models/article');

module.exports = {
	getArticle: function (req, res){
		Article.find({}).populate('user', '-pwd').exec(function(err, result){
			res.send(result);
		})
	},
	postArticle: function(req, res){
		req.body.user = req.user;
		var article = new Article(req.body);
		article.save();
		res.status(200);
	},
	deleteArticle: function(req, res) {
		Article.remove({
			_id: req.params.article_id
		}, function(err, bear) {
			if (err)
				res.send(err);
			res.json({ message: 'Successfully deleted' });
		});
	}
}