const winston = require( 'winston' );
const fs = require( 'fs' );
const config = require('./config');
const logDir = 'log'; // Or read from a configuration it is not good idea to put logs in files
const env = process.env.NODE_ENV;


if ( !fs.existsSync( logDir ) ) {
    // Create the directory if it does not exist
    fs.mkdirSync( logDir );
}
const logger = new( winston.Logger )( {
    transports: [
        new winston.transports.Console( {
            level: 'debug', // Only write logs of warn level or higher
            colorize: true
        } ),
        new winston.transports.File( {
            level: config.get('LOG:LEVEL'),
            filename: logDir + '/logs.log',
            maxsize: 1024 * 1024 * 10 // 10MB
        } )
    ],
    exceptionHandlers: [
        new winston.transports.File( {
            filename: 'log/exceptions.log'
        } )
    ]
} );

module.exports = logger;

// Use this singleton instance of logger like:
// logger = require( 'Logger.js' );
// logger.debug( 'your debug statement' );
// logger.warn( 'your warning' );
//