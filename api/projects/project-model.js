'use strict';
module.exports = (function() {
    const config = require('../../config');
    const mongo = require('mongodb').MongoClient;
    const objectId = require('mongodb').ObjectID;
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
        },
        archiveProject: function(id, f){
            mongo.connect(config.mongo, function (err, db) {
                var project = db.collection('projects').updateOne({'_id': objectId(id)}, {$set: {archived: true}});
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

