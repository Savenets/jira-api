var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String,
    description: String,
    link: String,
    createdBy: [{
        firstName: String,
        lastName: String,
        role: String
    }],
    users: [{
        firstName: String,
        lastName: String,
        role: String
    }],
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        lastModified: true,
        default: Date.now
    },
    isActive: Boolean
});
module.exports = mongoose.model('Project', ProjectSchema);
