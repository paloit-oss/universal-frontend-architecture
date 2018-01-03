const webpackMerge = require('webpack-merge');
const packageJSON = require(process.cwd() + '/package.json');

packageJSON.config = packageJSON.config || {};
packageJSON.config.cli = packageJSON.config.cli || {};

var cliDefaultConfigs = {
    minimum_node_version: 8,
    folder_paths : {
        prod: './dist',
        dev: './dist-dev',
        docs: './docs',
        coverage: './coverage',
        mockapi: './mock-api'
    },
    server : {
        port: 9000,
        emulator_port: 7000,
        emulatorConfig: {
            apiEndpointsConfig: [
                {
                    selector: './mock-api/',
                    modules: [
                        "@norn/non-shared-common",
                        "@norn/non-shared-authentication-management",
                        "@norn/non-ifu-system-administration-bankgroup",
                        "@norn/non-ifu-system-administration-bank",
                        "@norn/non-ifu-system-administration-customer",
                        "@norn/non-ifu-ui-showcase"
                    ],
                    url: "/"
                }
            ],
            jsonEndpointsConfig: [
                {
                    selector: './mock-api/localization.json',
                    modules: [
                        "@norn/non-framework",
                        "@norn/non-shared-common"
                    ],
                    url: "/locale/all"
                },
                {
                    selector: './mock-api/localization.json',
                    modules: [
                        "@norn/non-ifu-login"
                    ],
                    url: "/locale/login"
                },
                {
                    selector: './mock-api/menu.json',
                    modules: [
                        "@norn/non-shared-common",
                        "@norn/non-shared-authentication-management",
                        "@norn/non-ifu-system-administration-bankgroup"
                    ],
                    url: "/menu"
                }
            ]
        }
    }
};
module.exports = webpackMerge(cliDefaultConfigs, packageJSON.config.cli);
