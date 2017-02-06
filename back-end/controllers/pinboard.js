var Pinboard = require('../models/pinboard');

module.exports = {
	getPinboard: function (req, res){
		Pinboard.find({}).populate('user', '-pwd').exec(function(err, result){
			res.send(result);
		})
	},
	postPinboard: function(req, res){
		req.body.user = req.user;
		var pinboard = new Pinboard(req.body);
		pinboard.save();
		res.status(200);
	},
	deletePinboard: function(req, res) {
		Pinboard.remove({
			_id: req.params.pinboard_id
		}, function(err, bear) {
			if (err)
				res.send(err);
			res.json({ message: 'Successfully deleted' });
		});
	}
}