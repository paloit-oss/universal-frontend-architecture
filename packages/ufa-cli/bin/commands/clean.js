exports.command = 'clean [all] [names..] [files..]';
exports.desc = 'Deletes folders/files';
exports.builder = {
    all: {
        type: 'boolean',
        alias: 'a',
        group: 'Clean Options:',
        description: 'Deletes all the folders/files specified in the cli config \'folder_paths\' '
    },
    names: {
        type: 'array',
        alias: 'n',
        group: 'Clean Options:',
        description: 'Deletes the folders/files by \'name\' that are specified in the cli config \'folder_paths\' '
    },
    files: {
        type: 'array',
        alias: 'f',
        group: 'Clean Options:',
        description: 'Deletes the custom folder/files specified as parameters'
    }
};

exports.handler = function (argv) {
    const del = require('del');
    const _ = require('lodash');
    const chalk = require('chalk');
    const cliConfigs = require('../cli-config');

    let filesToDelete = [];

    console.log(chalk.yellow('[Command: UFA CLI] Clean'));

    if(argv.all) {
         _.forEach(cliConfigs.folder_paths, (value, key) => {
            filesToDelete.push(value + '**');
        });
    }

    if(argv.names) {
        _.forEach(argv.names, (value) => {
            filesToDelete.push(cliConfigs.folder_paths[value] + '**');
        });
    }

    if(argv.files) {
        filesToDelete = _.concat(filesToDelete, argv.files);
    }

    del(filesToDelete);

    console.log(chalk.green('[Success: UFA CLI] Successfully deleted folders/files: ', filesToDelete));
};
