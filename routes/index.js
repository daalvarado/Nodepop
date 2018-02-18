var express = require('express');
var router = express.Router();

const { Ad } = require('../mongoose/models/Ad');
const { User } = require('../mongoose/models/User');

// load validation library
const {query, validationResult} = require('express-validator/check');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   Ad.find({}, function (err, data) {
//     res.render('index', {
//       ads: data
//     })
//   });
// })

router.get('/', async (req, res, next) => {
  try {
    const name = req.query.name;
    const tags = req.query.tags;
    const sale = req.query.sale;
    const priceRaw = req.query.price;
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const sort = req.query.sort;
    const fields = req.query.fields;


    console.log(req.query)

    const filter = {};

    if (typeof name !== 'undefined') {
      filter.name = new RegExp('^'
        + req.query.name, "i");;
    }

    if (typeof sale !== 'undefined') {
      filter.sale = sale;
      console.log(filter.sale)
    }

    if (typeof tags !== 'undefined') {
      const regex = tags.split(",").join("|");
      filter.tags = { $regex: regex, $options: "i" };
      console.log(filter.tags)
    }

    if (typeof priceRaw !== 'undefined') {
      if (/^[0-9]\d{0,9}(\.\d{1,2})?$/.test(priceRaw)) {
        filter.price = priceRaw
      }
      else if (/^-[0-9]\d{0,9}(\.\d{1,2})?$/.test(priceRaw)) {
        filter.price = { $lte: priceRaw.substring(1) }
      }
      else if (/^[0-9]\d{0,9}(\.\d{1,2})?-$/.test(priceRaw)) {
        filter.price = { $gte: priceRaw.substring(0, priceRaw.length - 1) }
      }
      else if (/^[0-9]\d{0,9}(\.\d{1,2})?-\d{0,9}(\.\d{1,2})?$/.test(priceRaw)) {
        const max = priceRaw.split('-').pop();
        const min = priceRaw.split('-')[0];
        filter.price = { $gte: min, $lte: max }
      }

    }
    const docs = await Ad.list(filter, skip, limit, sort, fields);
    res.render('index', {ads: docs});
    
  } catch (err) {
    next(err);
    return;
  }
});



module.exports = router;
