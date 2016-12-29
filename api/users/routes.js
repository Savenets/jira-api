'use strict';
module.exports = (function() {
    const express = require('express');
    const api = express.Router();
    const config = require('../../config');
    const mongo = require('mongodb').MongoClient;
    const objectId = require('mongodb').ObjectID;
    const utc = new Date().toJSON().slice(0,10);
    const methodOverride = require('method-override');
    const bodyParser = require('body-parser');
    api.use(methodOverride());
    api.use(bodyParser.json());
    api.use(bodyParser.urlencoded({ extended: true }));

    api.get('/all-users', function (req, res, next) {
        var resultArray = [];
        mongo.connect(config.mongo, function(err, db) {
            var gotten = db.collection('users').find();
            gotten.forEach(function(doc, err) {
                resultArray.push(doc);
            }, function() {
                res.json(resultArray);
                db.close();
            });
        });
    });
    api.post('/register-user', function (req, res, next) {
        console.log('user is added');
        console.log(req.body);
        var user = {
            userFirstName:       req.body.userFirstName,
            userLastName:        req.body.userLastName,
            userContactEmail:    req.body.userContactEmail,
            userPass:            req.body.userPass,
            userTitle:           req.body.userTitle,
        };
        mongo.connect(config.mongo, function(err, db) {
            db.collection('users').insert(user, function(err, result) {
                res.send(200, user);
                console.log('Item inserted', user.userFirstName);
                db.close();
            });
        });
    });
    api.post('/edit-user-profile', function (req, res, next) {
        var user = {
            userFirstName:       req.body.userFirstName,
            userLastName:        req.body.userLastName,
            userContactEmail:    req.body.userContactEmail,
            userPass:            req.body.userPass,
            userTitle:           req.body.userTitle,
        };
        var id = req.body.id;
        console.log('id s ',id);
        mongo.connect(config.mongo, function(err, db) {
            db.collection('users')
                .updateOne({
                    '_id': objectId(id)
                }, {
                    $set: user
                }, function(err, result) {
                    res.send(200, user);
                    console.log('user is updated');
                    db.close();
                });
        });
    });
    api.post('/find-user', function (req, res, next) {
        var issueIdToComment = req.body.id;
        console.log('id s ',issueIdToComment);
        const comment = 'FIX THIS';
        mongo.connect(config.mongo, function(err, db) {
            db
              .collection('users')
              .updateOne(
                  {'_id': objectId(issueIdToComment)},
                  {$push: {comments: comment}},
                function(err, result) {
                    res.send(200, comment);
                    console.log('comment added');
                    db.close();
                });
        });
    });
    return api;
})();

