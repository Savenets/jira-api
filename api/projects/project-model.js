var mongoose = require('mongoose');
var validate = require('mongoose-validate');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    link:{
        type:String,
        required: true
    },
    createdBy: [{
        /*_id:  String,
        firstName: String,
        lastName: String,
        role: String*/
    }],
    users: [{}],
    createdDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedDate: {
        type: Date,
        lastModified: true,
        default: Date.now
    },
    isActive: Boolean
});
module.exports = mongoose.model('Project', ProjectSchema);
