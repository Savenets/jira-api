'use strict';
module.exports = (function() {
    const config = require('../../config');
    const mongo = require('mongodb').MongoClient;
    const objectId = require('mongodb').ObjectID;
    const db = require('../../db');

    const projects = {
        getProjects: function getUsers(f){
            db.then(function(db){
                const projectsList = [];
                const raw = db.collection('projects').find();
                raw.forEach(function(doc) {
                    projectsList.push(doc);
                }, function() {
                    f(projectsList);
                });
            });
        },
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
        },
        archiveProject: function(id, f){
            mongo.connect(config.mongo, function (err, db) {
                var project = db.collection('projects').updateOne({'_id': objectId(id)}, {$set: {archived: true}});
                //return new promise
                project.then(function (data) {
                    db.close();
                    f(data);
                })
                    .catch(function (error) {
                        f(error);
                    });
            });
        }
    };
    return projects;
})();

