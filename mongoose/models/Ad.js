'use strict';

const mongoose = require('mongoose');

// define Schemas
const adSchema = new mongoose.Schema({
    name: { type: String, index: true, required: true },
    sale: { type: Boolean, default: true, required: true},
    price: { type: Number, min: 0.01, required: true},
    picture: { type: String},
    tags: {type: String, enum:['motor', 'lifestyle', 'work', 'mobile']}
});

adSchema.statics.list = function (filter, skip, limit, sort, fields, callback) {
    const query = Ad.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);
    query.select(fields);
    return query.exec(callback);
};

// create the model
const Ad = mongoose.model('Ad', adSchema);

// export the model
module.exports = {Ad};


