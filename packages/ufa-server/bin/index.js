#!/usr/bin/env node
const argv = require('yargs')
    .usage('\nWeb Server to serve static resources and mock api endpoints.\n\n$0 -m <mode> -s <static-content-folder> -a <mock-api-folder> -p <port>')
    .options({
        'mode': {
            type: 'string',
            alias: 'm',
            group: 'Server Options:',
            default: 'both',
            choices: ['both', 'static', 'api'],
            description: 'Serve - Static resources or Mock API Endpoints or Both'
        },
        'staticpath': {
            alias: 's',
            describe: 'Static content relative path',
            default: './dist',
            type: 'string',
            group: 'Server Options:'
        },
        'apipath': {
            alias: 'a',
            describe: 'Mock api relative path',
            default: './mock-api',
            group: 'Server Options:',
            type: 'string'
        },
        'port': {
            alias: 'p',
            describe: 'Port number',
            default: 9000,
            group: 'Server Options:',
            type: 'number'
        }
    })
    .help()
    .version()
    .strict(true)
    .argv;

const server = require('../lib/index.js');
server.start(argv);


