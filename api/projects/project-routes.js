'use strict';
module.exports = (function() {
    const express = require('express');
    const api = express.Router();
    const config = require('../../config');
    const mongo = require('mongodb').MongoClient;
    const objectId = require('mongodb').ObjectID;
    // Save full timestamp
    //const utc = new Date()
    // TODO: Move bodyParser to app.js
    const methodOverride = require('method-override');
    const bodyParser = require('body-parser');
    const projects = require('./project-model');

    api.use(methodOverride());
    api.use(bodyParser.json());
    api.use(bodyParser.urlencoded({ extended: true }));

    api.get('/', function (req, res, next) {
        projects.getProjects()
            .then(data => res.json(data))
            .catch(err =>{
                console.log(err);
                res.status(500);
            }
         );
    });
    api.post('/', function (req, res) {
        console.log('projects to be inserted');
        var project = {
            projectName :          req.body.projectName,
            projectDescription:    req.body.projectDescription,
            projectLink:           req.body.projectLink,
            users:                 [],
            createdDate:           new Date(),
            updatedDate:           '',
            isActive:              true
        };
        projects.submitProject(project)
            .then(() => {
                res.status(200);
                res.json({'added':true});
            })
            .catch(err =>{
                console.log(err);
                res.status(500);
            });
    });
    api.put('/', function (req, res, next) {
        var project = {
            projectName :          req.body.projectName,
            projectDescription:    req.body.projectDescription,
            projectLink:           req.body.projectLink,
            users:                 [],
            updatedDate:           new Date(),
            isActive:              req.body.isActive
        };
        var id = req.body.id;
        projects.updateProject(project, id)
            .then(()=> {
                res.status(200);
                res.json({'updated':true});
            })
            .catch(err =>{
                console.log(err);
                res.status(500);
            });
    });
    // TODO: Redo
    // api.post('/project/:projectID/user/:userID')
    api.put('/project/:projectID/user/:userID', function (req, res, next) {
        var user = {
            userId:      req.body.userId
        };
        var projectId =  req.body.projectId;
        mongo.connect(config.mongo, function(err, db) {
            var allUsersInProjects = db.collection('projects').findOne({'_id': objectId(projectId)}).then(
                function(data){
                    console.log(data.users);
                    res.send(200, data.users);
                }
            ).catch(function(e){
                console.error('error', e);
                // TODO send error (500, 400, ...)
            });
           /* db.collection('projects').updateOne({'_id': objectId(projectId)}, {$push: {users: user}}, function(err, result) {
                res.send(200, 'user is added');
                console.log('user added');
                db.close();
            });*/
        });
    });
    api.patch('/:id/archive', function (req, res) {
        const projectId = req.params.id;
        projects.archiveProject(projectId).then(()=>{
            res.status(200);
            res.json({'archived':true});
        })
        .catch(err =>{
            console.log(err);
            res.status(500);
        });
    });
    return api;
})();