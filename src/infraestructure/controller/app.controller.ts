import { Request, Response, Router } from 'express';
import { AppGateway } from '../gateway/app.gateway';
import { PipeDTOValidator } from '../pipes/dto.pipe';
import { SendMessageForSocketDTO } from 'src/domain/dtos/send-message-for-socket';
import { HttpStatusCode } from 'src/domain/enums/http-status-code.enum';
import { SocketEventsEnum } from 'src/domain/enums/gateway.enum';

export class AppController {
    private _validator = new PipeDTOValidator();
    constructor(private _routes: Router, private _gateway: AppGateway) {
        this._registerRoutes();
    }

    /**
     * Aqui apenas um método para verificar se a aplicação está funcionando
     */
    private _getHealth(req: Request, res: Response) {
        res.send('OK');
    }

    private async _postSendMessageForSocket(req: Request, res: Response) {
        try {
            const { event, message } = await this._validator.validate(
                req.body,
                SendMessageForSocketDTO,
            );
            this._gateway.emitData(event as SocketEventsEnum, message);

            return res.json({ message: 'Menssagem enviada com sucesso!' });
        } catch (error) {
            return res
                .status(HttpStatusCode.BAD_REQUEST)
                .json({ message: error.message });
        }
    }

    /**
     * Todo controller vai ter seu registerRoutes para poder registrar as rotas
     * no Express sempre que o controller for instanciado
     */
    private _registerRoutes(): void {
        this._routes.get('/health', this._getHealth.bind(this));
        this._routes.post(
            '/send-message-socket',
            this._postSendMessageForSocket.bind(this),
        );
    }
}
