'use strict';
module.exports = (function() {
    const express = require('express');
    const api = express.Router();
    const projects = require('./project-model');

    api.get('/', function (req, res) {
        projects.getProjects()
            .then(data => {
                res.status(200);
                res.json(data)})
            .catch(err =>{
                console.log(err);
                res.status(500);
            }
         );
    });
    api.get('/:id', function (req, res) {
        var projectId = req.params.id;
        projects.getProject(projectId).then(data => {
            res.status(200);
            res.json(data);
        })
        .catch(err=>{
            coneols.log(err);
            res.status(500);
        })
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
    api.put('/:projectID/notify/:userID', function (req, res, next) {
        var user = {
            userId:      req.params.userID
        };
        var projectId =  req.params.projectID;
        projects.notify(user, projectId).then(()=>{
            res.status(200);
            res.json({'user added':true});
        })
            .catch(err=>{
                console.log(err);
                res.status(500);
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