const webpackMerge = require('webpack-merge');
const packageJSON = require(process.cwd() + '/package.json');

packageJSON.config = packageJSON.config || {};
packageJSON.config.cli = packageJSON.config.cli || {};

var cliDefaultConfigs = {
    minimumNodeVersion: 8,
    folderPaths : {
        prod: './dist',
        dev: './dist-dev',
        docs: './docs',
        coverage: './coverage',
        mockapi: './mock-api'
    },
    server : {
        port: 9000,
        emulatorPort: 7000,
        emulatorAPIFolderPath: '/api-endpoints'
    }
};
module.exports = webpackMerge(cliDefaultConfigs, packageJSON.config.cli);
