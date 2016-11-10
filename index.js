var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = require('./config.json');

var app = express();

app.use(bodyParser.json());
app.use(session({
  secret: config.sessionSecret,
  saveUninitialized: false,
  resave: false
}));

app.get('/favorites', function (req, res, next) {
  res.json(req.session.favorites);
});

app.post('/favorites', function (req, res, next) {
  if (!req.session.favorites) {
    req.session.favorites = [];
  }

  req.session.favorites.push(req.body);
  res.json(req.session.favorites);
});

app.listen(config.port, function () {
  console.log('listening to port', config.port);
});
