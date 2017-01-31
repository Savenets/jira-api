const User = require('../users/task-model');
const Project = require('../users/project-model');


var userResolver = {
    ifUserHasTasks: function (useName) {
        return User.find({
            assignedTo: useName
        });
    },
    ifUserHasProjects: function(projectId){
        return Project.find({
            _id: projectId
        });
    }

};

module.exports = userResolver;
