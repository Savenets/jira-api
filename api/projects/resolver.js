const User = require('../users/user-model');


var projectResolver = {
    getUserNameById: function (userId) {
        return User.findOne({
            _id: userId
        }).then(({_id:id, name}) => {
            return {id, name};
        })
    }
};

module.exports = projectResolver;