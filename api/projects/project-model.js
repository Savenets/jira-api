'use strict';
module.exports = (function() {
    const express = require('express');
    const api = express.Router();
    const config = require('../../config');
    const mongo = require('mongodb').MongoClient;
    const objectId = require('mongodb').ObjectID;
    // Save full timestamp
    const utc = new Date().toJSON().slice(0,10);
    // TODO: Move bodyParser to app.js
    const methodOverride = require('method-override');
    const bodyParser = require('body-parser');

    api.use(methodOverride());
    api.use(bodyParser.json());
    api.use(bodyParser.urlencoded({ extended: true }));

    const collection = 'projects';
    const projectModel = {};

    const projects = {
        getProjects: function getUsers(f){
            var self = this;
            mongo.connect(config.mongo, function(err, db) {
                var gotten = db.collection('projects').find();
                gotten.forEach(function(doc, err) {
                    self.projectsList.push(doc);
                }, function() {
                    db.close();
                    f();
                });
            });
        },
        projectsList: [],

        submitProject: function(project, f){
            mongo.connect(config.mongo, function(err, db) {
                db.collection('projects').insert(project, function(err, result) {
                    console.log('Item inserted', project.projectName);
                    db.close();
                    f();
                });
            });
        },
        updateProject: function(project, id, f){
            mongo.connect(config.mongo, function(err, db) {
                db.collection('projects').updateOne({'_id': objectId(id)}, {$set: project}, function(err, result) {
                    console.log('Item updated');
                    db.close();
                    f();
                });
            });
        }


    }





    return projects;
})();

