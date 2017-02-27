var mongoose = require('mongoose');
var validate = require('mongoose-validate');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: {
        type: String,
        required:true
    },
    lastName: {
        type: String,
        required:true
    },
    contactEmail: {
        type: String,
        required:true,
        validate: [validate.email, 'invalid email address']

    },
    password: {
        type: String,
        required:true
    },
    title: {
        type: String,
        required:true
    },
    profileImg: String,
    registered: {
        type: Date,
        default: Date.now,
        required:true
    }
});
module.exports = mongoose.model('User', UserSchema);
