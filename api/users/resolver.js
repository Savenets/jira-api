const User = require('../users/task-model');
const Project = require('../users/project-model');


var userResolver = {
    ifUserHasTasks: function (useName) {
        return User.find({
                assignedTo: useName
            })
            .exec();
    },
    ifUserHasProjects: function(projectId){
        return Project.find({
                _id: projectId
            })
            .exec();
    }

};

module.exports = UserResolver;
