'use strict';
module.exports = (function() {
    const config = require('../../config');
    const mongo = require('mongodb').MongoClient;
    const objectId = require('mongodb').ObjectID;
    const db = require('../../db');

    const projects = {
        getProjects:
            function(){
                return  db.then( db => db.collection('projects').find())
                    .then( cursor => cursor.toArray());
        },
        submitProject:
            function(project){
                return db.then((db) => {
                    db.collection('projects').insert(project)
                });
            },
        updateProject:
            function(project, id){
                return db.then(db => {
                    db.collection('projects').updateOne({'_id': objectId(id)}, {$set: project});
                })
            },
        archiveProject:
            function(id){
                return db.then((db)=>{
                    db.collection('projects').updateOne({'_id': objectId(id)}, {$set: {archived: true}})
                })
               // return

            /*mongo.connect(config.mongo, function (err, db) {
                var project = db.collection('projects').updateOne({'_id': objectId(id)}, {$set: {archived: true}});
                //return new promise
                project.then(function (data) {
                    db.close();
                    f(data);
                })
                    .catch(function (error) {
                        f(error);
                    });
            });*/
        }
    };
    return projects;
})();

