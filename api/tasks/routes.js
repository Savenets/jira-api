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
    api.get('/task/all-tasks', function (req, res, next) {
        var resultArray = [];
        mongo.connect(config.mongo, function(err, db) {
            var gotten = db.collection('tasks').find();
            gotten.forEach(function(doc, err) {
                resultArray.push(doc);
            }, function() {
                res.json(resultArray);
                db.close();
            });
        });
    });
    api.get('/task/:id', function (req, res, next) {
        var ticketId = req.query.id;
        mongo.connect(config.mongo, function (err, db) {
            var ticket = db.collection('tasks').findOne({'_id': objectId(ticketId)});
            ticket.then(function (data) {
                    res.json(data);
                    db.close();
                })
                .catch(function (error) {
                    console.log(error);
                    res.end('something went wrong');
                })
        });
    });
    api.post('/insert-task', function (req, res, next) {
        console.log('task to be inserted');
        console.log(req.body);
        var issue = {
            issueTitle :  req.body.issueTitle,
            issueBody:    req.body.issueBody,
            createdBy:    req.body.createdBy,
            assignedTo:   req.body.assignedTo,
            issueType:    req.body.issueType,
            comments:     [],
            createdDate:  utc
        };
        mongo.connect(config.mongo, function(err, db) {
            db.collection('tasks').insert(issue, function(err, result) {
                res.send(200, issue);
                console.log('Item inserted', issue.issueTitle);
                db.close();
            });
        });
    });
    api.post('/update-task', function (req, res, next) {
        var issue = {
            issueTitle:  req.body.issueTitle,
            issueBody:    req.body.issueBody,
            createdBy:    req.body.createdBy,
            assignedTo:   req.body.assignedTo,
            issueType:    req.body.issueType,
            updatedDate:  utc
        };
        var id = req.body.id;
        console.log('id s ',id);
        mongo.connect(config.mongo, function(err, db) {
            db.collection('tasks').updateOne({'_id': objectId(id)}, {$set: issue}, function(err, result) {
                res.send(200, issue);
                console.log('Item updated');
                db.close();
            });
        });
    });
    api.post('/comment', function (req, res, next) {
        var comment = {
            commentBody:    req.body.commentBody,
            createBy:       req.body.createBy,
            createdDate:    utc
        };
        var issueIdToComment = req.body.id;
        console.log('id s ',issueIdToComment);
        mongo.connect(config.mongo, function(err, db) {
            db.collection('tasks').updateOne({'_id': objectId(issueIdToComment)}, {$push: {comments: comment}}, function(err, result) {
                res.send(200, comment);
                console.log('comment added');
                db.close();
            });
        });
    });
    return api;
})();
