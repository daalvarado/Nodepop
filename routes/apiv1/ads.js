'use strict';

const express = require('express');
const router = express.Router();

const {Ad} = require('../../mongoose/models/Ad');

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
            if (/^[0-9]\d{0,9}(\.\d{1,2})?$/.test(priceRaw)){
                filter.price=priceRaw
            }
            else if (/^-[0-9]\d{0,9}(\.\d{1,2})?$/.test(priceRaw)){
                filter.price = { $lte: priceRaw.substring(1) }
            }
            else if (/^[0-9]\d{0,9}(\.\d{1,2})?-$/.test(priceRaw)){
                filter.price = { $gte: priceRaw.substring(0, priceRaw.length -1) }
            }
            else if (/^[0-9]\d{0,9}(\.\d{1,2})?-\d{0,9}(\.\d{1,2})?$/.test(priceRaw)){
                const max = priceRaw.split('-').pop();
                const min = priceRaw.split('-')[0];
                filter.price = { $gte: min, $lte: max}
            }
            
        }
        const docs = await Ad.list(filter, skip, limit, sort, fields);
        res.json({ success: true, result: docs });
} catch (err) {
    next(err);
    return;
}  
});

router.post('/', (req, res, next) => {
    req.body.tags = req.body.tags.split(',');
    for (var i = 0; i < req.body.tags.length; i++) {
        req.body.tags[i] = req.body.tags[i].trim();
        console.log(req.body.tags[i]);
    }
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

router.delete('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;
        await Ad.remove({ _id: _id }).exec();
        res.json({ success: true });
    } catch (err) {
        next(err);
        return;
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;
        const data = req.body;

        const updatedAd = await Ad.findByIdAndUpdate(_id, data, {
            new: true
        });

        res.json({ success: true, result: updatedAd });

    } catch (err) {
        next(err);
        return;
    }
});

module.exports = router;


// router.get('/', async (req, res, next) => {
//     try {

//         const docs = await Ad.find().exec();
//         res.json({ success: true, result: docs });
//     } catch (err) {
//         next(err);
//         return;
//     }
// });