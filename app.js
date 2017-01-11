const express = require('express');
const app = new express();
const config = require('./config');

const tasks = require('./api/tasks/task-routes');
const projects = require('./api/projects/project-routes');
const users = require('./api/users/user-routes');

app.use('/tasks', tasks);
app.use('/projects', projects);
app.use('/users', users);

console.log('process.env.NODE_ENV = ' + process.env.NODE_ENV);
console.log('port is' +  config.port);
console.log('list to port 4000');


app.listen(config.port);