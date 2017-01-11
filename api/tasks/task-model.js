'use strict';
module.exports = (function () {
    const express = require('express');
    const api = express.Router();
    const config = require('../../config');
    const mongo = require('mongodb').MongoClient;
    const objectId = require('mongodb').ObjectID;
    const utc = new Date().toJSON().slice(0, 10);
    const methodOverride = require('method-override');
    const bodyParser = require('body-parser');
    api.use(methodOverride());
    api.use(bodyParser.json());
    api.use(bodyParser.urlencoded({extended: true}));

    const tasks =  {
        getTasks: function getUsers(f){
            var self = this;
            mongo.connect(config.mongo, function(err, db) {
                var gotten = db.collection('tasks').find();
                gotten.forEach(function(doc, err) {
                    self.tasksList.push(doc);
                }, function() {
                    db.close();
                    f();
                });
            });
        },
        tasksList: [],
        getTask: function(id, f){
            mongo.connect(config.mongo, function (err, db) {
                var ticket = db.collection('tasks').findOne({'_id': objectId(id)});
                ticket.then(function (data) {
                    db.close();
                    f(data);
                    })
                    .catch(function (error) {
                        console.log(error)
                        res.end('something went wrong');
                    });
            });
        }
    }
    return tasks;
})();


