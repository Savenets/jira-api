'use strict';
module.exports = (function () {
    const express = require('express');
    const api = express.Router();
    const config = require('../../config');
    const mongo = require('mongodb').MongoClient;
    const objectId = require('mongodb').ObjectID;
    const utc = new Date().toJSON().slice(0, 10);
    const methodOverride = require('method-override');
    const bodyParser = require('body-parser');
    api.use(methodOverride());
    api.use(bodyParser.json());
    api.use(bodyParser.urlencoded({extended: true}));


    const tasks = require('./task-model');

    api.get('/', function (req, res, next) {
        tasks.getTasks(function(){
            res.json(tasks.tasksList);
        });
    });
    api.get('/:id', function (req, res, next) {
        var ticketId = req.query.id;
        tasks.getTask(ticketId, function(d){
            res.json(d);
        });
    });
    api.post('/', function (req, res, next) {
        console.log('task to be inserted');
        console.log(req.body);
        var issue = {
            issueTitle: req.body.issueTitle,
            issueBody: req.body.issueBody,
            createdBy: req.body.createdBy,
            assignedTo: req.body.assignedTo,
            issueType: req.body.issueType,
            archived: req.body.archived,
            comments: [],
            createdDate: utc
        };
        mongo.connect(config.mongo, function (err, db) {
            db.collection('tasks').insert(issue, function (err, result) {
                res.send(200, issue);
                console.log('Item inserted', issue.issueTitle);
                db.close();
            });
        });
    });
    api.put('/', function (req, res, next) {
        var issue = {
            issueTitle: req.body.issueTitle,
            issueBody: req.body.issueBody,
            createdBy: req.body.createdBy,
            assignedTo: req.body.assignedTo,
            issueType: req.body.issueType,
            updatedDate: utc
        };
        var id = req.body.id;
        console.log('id s ', id);
        mongo.connect(config.mongo, function (err, db) {
            db.collection('tasks').updateOne({'_id': objectId(id)}, {$set: issue}, function (err, result) {
                res.send(200, issue);
                console.log('Item updated');
                db.close();
            });
        });
    });
    // TODO
    // POST /tasks/:task_id/comments
    api.put('/comments', function (req, res, next) {
        var comment = {
            commentBody: req.body.commentBody,
            createBy: req.body.createBy,
            createdDate: utc
        };
        var issueIdToComment = req.body.issueId;
        console.log('id s ', issueIdToComment);
        mongo.connect(config.mongo, function (err, db) {
            db.collection('tasks').updateOne({'_id': objectId(issueIdToComment)}, {$push: {comments: comment}}, function (err, result) {
                res.send(200, comment);
                console.log('comment added');
                db.close();
            });
        });
    });
    // PATCH /tasks/:task_id/status
    api.put('/status', function (req, res, next) {
        var issueStatus =  req.body.issueStatus;
        var ticketId = req.body.ticketId;
        mongo.connect(config.mongo, function (err, db) {
            var ticket = db.collection('tasks').updateOne({'_id': objectId(ticketId)}, {$set: {status: issueStatus}});
            ticket.then(function (data) {
                res.json(data);
                db.close();
            })
                .catch(function (error) {
                    console.log(error);
                    res.end('something went wrong');
                });
        });
    });
    api.put('/priority', function (req, res, next) {
        var issuePriority =  req.body.issuePriority;
        var ticketId = req.body.ticketId;
        mongo.connect(config.mongo, function (err, db) {
            var ticket = db.collection('tasks').updateOne({'_id': objectId(ticketId)}, {$set: {status: issuePriority}});
            ticket.then(function (data) {
                res.json(data);
                db.close();
            })
                .catch(function (error) {
                    console.log(error);
                    res.end('something went wrong');
                });
        });
    });
    return api;
})();


