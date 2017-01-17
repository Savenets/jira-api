'use strict';
module.exports = (function() {
    const express = require('express');
    const api = express.Router();

    const users = require('./user-model');

    api.get('/', function (req, res) {
        users.getUsers().then(data=>{
            res.status(200);
            res.json(data);
        })
            .catch(err=>{
            console.log(err);
            res.status(500);
        });
    });
    api.get('/:id', function (req, res, next) {
        var userId = req.params.id;
        users.getUser(userId).then(data=>{
            res.status(200);
            res.json(data);
        })
            .catch(err=>{
                console.log(err);
                res.status(500);
            });
    });
    api.post('/', function (req, res, next) {
        console.log('user is added');
        console.log(req.body);
        var user = {
            userFirstName:       req.body.userFirstName,
            userLastName:        req.body.userLastName,
            userContactEmail:    req.body.userContactEmail,
            userPass:            req.body.userPass,
            userTitle:           req.body.userTitle,
            registered:          req.body.registered
        };
        users.addUser(user)
            .then(data=>{
            res.status(200);
            res.json(data);
        })
            .catch(err=>{
                console.log(err);
                res.status(500);
            });
    });
    api.put('/:id', function (req, res, next) {
        var user = {
            userFirstName:       req.body.userFirstName,
            userLastName:        req.body.userLastName,
            userContactEmail:    req.body.userContactEmail,
            userPass:            req.body.userPass,
            userTitle:           req.body.userTitle,
            updatedDate:         req.body.updatedDate
        };
        var id = req.params.id;
        users.updateUser(user, id).then(data=>{
            res.status(200);
            res.json(user);
        })
            .catch(err=>{
                console.log(err);
                res.status(500);
            });
    });
    api.patch('/archive/:id', function (req, res, next) {
        var userId = req.params.id;
        users.archiveUser(userId).then(data=>{
                res.status(200);
                res.json({archived: userId});
        })
            .catch(err=>{
                console.log(err);
                res.status(500);
            });
    });
    return api;
})();

