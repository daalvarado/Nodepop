var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

// connect to the database
require('./mongoose/connect');
// load the model
require('./mongoose/models/Ad');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.title="Nozepop";

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//webApp middlewares
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/apiv1/ads', require('./routes/apiv1/ads'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Sorry, Page Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  if (err.array) { // validation error
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = `Not valid - ${errInfo.param} ${errInfo.msg}`;
  }

  // render the error page
  res.status(err.status || 500);

  // For API request, respond with JSON
  if (isAPI(req)) {
    res.json({ success: false, error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
  res.render('error');
});

//define isApi function
  function isAPI(req) {
  return req.originalUrl.indexOf('/apiv') === 0;
  }

module.exports = app;
