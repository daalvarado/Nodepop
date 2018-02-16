var express = require('express');
var router = express.Router();

const { Ad } = require('../mongoose/models/Ad');
const { User } = require('../mongoose/models/User');

// load validation library
const {query, validationResult} = require('express-validator/check');

/* GET home page. */
router.get('/', function(req, res, next) {
  Ad.find({}, function (err, data) {
    res.render('index', {
      ads: data
    })
  });
})

  // res.render('index');


// listado de anuncios






//insertar logica de queries



module.exports = router;
