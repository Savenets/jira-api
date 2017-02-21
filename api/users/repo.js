const User = require('../users/user-model');
const Project = require('../projects/project-model');


const userResolver = {
    getUsers: function(){
        return User.find({
            archived: {$exists:false}
        });
    },
    getAllUsers: function(){
        return User.find();
    },
    getArchivedUsers: function(){
        return User.find(
            {archived: {$exists:true}
            });
    },
    getUserById: function(userId){
        return User.findOne({
            _id: userId
        });
    },
    createNewUser: function(user){
        let newUser = new User();

        newUser.firstName =      user.firstName;
        newUser.lastName =       user.lastName;
        newUser.title =          user.title;
        newUser.contactEmail =   user.contactEmail;
        newUser.password =       user.password;
        newUser.role =           user.role;
        newUser.registered =     new Date;

        return newUser.save();
    },
    updateUser: function(userId, userData){
        return User.findOneAndUpdate({
            _id: userId
        },
            {
                $set: {
                    firstName:      userData.firstName,
                    lastName:       userData.lastName,
                    contactEmail:   userData.contactEmail,
                    password:       userData.password,
                    title:          userData.title,
                    updatedDate:    new Date()
                }
            });
    },
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
