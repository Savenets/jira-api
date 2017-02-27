const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TaskSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    body: {
        type: String
    },
    createdBy: {
        type: Schema.ObjectId,
        ref: 'User'
        /*_id:  Number,
        name: String*/
    },
    assignedTo:  {
        type: Schema.ObjectId,
        ref: 'User'
        /*_id:  Number,
         name: String*/
    },
    type:   {
        type: String,
        required:true
    },
    status:  {
        type: String
    },
    archived:  {
        type: String
    },
    priority:  {
        type: String
    },
    comments:       [{
       /* body: String,
        createdBy: String,
        date: {type:Date, default:Date.now()}*/
    }],
    createdDate:    Date
});

module.exports = mongoose.model('Task', TaskSchema);