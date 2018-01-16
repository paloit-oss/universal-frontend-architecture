const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const cwd = process.cwd();

const configureRoutes = (apiEndpointRoutes) => {
    const multipartyMiddleware = require('connect-multiparty')();
    const express = require('express');
    const router = express.Router();

    if (apiEndpointRoutes) {
        apiEndpointRoutes.forEach((route) => {
            // Currently only GET, POST and PUT are supported
            if (route.method === 'GET') {
                router.get(route.url, route.callback);
            }
            else if (route.method === 'POST') {
                if(route.isupload) {
                    router.post(route.url, multipartyMiddleware, route.callback);
                }
                else {
                    router.post(route.url, route.callback);
                }
            }
            else if (route.method === 'PUT') {
                router.put(route.url, route.callback);
            }
        });
    }

    return router;
};

const serverListeners = {
    onError: (error, port) => {
        if (error.syscall !== 'listen') {
            throw error;
        }

        switch (error.code) {
            case 'EACCES':
                console.error(chalk.red('Port ' + port + ' requires elevated privileges!'));
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(chalk.red('Port ' + port + ' is already in use!'));
                process.exit(1);
                break;
            default:
                throw error;
        }
    },
    onListen: (port) => {
        console.log(chalk.green('[UFA Server] Serving on port:', port));
    }
};

const requireUncached = (module) => {
    delete require.cache[require.resolve(module)]
    return require(module);
}

const serve = (mode, staticPath, apiPath, port) => {

    const express = require('express');
    const bodyParser = require('body-parser');
    const cookieParser = require('cookie-parser');
    const http = require('http');

    // Setup Express App
    let app = express();
    app.use(bodyParser.text({ type: 'text/plain' }));
    app.use(bodyParser.json({ type: 'application/json' }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    // Load and watch Static resources
    if (mode === 'both' || mode === 'static') {
        try {
            fs.accessSync(staticPath);
        } catch (e) {
            throw new Error(chalk.red('[ERROR: UFA CLI] Static Assets folder not found!'));
            process.exit(1);
        }


        app.use(express.static(staticPath));
    }

    // Load and watch Mock API
    if (mode === 'both' || mode === 'api') {
        try {
            fs.accessSync(apiPath);
        } catch (e) {
            throw new Error(chalk.red('[ERROR: UFA CLI] Mock API Endpoints folder not found!'));
            process.exit(1);
        }

        const JSONEndpoints = {};

        // Read Mock API Endpoint files and load them on the server
        fs.readdirSync(apiPath).forEach((file) => {
            if (file.indexOf('.json') !== -1) {
                const jsonEndpoint = requireUncached(path.join(apiPath, file));
                if (jsonEndpoint) {
                    if (JSONEndpoints[jsonEndpoint.url]) {
                        _.merge(JSONEndpoints[jsonEndpoint.url].data, jsonEndpoint.data);
                    }
                    else {
                        JSONEndpoints[jsonEndpoint.url] = jsonEndpoint;
                    }
                }

            }
            else if (file.indexOf('.js') !== -1) {
                const apiEndpoint = requireUncached(path.join(apiPath, file));
                if (apiEndpoint) {
                    app.use(apiEndpoint.mainUrl, configureRoutes(apiEndpoint.routes));
                }
            }

        });

        _.forEach(JSONEndpoints, function(route, key) {
            app.get(route.url, function(req, res, next) {
                res.json(route.data);
            });
        });
    }

    // Create HTTP server.
    app.set('port', port);
    let server = http.createServer(app);

    // Handle Error
    server.on('error', (error) => serverListeners.onError(error, port));

    // Handle start
    server.on('listening', () => serverListeners.onListen(port));

    server.listen(port);

    return server;
};

const start = (argv) => {
    console.log(chalk.yellow('[UFA Server] Starting...'));
    let mode = argv.mode;
    let staticPath = path.join(cwd, argv.staticpath);
    let apiPath = path.join(cwd, argv.apipath);
    let port = argv.port;

    const fileWatcher = require('filewatcher')();
    fileWatcher.add(staticPath);
    fileWatcher.add(apiPath);

    let server = serve(mode, staticPath, apiPath, port);

    // Restart server on any file changes
    fileWatcher.on('change', () => {
        console.log(chalk.yellow('[UFA Server] Restarting...'));
        server.close();
        server = null;
        server = serve(mode, staticPath, apiPath, port);
    });
}

module.exports = {
    start: start
};
