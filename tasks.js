

module.exports = (function() {
    'use strict';
    const express = require('express');
    const router = express.Router();
    const config = require('./config');
    const mongo = require('mongodb').MongoClient;
    const objectId = require('mongodb').ObjectID;
    const assert = require('assert');
    const qs = require('querystring');
    const url = 'mongodb://localhost:27017/jira';
    const bodyParser = require('body-parser');

    const utc = new Date().toJSON().slice(0,10);
    var tasks = express.Router();

    api.use(express.bodyParser());
    router.get('/', function(){
        console.log('checki if done22222');
    });
    router.get('/task/all-tasks', function (req, res, next) {
        var resultArray = [];
        mongo.connect(url, function(err, db) {
            assert.equal(null, err);
            var gotten = db.collection('tasks').find();
            gotten.forEach(function(doc, err) {
                assert.equal(null, err);
                resultArray.push(doc);
            }, function() {
                res.json(resultArray);
                db.close();
            });
        });
    });
    router.post('/insert-task', function (req, res, next) {
        console.log("tast to be inserted");
        var issue = {
            issueTitle :  req.body.issueTitle,
            issueBody:    req.body.issueBody,
            createdBy:    req.body.createdBy,
            assignedTo:   req.body.assignedTo,
            issueType:    req.body.issueType,
            comments:     [],
            createdDate:  utc
        };
        mongo.connect(url, function(err, db) {
            db.collection('tasks').insert(issue, function(err, result) {
                res.send(200, issue);
                console.log('Item inserted', issue.issueTitle);
                db.close();
            });
        });
    });

    router.post('/update-task', function (req, res, next) {
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

        mongo.connect(url, function(err, db) {
            db.collection('tasks').updateOne({'_id': objectId(id)}, {$set: issue}, function(err, result) {
                res.send(200, issue);
                console.log('Item updated');
                db.close();
            });
        });
    });


    router.post('/comment', function (req, res, next) {
        var comment = {
            commentBody:    req.body.commentBody,
            createBy:       req.body.createBy,
            createdDate:    utc
        };
        var issueIdToComment = req.body.id;
        console.log('id s ',issueIdToComment);

        mongo.connect(url, function(err, db) {
            db.collection('tasks').updateOne({'_id': objectId(issueIdToComment)}, {$push: {comments: comment}}, function(err, result) {
                res.send(200, comment);
                console.log('comment added');
                db.close();
            });
        });
    });

    return tasks;
})();
