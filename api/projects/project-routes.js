'use strict';
module.exports = (function () {
    const _ = require('lodash');
    const api = require('express').Router();
    const repo = require('./repo');

    const AppError = require('../errors/AppError');
    const ItemNotFound = require('../errors/ItemNotFound');

    const logger = require( '../logger.js' );


    api.get('/', function (req, res, next) {
        logger.debug( 'getting all the projects' );
        repo.getAllProjects()
            .then(projects => {
                res.json(projects);
            })
            .catch(err => {
                // make error handler separation //////////// sanoco pay API!!!ddd
                next(err);
            });
    });
    api.get('/:id', function (req, res, next) {
        logger.debug( 'getting project by id' );
        repo.getProjectById(req.params.id)
        .then((project) => {
            res.json(project);
        })
        .catch((err) => {
            next(new ItemNotFound('project not found',{message: 'There is no suc a project', status: false, errorIn: 'project'}));

        });// the savem as catche(err => next(err));
    });
    api.post('/', function (req, res, next) {
        let np = {
            name: req.body.name,
            description: req.body.description,
            createdBy: req.body.createdBy,
            link: req.body.link,
            users: req.body.users,
            createdDate: new Date(),
            updatedDate: '',
            isActive: true
        };
        logger.debug(np.name + " is being created");
        repo.createNewProject(np)
        .then(project => {
            res.json(project);
        })
        .catch(next);
    });
    api.put('/edit/:id', function (req, res, next) {
        let project = {
            name: req.body.name,
            description: req.body.description,
            link: req.body.link,
            users: req.body.users,
            isActive: req.body.isActive,
            profileImg: req.body.profileImg
        };
        repo.updateProject(req.params.id, project)
        .then(project => {
            res.json(project);
        })
        .catch(err => {
            next(err);
        });
    });
    api.put('/:projectID/notify/:userID', function (req, res, next) {
        repo.getUserNameById(req.params.userID)
        .then(user=>{
            repo.addUserToNotifyList(req.params.projectID, user)
            .then(project => {
                res.json(project);
            })
            .catch(err => {
                next(err);
            });
        });
    });
    api.patch('/:projectID/archive', function (req, res, next) {
        repo.archiveProject(req.params.projectID)
        .then(data=>{
            res.json(data);
        })
        .catch(err => {
            next(err);
        });
    });
    return api;
})();