'use strict';
module.exports = (function() {
   // const config = require('../../config');
    const mongo = require('mongodb').MongoClient;
    const objectId = require('mongodb').ObjectID;
    const db = require('../../db');

    const projects = {
        getProjects:
            function(){
                return  db.then( db => db.collection('projects').find())
                    .then( cursor => cursor.toArray());
            },
        getProject:
            function(id){
                return db.then(db => db.collection('projects').findOne({'_id': objectId(id)}))
            },
        submitProject:
            function(project){
                return db.then((db) => {
                    db.collection('projects').insert(project);
                });
            },
        updateProject:
            function(project, id){
                return db.then(db => {
                    db.collection('projects').updateOne(
                        {'_id': objectId(id)},
                        {$set: project});
                });
            },
        notify:
            function(user, projectId){
                return db.then(db=>{
                    db.collection('projects').updateOne(
                        {'_id': objectId(projectId)},
                        {$push: {users: user}
                        });
                })
            },
        archiveProject:
            function(id){
                return db.then((db)=>{
                    db.collection('projects').updateOne(
                        {'_id': objectId(id)},
                        {$set: {archived: true}
                        });
                });
            }
    };
    return projects;
})();

