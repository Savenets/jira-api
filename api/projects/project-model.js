var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    Name: String,
    Description: String,
    Link: String,
    createdBy: [{
        _id: Number,
        name: String,
        role: String
    }],
    users: [{
        _id:  Number,
        name: String,
        role: String
    }],
    createdDate: Date,
    updatedDate: Date,
    isActive: Boolean
});
module.exports = mongoose.model('Project', ProjectSchema);
