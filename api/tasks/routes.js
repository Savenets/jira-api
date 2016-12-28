var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
// define the home page route
router.get('/', function (req, res) {
    res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
    res.send('About birds')
    console.log('about is on');
})

module.exports = router


/*
const express = require('express');
const config = require('./config');

const app = new express();


const mongo = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const assert = require('assert');
const qs = require('querystring');
const url = 'mongodb://localhost:27017/jira';
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const utc = new Date().toJSON().slice(0,10);
app.get('/task/all-tasks', function (req, res, next) {

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
app.post('/insert-task', function (req, res, next) {
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

app.post('/update-task', function (req, res, next) {
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


app.post('/comment', function (req, res, next) {
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




console.log('process.env.NODE_ENV = ' + process.env.NODE_ENV);


*/
