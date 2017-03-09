'use strict';

require('dotenv').config({path: '../.env'});

const nconf = require('nconf');

nconf
    .argv()
    .env({
        lowerCase: true,
        separator: '__'
    })
    .defaults({
        'PORT': 3000,
         LOG: {
            LEVEL: 'info'
         }
    })
    .required(['MONGO'])

console.log(nconf.get('host'), nconf.get('HOST'), process.env.host);
