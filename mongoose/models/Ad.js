'use strict';

const mongoose = require('mongoose');

// define Schemas
const adSchema = new mongoose.Schema({
    name: { type: String, index: true, required: true },
    sale: { type: Boolean, default: true, required: true, enum: ['true','false']},
    price: { type: Number, 
        min: 0.01, 
        required: true,
        validate: {
            validator: function(v) {
                return /^[0-9]\d{0,9}(\.\d{1,2})?$/.test(v);
            },
            message: 'Price is not valid. Must be greater than 0.01 and have no more than 2 decimals'
        }
    },
    picture: { type: String},
    tags: {type: String,
        required: true,
        validate: {
            validator: function(v) {
                v=v.split(',');
                var count=0;
                for (let i=0; i<v.length; i++) {
                    v[i]= v[i].trim();
                    if (v[i] === "lifestyle" || v[i]==="motor" || v[i]==="mobile" || v[i]==="work") {
                        count = count;
                    } else {count ++}
                }
                return count==0;
            },
            message: 'Tags not valid'
        }
    }
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


