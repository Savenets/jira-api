'use strict';
module.exports = (function () {
    const express = require('express');
    const api = express.Router();
    const Task = require('./task-model');


    api.get('/', function (req, res) {
        Task.find({}).then(data=> {
            console.log('tasks printed');
            res.status(200);
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.tatus(500);
        });
    });
    api.get('/:id', function (req, res) {
        Task.findOne({ _id: req.params.id })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(500);
        });
    });
    api.post('/', function (req, res) {
        console.log('task to be inserted');
        const newTask = new Task();

        newTask.title =           req.body.title,
        newTask.body =            req.body.body,
        newTask.createdBy =       req.body.createdBy,
        newTask.assignedTo =      req.body.assignedTo,
        newTask.type =            req.body.type,
        newTask.status =          req.body.status,
        newTask.archived =        req.body.archived,
        newTask.comments =        [],
        newTask.createdDate =     new Date(); // TODO: Use Mongoose

        newTask.save()
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                console.log(err);
                res.status(500);
            });
    });
    api.put('/edit/:taskId', function (req, res) {
        Task.findOneAndUpdate({
            _id: req.params.taskId
        }, {
            $set: {
                title: req.body.title,
                body: req.body.body,
                type: req.body.type,
                status: req.body.status,
                createdBy: req.body.createdBy,
                assignedTo: req.body.assignedTo,
                isActive: req.body.isActive
            }
        },
        {upsert: true})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.tatus(500);
        });

    });
    api.post('/:taskId/comments', function (req, res) {
        Task.findOneAndUpdate({
            _id: req.params.taskId
        },
            {$push: {comments:
            {
                body: req.body.body,
                createdBy: req.body.createdBy,
                date: new Date()
            }
            }
            })
        .then(data => {
            res.status(200);
            res.json(data);
        })
        .catch(err=>{
            console.log(err);
            res.status(500);
        });
    });
    api.patch('/:taskId/status/:status', function (req, res) {
        Task.findOneAndUpdate({
            _id: req.params.taskId
        },
            {$set: {status: req.params.status}
            }
        ).then(data => {
            res.json(data);
        }).catch(err=>{
            console.log(err);
            res.staus(500);
        });
    });
    api.put('/:taskId/priority/:priority', function (req, res) {
        Task.findOneAndUpdate({
            _id: req.params.taskId
        },
            {$set: {priority: req.params.priority}
            },
            {upsert: true}
        ).then(data => {
            res.json(data);
        }).catch(err=>{
            console.log(err);
            res.staus(500);
        });
    });

   /* api.get('/', function (req, res) {
        tasks.getTasks().then(data=> {
            console.log('tasks printed');
            res.status(200);
            res.json(data);
        })
            .catch(err => {
                console.log(err);
                res.tatus(500);
            }
            );
    });
    api.get('/:id', function (req, res) {
        var ticketId = req.params.id;
        tasks.getTask(ticketId).then(data => {
            res.status(200);
            res.json(data);
        })
        .catch(err=>{
            console.log(err);
            res.status(500);
        });
    });
    api.post('/', function (req, res) {
        console.log('task to be inserted');
        var issue = {
            issueTitle:    req.body.issueTitle,
            issueBody:     req.body.issueBody,
            createdBy:     req.body.createdBy,
            assignedTo:    req.body.assignedTo,
            issueType:     req.body.issueType,
            archived:      req.body.archived,
            comments:      [],
            createdDate:   new Date()
        };
        tasks.createTask(issue).then(() => {
            res.status(200);
            res.json(issue);
        })
        .catch(err=>{
            console.log(err);
            res.status(500);
        });
    });
    api.put('/:taskId', function (req, res) {
        var issue = {
            issueTitle:    req.body.issueTitle,
            issueBody:     req.body.issueBody,
            createdBy:     req.body.createdBy,
            assignedTo:    req.body.assignedTo,
            issueType:     req.body.issueType,
            updatedDate:   new Date()
        };
        var taskId = req.params.taskId;
        tasks.updateTask(issue, taskId).then(() => {
            res.status(200);
            res.json(issue);
        }).catch(err=>{
            console.log(err);
            res.send(err);
        });
    });
    // TODO
    // POST /tasks/:task_id/comments
    // stst
    api.post('/:taskId/comments', function (req, res) {
        var comment = {
            commentBody: req.body.commentBody,
            createBy: req.body.createBy,
            createdDate: new Date()
        };
        var taskId = req.params.taskId;
        tasks.addComment(comment, taskId).then(() => {
            res.status(200);
            res.json({'commentAdded':true});
        })
            .catch(err=>{
                console.log(err);
                res.status(500);
            });
    });
    // PATCH /tasks/:task_id/status
    api.patch('/:taskId/status/:status', function (req, res) {
        const status =  req.params.status;
        const taskId = req.params.taskId;

        tasks.status(taskId, status).then(() => {
            console.log('stauts changed');
            res.status(200);
            res.json({'statusUpdated':true});
        }).catch(err=>{
            console.log(err);
            res.staus(500);
        });
    });
    api.put('/:taskId/priority/:priority', function (req, res) {
        const priority =  req.params.priority;
        const taskId = req.params.taskId;
        tasks.priority(taskId,priority).then(() => {
            res.status(200);
            res.json({'statusUpdated':true});
        }).catch(err=>{
            console.log(err);
            res.staus(500);
        });
    });*/
    return api;
})();


