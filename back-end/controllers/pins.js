var Pins = require('../models/pins');

module.exports = {
	getPins: function (req, res){
		Pins.find({}).exec(function(err, result){
			res.send(result);
		})
	},
	postPin: function(req, res){
		Pins.findOne({
            article: req.params.article_id,
            user: req.body.user
        }, function (err, existingPin) {
            if (existingPin)
            	return res.status(409).send({message: 'Pin is already exist'});             
			var pins = new Pins({
				'user': req.body.user,
				'article': req.params.article_id,
				'pinboard': req.params.pinboard_id,
			});
			pins.save(function(err){
				if(err)
					return res.status('500').message({message: "Somthing get wrong form the server"});
				res.status(200);
			});
        });	
	},
	deletePin : function(req, res) {
		Pins.remove({
			_id: req.params.pins_id
		}, function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'Successfully deleted' });
		});
	}
}