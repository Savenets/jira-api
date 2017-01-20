'use strict';
module.exports = (function() {
    const express = require('express');
    const api = express.Router();
    const _ = require('lodash');

    const User = require('./user-model');

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

        newUser.FirstName =      req.body.FirstName;
        newUser.LastName =       req.body.LastName;
        newUser.ContactEmail =   req.body.ContactEmail;
        newUser.Pass =           req.body.Pass;
        newUser.Title =          req.body.Title;
        newUser.registered =     req.body.registered;

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
        var user = {
            FirstName:       req.body.FirstName,
            LastName:        req.body.LastName,
            ContactEmail:    req.body.ContactEmail,
            Pass:            req.body.Pass,
            Title:           req.body.userTitle,
            updatedDate:     req.body.updatedDate
        };
        var id = req.params.id;
      /*  users.updateUser(user, id).then(()=>{
            res.status(200);
            res.json(user);
        })
            .catch(err=>{
                console.log(err);
                res.status(500);
            });*/
    });
    api.patch('/archive/:id', function (req, res) {
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

