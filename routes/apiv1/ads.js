'use strict';

const express = require('express');
const router = express.Router();

const {Ad} = require('../../mongoose/models/Ad');

router.get('/', async (req, res, next) => {
    const docs = await Ad.find().exec();
    res.json({ success: true, result: docs });

});

router.post('/', (req, res, next) => {
    console.log(req.body);
    const data = req.body;
    const ad = new Ad(data);
    ad.save((err, savedAd) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ success: true, result: savedAd });
    });
});

module.exports = router;