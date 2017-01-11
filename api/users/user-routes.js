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

    const users = require('./user-model');

    api.get('/', function (req, res, next) {
        users.getUsers(function(){
            res.json(users.usersList);
        })
    });
    api.post('/', function (req, res, next) {
        console.log('user is added');
        console.log(req.body);
        var user = {
            userFirstName:       req.body.userFirstName,
            userLastName:        req.body.userLastName,
            userContactEmail:    req.body.userContactEmail,
            userPass:            req.body.userPass,
            userTitle:           req.body.userTitle
        };
        users.addUser(user, function(){
            res.send(200, user);
        });
    });
    api.put('/:id', function (req, res, next) {
        var user = {
            userFirstName:       req.body.userFirstName,
            userLastName:        req.body.userLastName,
            userContactEmail:    req.body.userContactEmail,
            userPass:            req.body.userPass,
            userTitle:           req.body.userTitle
        };
        var id = req.query.id;
        users.updateUser(user, id, function(user){
            res.send(200, user);
        });
    });
    api.get('/:id', function (req, res, next) {
        var userId = req.query.id;
        users.getUser(userId, function(data){
            res.json(data);
        })
    });
    api.patch('/archive/:id', function (req, res, next) {
        var userId = req.query.id;
        users.archiveUser(userId, function(data){
            res.json(data);
        })
    });
    return api;
})();

