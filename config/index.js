'use strict';
var path = require('path');

var getConfigByEnvironment = function (env) {
    if (!env || env == 'undefined' || env == 'test') {
        env = 'development';
    }
    var json = path.join(__dirname, env + '.json');
    var config = require(json);
    config.host = config.host || 'localhost';
    config.env = env;
    return config;
};

var config = getConfigByEnvironment(process.env.NODE_ENV);
config.port = process.env.PORT || config.port;
config.getConfigByEnvironment = getConfigByEnvironment;

module.exports = config;
