const mongo = require('mongodb').MongoClient;
const config = require('./config');
//Todo redo all on Mangoose/monk
const db = mongo.connect(config.mongo).catch(err => {
    console.log(err);
    process.exit(1);
});
module.exports = db;