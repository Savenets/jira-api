const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TaskSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    body: {
        type: String,
        required:true
    },
    createdBy:      [{
        /*_id:  Number,
        name: String*/
    }],
    assignedTo:      [{
       /* _id:  Number,
        name: String*/
    }],
    type:   {
        type: String,
        required:true
    },
    status:  {
        type: String,
        required:true
    },
    archived:  {
        type: String,
        required:true
    },
    priority:  {
        type: String,
        required:true
    },
    comments:       [{
       /* body: String,
        createdBy: String,
        date: {type:Date, default:Date.now()}*/
    }],
    createdDate:    Date
});

module.exports = mongoose.model('Task', TaskSchema);