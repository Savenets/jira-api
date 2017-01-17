'use strict';
module.exports = (function () {
    const express = require('express');
    const api = express.Router();
    const tasks = require('./task-model');

    api.get('/', function (req, res) {
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
    api.post('/:taskId/comment', function (req, res) {
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
    api.patch('/:taskId/:status', function (req, res) {
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
    api.put('/:taskId/:priority', function (req, res) {
        const priority =  req.params.priority;
        const taskId = req.params.taskId;
        tasks.priority(taskId,priority).then(() => {
            res.status(200);
            res.json({'statusUpdated':true});
        }).catch(err=>{
            console.log(err);
            res.staus(500);
        });
    });
    return api;
})();


