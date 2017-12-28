import chalk from 'chalk';
import * as path from 'path';
import * as fs from 'fs';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as http from 'http';

const fileWatcher: any = require('filewatcher')();
const cwd: any = process.cwd();
const multipartyMiddleware: any = require('connect-multiparty')();

export declare namespace UFAServer {

    interface IArguments{
        mode: string;
        staticpath: string;
        apipath: string;
        port: number;
    }

    interface IServerEmulator {
        start(argv: IArguments): void;
    }
}

export class ServerEmulator implements UFAServer.IServerEmulator {

    public start = (argv: UFAServer.IArguments): void => {
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
                app.use(apiEndpoint.mainUrl, this.configureRoutes(apiEndpoint.routes));
            });
        }

        // Create HTTP server.
        const server = http.createServer(app);

        // Handle Error
        server.on('error', (error) => this.serverListeners.onError(error, port));

        // Handle start
        server.on('listening', () => this.serverListeners.onListen(port));

        // Restart server on any file changes
        fileWatcher.on('change', () => {
            console.log(chalk.yellow('[UFA Server] Restarting...'));
            server.close();
            server.listen(port);
        });

        server.listen(port);
    };

    private configureRoutes = (apiEndpointRoutes: any) => {
        const router = express.Router();

        apiEndpointRoutes.forEach((route: any) => {
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

    private serverListeners: any = {
        onError: (error: any, port: any) => {
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
        onListen: (port: any) => {
            console.log(chalk.green('[UFA Server] Serving on port:', port));
        }
    };
}


