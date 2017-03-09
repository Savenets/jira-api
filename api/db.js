//const mongo = require('mongodb').MongoClient;
//const config = require('../config');
//const config = require('dotenv').config({path: '../.env'});

const mongoose = require('mongoose');
const config = require('../config');

console.log('conected to mongo');
// Use native ES6 promises
mongoose.Promise = global.Promise;
mongoose.connect(config.get('MONGO'));

//Todo redo all on Mangoose/monk
//const db = mongo.connect(config.mongo).catch(err => {
//    console.log(err);
//    process.exit(1);
//});
//module.exports = db;