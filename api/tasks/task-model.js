const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../../db');


var TaskSchema = new Schema({
    title:          String,
    body:           String,
    createdBy:      String,
    assignedTo:     String,
    type:           String,
    status:         String,
    archived:       String,
    priority:       String,
    comments:       [{
        body: String,
        createdBy: String,
        date: {type:Date, default:Date.now()}
    }],
    createdDate:    Date
});

module.exports = mongoose.model('Task', TaskSchema);