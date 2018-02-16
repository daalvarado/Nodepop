'use strict';

const express = require('express');
const router = express.Router();

const {User} = require('../mongoose/models/User');

router.get('/', async (req, res, next) => {
  const docs = await User.find().exec();
  res.json({ success: true, result: docs });

});

router.post('/', (req, res, next) => {
  console.log(req.body);
  const data = req.body;
  const user = new User(data);
  user.save((err, savedUser) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ success: true, result: savedUser });
  });
});

module.exports = router;
