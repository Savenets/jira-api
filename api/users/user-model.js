'use strict';
module.exports = (function () {
    const mongo = require('mongodb').MongoClient;
    const objectId = require('mongodb').ObjectID;
    const db = require('../../db');

    const users =  {
        getUsers: function getUsers(){
            return db.then(db => db.collection('users').find())
                .then(data => data.toArray());
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
            })
        },
        archiveUser: function(id){
            return db.then(db=>{
                db.collection('users').updateOne(
                    {
                        '_id': objectId(id)
                    },
                    {
                        $set: {archived: true}
                    }
                );
            })
        }
    };
    return users;
})();


