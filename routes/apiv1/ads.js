'use strict';

const express = require('express');
const router = express.Router();

const {Ad} = require('../../mongoose/models/Ad');

router.get('/', async (req, res, next) => {
    try {
        const name = req.query.name;
        const tags = req.query.tags;
        const sale = req.query.sale;
        const price = req.query.price;
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const sort = req.query.sort;
        const fields = req.query.fields;

        console.log(req.query)

        const filter = {};

        if (typeof name !== 'undefined') { 
            filter.name = name; 
        }

        if (typeof sale !== 'undefined') { 
            filter.sale = sale; 
        }

        if (typeof tags !== 'undefined') {
            console.log(filter.tags);
            //console.log(tags)
        }

        if (typeof price !== 'undefined') {
            filter.price = price;
        }
        const docs = await Ad.list(filter, skip, limit, sort, fields);
        res.json({ success: true, result: docs });
} catch (err) {
    next(err);
    return;
}  
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