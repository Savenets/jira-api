'use strict';
module.exports = (function () {
    const objectId = require('mongodb').ObjectID;
    const db = require('../../db');

    const users =  {
        getUsers: function(){
            return db.then(db => db.collection('users').find())
                .then(data => data.toArray())
                .then(data => data.filter(item => {
                    return !item.archived;
                }));
        },
        getAllUsers:function(){
            return db.then(db => db.collection('users').find())
                .then(data => data.toArray());
        },
        getArchived: function(){
            return db.then(db => db.collection('users').find())
                .then(data => data.toArray())
                .then(data => data.filter(item => {
                    return item.archived;
                }));
        },
        getUser: function(id){
            return db.then(db=> db.collection('users').findOne({'_id': objectId(id)}));
        },
        addUser: function(user){
            return db.then(db=> db.collection('users').insert(user));
        },
        updateUser: function(user, id){
            return db.then(db=>{
                db.collection('users')
                .updateOne(
                    {
                        '_id': objectId(id)
                    },
                    {
                        $set: user
                    }
                );
            });
        },
        archiveUser: function(id){
            //
            return db.then(db=>{
                db.collection('users').updateOne(
                    {
                        '_id': objectId(id)
                    },
                    {
                        $set: {archived: true}
                    }
                );
            });
        }
    };
    return users;
})();


