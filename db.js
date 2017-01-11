const mongo = require('mongodb').MongoClient;
const config = require('./config');
const objectId = require('mongodb').ObjectID;

const db = mongo.connect(config.mongo);
module.exports = db;