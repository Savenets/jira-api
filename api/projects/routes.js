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

    api.get('/all-projects', function (req, res, next) {
        console.log('update projects');
        var resultArray = [];
        mongo.connect(config.mongo, function(err, db) {
            var gotten = db.collection('projects').find();
            gotten.forEach(function(doc, err) {
                resultArray.push(doc);
            }, function() {
                res.json(resultArray);
                db.close();
            });
        });
    });
    api.post('/insert-project', function (req, res, next) {
        console.log('projects to be inserted');
        var project = {
            projectName :          req.body.projectName,
            projectDescription:    req.body.projectDescription,
            projectLink:           req.body.projectLink,
            users:                 [],
            createdDate:           utc,
            updatedDate:           '',
            isActive:              true
        };
        mongo.connect(config.mongo, function(err, db) {
            db.collection('projects').insert(project, function(err, result) {
                res.send(200, project);
                console.log('Item inserted', project.projectName);
                db.close();
            });
        });
    });
    api.post('/update-project', function (req, res, next) {
        var project = {
            projectName :          req.body.projectName,
            projectDescription:    req.body.projectDescription,
            projectLink:           req.body.projectLink,
            users:                 [],
            updatedDate:           utc,
            isActive:              req.body.isActive,
        };
        var id = req.body.id;
        console.log('id s ',id);
        mongo.connect(config.mongo, function(err, db) {
            db.collection('projects').updateOne({'_id': objectId(id)}, {$set: project}, function(err, result) {
                res.send(200, project);
                console.log('Item updated');
                db.close();
            });
        });
    });
    api.post('/add-user', function (req, res, next) {
        var user = {
            userId:      req.body.userId
        };
        var projectId =  req.body.projectId;
       // console.log('id s ',id);
        mongo.connect(config.mongo, function(err, db) {
            var allUsersInProjects = db.collection('projects').findOne({'_id': objectId(projectId)}).then(
                function(data){
                    console.log(data.users);
                    res.send(200, data.users);

                }
            ).catch(function(e){
                console.log('error');
            });
           /* db.collection('projects').updateOne({'_id': objectId(projectId)}, {$push: {users: user}}, function(err, result) {
                res.send(200, 'user is added');
                console.log('user added');
                db.close();
            });*/
        });
    });
    api.get('/archive/:id', function (req, res, next) {
        var projectId = req.query.id;
        mongo.connect(config.mongo, function (err, db) {
            var project = db.collection('projects').updateOne({'_id': objectId(projectId)}, {$set: {archived: true}});
            project.then(function (data) {
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

