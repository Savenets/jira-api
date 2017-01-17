'use strict';
module.exports = (function () {
    const objectId = require('mongodb').ObjectID;
    const db = require('../../db');

    const tasks =  {
        getTasks:
            function(){
                return db.then(db => db.collection('tasks').find())
                    .then(data => data.toArray());
            },
        getTask:
            function(id){
                return db.then(db => db.collection('tasks').findOne({'_id': objectId(id)}));
            },
        createTask:
            function(task){
                return db.then(db => db.collection('tasks').insert(task));
            },
        updateTask:
            function(task, id){
                return db.then(db=>{
                    db.collection('tasks').updateOne(
                        {'_id': objectId(id)},
                        {$set: task});
                });
            },
        addComment:
            function(comment, taskId){
                return db.then(db=> {
                    db.collection('tasks').updateOne(
                        {'_id': objectId(taskId)},
                        {$push: {comments: comment}
                        });
                });
            },
        status:
            function(ticketId, issueStatus){
                return db.then(db=>{
                    db.collection('tasks').updateOne(
                        {'_id': objectId(ticketId)},
                        {$set: {status: issueStatus}
                        });
                });
            },
        priority:
            function(ticketId,issuePriority){
                return db.then(db=>{
                    db.collection('tasks').updateOne(
                        {'_id': objectId(ticketId)},
                        {$set: {status: issuePriority}
                        });
                });
            }
    };
    return tasks;
})();


