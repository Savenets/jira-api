const User = require('../users/user-model');


var projectResolver = {
    getUserNameById: function (userId) {
        return User.findOne({
            _id: userId
        })
            .exec();
            //.then(data=> data)
    }
};

module.exports = projectResolver;