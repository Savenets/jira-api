const mongo = require('mongodb').MongoClient;
const config = require('./config');


const mongoose = require('mongoose');
// Use native ES6 promises
mongoose.Promise = global.Promise;
mongoose.connect(config.mongo);

//Todo redo all on Mangoose/monk
const db = mongo.connect(config.mongo).catch(err => {
    console.log(err);
    process.exit(1);
});
module.exports = db;