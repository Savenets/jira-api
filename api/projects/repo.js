const User = require('../users/user-model');
const Project = require('./project-model');

var repo = {
    verifyPrject: function(projId){

    },
    getUserNameById: function (userId) {
        return User.findOne({
            _id: userId
        }).then(({_id, firstName, lastName, role}) => {
            return {_id, firstName, lastName, role};
        });
    },
    getAllProjects: function () {
        return Project.find();
    },
    getProjectById: function (id) {
        return Project.findOne({
            _id: id
        });
    },
    createNewProject: function (project) {
        const newProject = new Project();
        newProject.name =         project.name;
        newProject.description =  project.description;
        newProject.createdBy =    project.createdBy;
        newProject.link =         project.link;
        newProject.users =        project.users;
        newProject.isActive =     project.isActive;
        return newProject.save();
    },
    updateProject: function(id,project){
        console.log(project);
        return Project.findOneAndUpdate(
            {_id: id },
            {
                $set: {
                    name:         project.name,
                    description:  project.description,
                    link:         project.link,
                    users:        project.users,
                    isActive:     project.isActive,
                    profileImg:   project.profileImg,
                    updatedDate:   new Date()
                }
            },
            { upsert: true });
    },
    addUserToNotifyList: function(projId, user){
        return  Project.findOneAndUpdate({
            _id: projId
        },
        {$addToSet: {users: user}},
        {upsert: true}
        );
    },
    archiveProject: function(projId){
        return Project.findOneAndUpdate({
            '_id': projId
        },
            {$set: {isActive: false}}
        );
    }
};

module.exports = repo;