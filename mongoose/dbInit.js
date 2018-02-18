'use strict'

const {mongoose} = require('./connect');
const {Ad} = require('./models/Ad');
const {User} = require('./models/User');

const adsDatabase = require('./db/ads.json');
const usersDatabase = require('./db/users.json');

Ad.deleteMany()
    .then((result) => {
        console.log("Ads database erased");
    })
    .then(Ad.insertMany(adsDatabase))
    .then((result) => {
        console.log("Ads database updated");
    })
    .catch((e) => console.log("Error deleting and updating Ads database"));

User.deleteMany()
    .then((result) => {
        console.log("Users database erased");
    })
    .then(User.insertMany(usersDatabase))
    .then((result) => {
        console.log("Users database updated");
        process.exit(0)
    })
    .catch((e) => console.log("Error deleting and updating Users database"));
