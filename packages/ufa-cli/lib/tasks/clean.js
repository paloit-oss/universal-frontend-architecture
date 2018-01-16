/**
 * Deletes folders/files
 * @param argv
 *  argv.all: {
        type: 'boolean',
        description: 'Deletes all the folders/files specified in the cli config \'folder_paths\' '
    },
    argv.names: {
        type: 'array',
        description: 'Deletes the folders/files by \'name\' that are specified in the cli config \'folder_paths\' '
    },
    argv.files: {
        type: 'array',
        description: 'Deletes the custom folder/files specified as parameters'
    }
 */

module.exports = (argv) => {
    const del = require('del');
    const _ = require('lodash');
    const chalk = require('chalk');
    const cliConfigs = require('../../cli-config');

    let filesToDelete = [];

    console.log(chalk.yellow('[Command: UFA CLI] Clean'));

    if(argv.all) {
         _.forEach(cliConfigs.folderPaths, (value, key) => {
            filesToDelete.push(value + '**');
        });
    }

    if(argv.names) {
        _.forEach(argv.names, (value) => {
            filesToDelete.push(cliConfigs.folderPaths[value] + '**');
        });
    }

    if(argv.files) {
        filesToDelete = _.concat(filesToDelete, argv.files);
    }

    del(filesToDelete);

    console.log(chalk.green('[Success: UFA CLI] Successfully deleted folders/files: ', filesToDelete));
};
