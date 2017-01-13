const mongo = require('mongodb').MongoClient;
const config = require('./config');
const objectId = require('mongodb').ObjectID;

const db = mongo.connect(config.mongo).catch(err => {
    console.log(err);
    process.exit(1);
});
module.exports = db;