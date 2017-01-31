'use strict';
module.exports = (function() {
    const express = require('express');
    const api = express.Router();

    const User = require('./user-model');
    const resolver = require('./user-routes');

    api.get('/', function (req, res) {
        User.find({archived: {$exists:false}})
        .exec()
        .then(data => {
            res.json(data);
        })
        .catch(err=>{
            console.log(err);
            res.status(500);
        });
    });
    api.get('/all-users', function (req, res) {
        User.find({})
        .exec()
        .then(data => {
            res.json(data);
        })
        .catch(err=>{
            console.log(err);
            res.status(500);
        });
    });
    api.get('/archived', function (req, res) {
        User.find({archived: {$exists:true}})
            .exec()
            .then(data => {
                res.json(data);
            })
            .catch(err=>{
                console.log(err);
                res.status(500);
            });
    });
    api.get('/:id', function (req, res) {
        User.findOne({
            _id: req.params.id
        })
        .then(data => {
            res.json(data);
        })
        .catch(err=>{
            console.log(err);
            res.status(500);
        });
    });
    api.post('/', function (req, res) {
        let newUser = new User();
        console.log('user to be inserted');

        newUser.firstName =      req.body.firstName;
        newUser.lastName =       req.body.lastName;
        newUser.contactEmail =   req.body.contactEmail;
        newUser.password =       req.body.password;
        newUser.role =           req.body.role;
        newUser.registered =     new Date;

        newUser.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500);
        });
    });
    api.put('/:id', function (req, res) {
        User.findOneAndUpdate({
            _id: req.params.id
        },
            {
                $set: {
                    firstName:       req.body.firstName,
                    lastName:        req.body.lastName,
                    contactEmail:    req.body.contactEmail,
                    password:        req.body.password,
                    title:           req.body.title,
                    updatedDate:     new Date()
                }
            })
            .then(user => {
                res.json(user);
            })
            .catch(err => {
                console.log(err);
                res.status(500);
            });
    });
    api.patch('/archive/:id', function (req, res) {
        let usersTasks = resolver.ifUserHasTasks();
        // fix for model ;
        var userId = req.params.id;
        /*users.archiveUser(userId).then(() => {
            res.status(200);
            res.json({archived: userId});
        })
            .catch(err=>{
                console.log(err);
                res.status(500);
            });*/
    });
    return api;
})();

