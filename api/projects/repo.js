const User = require('../users/user-model');
const Project = require('./project-model');

var projectResolver = {
    getUserNameById: function (userId) {
        return User.findOne({
            _id: userId
        }).then(({_id:id, name}) => {
            return {id, name};
        });
    },
    getAllProjects: function(){
        return Project.find();
    }
};

module.exports = projectResolver;