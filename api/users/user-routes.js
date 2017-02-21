'use strict';
module.exports = (function() {
    const express = require('express');
    const api = express.Router();

    const User = require('./user-model');
    const repo = require('./repo');

    api.get('/', function (req, res, next) {
        repo.getUsers()
            .then(users => res.json(users))
            .catch(next);
    });
    api.get('/all-users', function (req, res, next) {
        repo.getAllUsers()
            .then(allUsers => res.json(allUsers))
            .catch(next);
    });
    api.get('/archived', function (req, res, next) {
        repo.getArchivedUsers()
            .then(archivedUsers => res.json(archivedUsers))
            .catch(next);
    });
    api.get('/:id', function (req, res, next) {
        const userId = req.params.id;
        repo.getUserById(userId)
            .then(user => res.json(user))
            .catch(next);
    });
    api.post('/', function (req, res, next) {
        const newUser = {
            firstName :      req.body.firstName,
            lastName :       req.body.lastName,
            contactEmail :   req.body.contactEmail,
            password :       req.body.password,
            title :          req.body.title,
            registered :     new Date
        };
        repo.createNewUser(newUser)
            .then(newUser => res.json(newUser))
            .catch(next);
    });
    api.put('/:id', function (req, res, next) {
        const userId = req.params.id;
        const userToUpdate = {
            firstName :      req.body.firstName,
            lastName :       req.body.lastName,
            contactEmail :   req.body.contactEmail,
            password :       req.body.password,
            title :          req.body.title,
            registered :     new Date
        };
        repo.updateUser(userId, userToUpdate)
            .then(userId => res.json(userId))
            .catch(next);
    });
    api.patch('/archive/:id', function (req, res) {
        let usersTasks = repo.ifUserHasTasks();
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

