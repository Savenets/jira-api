const express = require('express');
const _ = require('lodash');
const app = new express();
//const config = require('../config');
//const config = require('../configer');
const config = require('dotenv').config({path: '../.env'});


const tasks = require('./tasks/task-routes');
const projects = require('./projects/project-routes');
const users = require('./users/user-routes');
const bodyParser = require('body-parser');
const db = require('./db');
const AppError = require('./errors/AppError');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/tasks', tasks);
app.use('/projects', projects);
app.use('/users', users);

app.use((err, req, res, next) => {
    if(err instanceof AppError){
        console.log('_______---------_______ This error is instanse of AppError inherited by Error buildin class');
    }
    console.log('STACK TRACE', err.stack);
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
                response: err.response,

                extra: err.extra,
                name: err.name
            }
        });
});
console.log('process.env.NODE_ENV = ' + process.env.NODE_ENV);

const server = app.listen(process.env.PORT, function(){
    console.log('app listens to: ' + server.address().port);
});