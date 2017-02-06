var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var auth = require('./controllers/auth');
var article = require('./controllers/article');
var pinboard = require('./controllers/pinboard');
var pins = require('./controllers/pins');
var checkAuthenticated = require('./services/checkAuthenticated');
var cors = require('./services/cors');

//Middleware
app.use(bodyParser.json());
app.use(cors);

//Requests
app.get('/api/article', article.getArticle);
app.post('/api/article',checkAuthenticated, article.postArticle);
app.delete('/api/article/:article_id', checkAuthenticated, article.deleteArticle);

app.get('/api/pinboard', pinboard.getPinboard);
app.post('/api/pinboard',checkAuthenticated, pinboard.postPinboard);
app.delete('/api/pinboard/:pinboard_id', checkAuthenticated, pinboard.deletePinboard);


app.get('/api/pins', pins.getPins);
app.post('/api/pins/:pinboard_id/:article_id',checkAuthenticated, pins.postPin);
app.delete('/api/pins/:pins_id', pins.deletePin);

app.post('/auth/register', auth.register);
app.post('/auth/login', auth.login);

//Connection
mongoose.connect("mongodb://localhost:27017/test", function (err, db) {
    if (!err) {
        console.log("Connected to mongo");
    }
})

var server = app.listen(5000, function () {
    console.log('listening on port ', server.address().port)
})