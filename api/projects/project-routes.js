'use strict';
module.exports = (function () {
    const _ = require('lodash');
    const api = require('express').Router();
    const Project = require('./project-model');
    const resolver = require('./resolver');

    api.get('/', function (req, res) {
        console.log('getting projects');
        Project.find({})
            .exec()
            .then(projects => {
                res.json(projects);
            })
            .catch(err => {
                res.send('error occured');
            });
    });
    api.get('/:id', function (req, res) {
        Project.findOne({
            _id: req.params.id
        })
        .exec()
        .then(project => {
            res.json(project);
        })
        .catch(err => {
            console.log(err);
            res.status(500);
        });
    });
    api.post('/', function (req, res) {
        let newProject = new Project();
        console.log('projects to be inserted');

        newProject.Name = req.body.Name;
        newProject.Description = req.body.Description;
        newProject.Link = req.body.Link;
        newProject.users = [];
        newProject.createdDate = new Date();
        newProject.updatedDate = '';
        newProject.isActive = true;

        newProject.save()
            .then(project => {
                res.json(project);
            })
            .catch(err => {
                console.log(err);
                res.status(500);
            });
    });
    api.put('/edit/:id', function (req, res) {
        Project.findOneAndUpdate({
            _id: req.params.id
        },
            {
                $set: {
                    Name: req.body.projectName,
                    Description: req.body.projectDescription,
                    Link: req.body.projectLink,
                    users: [],
                    updatedDate: new Date(),
                    isActive: req.body.isActive
                }
            },
        {upsert: true})
        .then(project => {
            res.json(project);
        })
        .catch(err => {
            console.log(err);
            res.status(500);
        });
    });
    api.put('/:projectID/notify/:userID', function (req, res) {
        let user = resolver.getUserNameById(req.params.userID);
        user.then(data=>{
            Project.findOneAndUpdate({
                _id: req.params.projectID
            },
            {$addToSet: {users: data}},
            {upsert: true}
            )
            .then(project => {
                res.json(project);
            })
            .catch(err => {
                console.log(err);
                res.status(500);
            });
        });
    });
    api.patch('/:id/archive', function (req, res) {
        Project.findOneAndUpdate({
            '_id': req.params.id
        },
            {$set: {isActive: false}}
        )
        .then(data=>{
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500);
        });
    });
    return api;
})();