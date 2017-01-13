'use strict';
module.exports = (function () {
    const express = require('express');
    const api = express.Router();
    const config = require('../../config');
    const mongo = require('mongodb').MongoClient;
    const objectId = require('mongodb').ObjectID;
    const methodOverride = require('method-override');
    const bodyParser = require('body-parser');
    api.use(methodOverride());
    api.use(bodyParser.json());
    api.use(bodyParser.urlencoded({extended: true}));

    const users =  {
        usersList: [],
        getUsers: function getUsers(f){
            var self = this;
            mongo.connect(config.mongo, function(err, db) {
                var gotten = db.collection('users').find();
                gotten.forEach(function(doc, err) {
                    self.usersList.push(doc);
                }, function() {
                    db.close();
                    f();
                });
            });
        },
        addUser: function(id, f){
            mongo.connect(config.mongo, function (err, db) {
                var user = db.collection('users').findOne({'_id': objectId(id)});
                user.then(function (data) {
                    db.close();
                    f(data);
                })
                    .catch(function (error) {
                        //res.end('something went wrong');
                    });
            });
        },
        updateUser: function(user, id, f){
            mongo.connect(config.mongo, function(err, db) {
                db.collection('users')
                    .updateOne({
                        '_id': objectId(id)
                    }, {
                        $set: user
                    }, function(err, result) {
                        db.close();
                        f(result);
                    });
            });
        },
        getUser: function(id, f){
            mongo.connect(config.mongo, function (err, db) {
                var user = db.collection('users').findOne({'_id': objectId(id)});
                user.then(function (data) {
                    f(data);
                    db.close();
                })
                    .catch(function (error) {
                        console.log(error);
                        //res.end('something went wrong');
                    });
            });
        },
        archiveUser: function(id, f){
            mongo.connect(config.mongo, function (err, db) {
                var user = db.collection('users').updateOne({'_id': objectId(id)}, {$set: {archived: true}});
                user.then(function (data) {
                    db.close();
                    f(data);
                })
                    .catch(function (error) {
                        console.log(error);
                        //res.end('something went wrong');
                    });
            });
        }
    };
    return users;
})();


