'use strict';
var path = require('path');
//realize dev json not being in repo;
var getConfigByEnvironment = function (env) {
    if(!env){
        console.error(new Error('process.env.NODE_ENV is not defined')); //this is gives error with stack
       // throw new Error('process.env.NODE_ENV is not defined');
        process.exit(1); //tatus 0 is ok all else is error code;
    }

    var json = path.join(__dirname, env + '.json');
    var config = require(json);
    config.host = config.host || 'localhost';
    config.env = env;
    return config;
};

// if no env

var config = getConfigByEnvironment(process.env.NODE_ENV);
config.port = process.env.PORT || config.port;
config.getConfigByEnvironment = getConfigByEnvironment;

module.exports = config;
