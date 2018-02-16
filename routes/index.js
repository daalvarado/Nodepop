var express = require('express');
var router = express.Router();

// load validation library
const {query, validationResult} = require('express-validator/check');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//insertar logica de queries



module.exports = router;
