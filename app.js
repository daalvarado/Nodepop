var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

// connect to the database
require('./mongoose/connect');
// load the model
const {Ad} = require('./mongoose/models/Ad');
require('./mongoose/models/User');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.title="Nodepop";

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//webApp middlewares
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/apiv1', require('./routes/apiv1/ads'));
app.get('/new', function(req, res){
  res.render('new.ejs');
})
app.post('/', function(req, res){
  req.body.tags = req.body.tags.split(',');
  for (var i=0; i<req.body.tags.length; i++) {
    req.body.tags[i]=req.body.tags[i].trim();
    console.log(req.body.tags[i]);
  }
  var newAd = new Ad(req.body);
  newAd.save()
    .then(item => {
      res.redirect('/') 
    })
    .catch((e) => {
      res.status(400).send(`Unable to save to database: ${e}`);
    })
    
});

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
