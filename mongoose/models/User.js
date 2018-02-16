'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, index: true, required: true },
    email: { type: String, required: true }
});

userSchema.statics.listar = function (filtro, skip, limit, sort, fields, callback) {
    const query = User.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);
    query.select(fields);
    return query.exec(callback);
};

const User = mongoose.model('User', userSchema);

module.exports = {User}
