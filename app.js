const express = require('express');
const _ = require('lodash');
const app = new express();
const config = require('./config');

const tasks = require('./api/tasks/task-routes');
const projects = require('./api/projects/project-routes');
const users = require('./api/users/user-routes');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/tasks', tasks);
app.use('/projects', projects);
app.use('/users', users);

app.use((err, req, res, next) => {
    console.error('STACK TRACE', err.stack);
    const status = err.status || 500;
    res
        .status(status)
        .json({
            success: false, //take into consideration;
            reason: {
                code: err.code,
                message: err.message,
                fields: err.fields,
                explanation: err.explanation,
                response: err.response
            }
        });
});
console.log('process.env.NODE_ENV = ' + process.env.NODE_ENV);

const server = app.listen(config.port, function(){
    console.log('app listens to: ' + server.address().port);
});