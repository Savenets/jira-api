const User = require('../users/user-model');
const Task = require('./task-model');

var repo = {
    getAllTasks: function () {
        return Task.find();
    },
    getTaskById: function (id) {
        return Task.findOne({
            _id: id
        });
    },
    createTask: function (task) {
        const newTask = new Task();
        newTask.title = task.title,
            newTask.body = task.body,
            newTask.createdBy = task.createdBy,
            newTask.assignedTo = task.assignedTo,
            newTask.type = task.type,
            newTask.status = task.status,
            newTask.archived = task.archived,
            newTask.comments = [],
            newTask.createdDate = new Date(); // TODO: Use Mongoose
        console.log(newTask);
        return newTask.save();
    },
    updateTask: function (taskId, TaskToUpdate) {
        return Task.findOneAndUpdate({
            _id: taskId
        }, {
            $set: {
                title: TaskToUpdate.title,
                body: TaskToUpdate.body,
                type: TaskToUpdate.type,
                status: TaskToUpdate.status,
                createdBy: TaskToUpdate.createdBy,
                assignedTo: TaskToUpdate.assignedTo,
                isActive: TaskToUpdate.isActive,
                comments: TaskToUpdate.comments
            }
        },
        {upsert: true});
    },
    addComment: function (id, comment) {
        return Task.findOneAndUpdate({
            _id: id
        },
            {
                $push: {
                    comments: {
                        body: comment.body,
                        createdBy: comment.createdBy,
                        date: new Date()
                    }
                }
            }
        );
    },
    changeStatus: function (id, status) {
        return Task.findOneAndUpdate({
            _id: id
        },
            {
                $set: {status: status}
            }
        );
    },
    setPriority: function (id, priority) {
        return Task.findOneAndUpdate({
            _id: id
        },
            {
                $set: {priority: priority}
            },
        {upsert: true});
    }
};
module.exports = repo;