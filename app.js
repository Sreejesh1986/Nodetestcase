var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('./helpers/logger');
var helper = require('./helpers/helper');

var routes = require('./controllers/index');

var app = express();

// middlewares
app.use(logger.requestLogger());
app.use(logger.applicationLogger('info'));
app.use(logger.applicationLogger('error'));
app.use(bodyParser.json());
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  req.errorLogger.error({
    message: 'Route not found',
    stack: err.stack
  });
  res
    .status(err.status || 500)
    .json(helper.getResponseObject(
      "Error",
      (err.status || 500),
      err.message || 'Internal Server Error'
    ));
});

module.exports = app;
