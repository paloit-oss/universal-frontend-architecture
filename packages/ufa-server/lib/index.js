const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');
const fileWatcher = require('filewatcher')();
const cwd = process.cwd();
const multipartyMiddleware = require('connect-multiparty')();

const configureRoutes = (apiEndpointRoutes) => {
    const router = express.Router();

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

const start = (argv) => {

    let mode = argv.mode;
    let staticPath = path.join(cwd, argv.staticpath);
    let apiPath = path.join(cwd, argv.apipath);
    let port = argv.port;

    console.log(chalk.yellow('[UFA Server] Starting...'));

    // Setup Express App
    const app = express();
    app.use(bodyParser.text({ type: 'text/plain' }));
    app.use(bodyParser.json({ type: 'application/json' }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.set('port', port);

    // Load and watch Static resources and Mock API
    if (mode === 'both' || mode === 'static') {
        fileWatcher.add(staticPath);
        app.use(express.static(staticPath));
    }

    if (mode === 'both' || mode === 'api') {
        fileWatcher.add(apiPath);

        // Read Mock API Endpoint files and load them on the server
        fs.readdirSync(apiPath).forEach((file) => {
            const apiEndpoint = require(path.join(apiPath, file));
            app.use(apiEndpoint.mainUrl, configureRoutes(apiEndpoint.routes));
        });
    }

    // Create HTTP server.
    const server = http.createServer(app);

    // Handle Error
    server.on('error', (error) => serverListeners.onError(error, port));

    // Handle start
    server.on('listening', () => serverListeners.onListen(port));

    // Restart server on any file changes
    fileWatcher.on('change', () => {
        console.log(chalk.yellow('[UFA Server] Restarting...'));
        server.close();
        server.listen(port);
    });

    server.listen(port);
};

module.exports = {
    start: start
};
