import express, { json } from 'express';
import { Server as HttpServer, createServer } from 'http';
import { AppGateway } from './infraestructure/gateway/app.gateway';
import { ConsultService } from './infraestructure/services/consult.service';
import { AppConfig } from './domain/config/app.config';
import { AppController } from './infraestructure/controller/app.controller';

class Main {
    private _expressApp: express.Application;
    private _http: HttpServer;
    private _gatewayServer: AppGateway;
    private _appConfig: AppConfig;

    constructor() {
        this._expressApp = express();
        this._expressApp.use(json());
        this._http = createServer(this._expressApp);
        this._appConfig = new AppConfig();
    }

    public startServer() {
        this._startGateway();
        this._startControllers();
        this._http.listen(this._appConfig.port, () => {
            console.info(
                `Server running on http://localhost:${this._appConfig.port}.`,
            );
        });
    }

    private _startControllers(): void {
        /**
         * Aqui vai ter todos os controllers que tiver na sua aplicação
         */
        new AppController(this._expressApp, this._gatewayServer);
    }

    private _startGateway(): void {
        /**
         * aqui coloquei em uma const porque só estou utilizando nesse ponto da aplicação
         * mas se fose utilizar em outos pontos colocaria lá em cima como uma propriedade
         * privada para poder utilizar em qualquer canto da aplicação
         */
        const consultService = new ConsultService();
        this._gatewayServer = new AppGateway(this._http, consultService);
        this._gatewayServer.startWatchers();
    }
}

new Main().startServer();
