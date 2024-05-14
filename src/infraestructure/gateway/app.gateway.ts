import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { SocketEventsEnum } from 'src/domain/enums/gateway.enum';
import { ConsultCarDataInterface } from 'src/domain/interface/detran.interface';
import { ConsultService } from '../services/consult.service';

export class AppGateway {
    private _server: Server;
    private _connectedSockets: Array<Socket> = [];

    constructor(
        httpServer: HttpServer,
        private _consultService: ConsultService,
    ) {
        this._server = new Server(httpServer, {
            cors: {
                origin: '*',
            },
        });
    }

    public getGatewayServer(): Server {
        return this._server;
    }

    public startWatchers() {
        this._watchConnection();
        this._watchDesconnection();
        this._watchConsultCar();
    }

    /**
     * exxemplo de método para caso precise pegar os clientes conectados ou até mesmo saber quantos clientes estão
     * utilizando ao mesmo tempo, mas está aqui para referência
     * */
    public getConnectedSockets(): Array<Socket> {
        return this._connectedSockets;
    }

    // exemplo de método que vai enviar para todos os clientes conectados
    public emitData(event: SocketEventsEnum, data: any): void {
        this._server.emit(event, data);
    }

    /**
     * Aqui um exemplo de um método que ouve um evento da aplicação, faz o que tem que ser feito
     * e response o cliente
     */
    private _watchConsultCar(): void {
        this._server.on(
            SocketEventsEnum.CONSULT_CAR,
            async (
                socket,
                { department, license_plate, renavan }: ConsultCarDataInterface,
            ) => {
                const carTraficFines = await this._consultService.consultCar(
                    license_plate,
                    renavan,
                    department,
                );
                socket.emit(
                    SocketEventsEnum.RESPOSE_CONSULT_CAR,
                    carTraficFines,
                );
            },
        );
    }

    private _watchConnection(): void {
        this._server.on(SocketEventsEnum.CONNECTION, (socket) => {
            console.log(`Socket ${socket.id} connected.`);
            this._connectedSockets.push(socket);
        });
    }

    private _watchDesconnection(): void {
        this._server.on(SocketEventsEnum.DISCONECTION, (socket) => {
            const index = this._connectedSockets.findIndex(
                (savedSocket) => savedSocket.id === socket.id,
            );
            this._connectedSockets.splice(index, 1);
            console.log(`Socket ${socket.id} disconnected.`);
        });
    }
}
