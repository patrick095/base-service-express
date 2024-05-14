import { HttpStatusCode } from 'src/domain/enums/http-status-code.enum';
import { AppException } from './app.exceptions';

export class DepartmentNotFoundError extends AppException {
    constructor() {
        super('Detran não encontrado', HttpStatusCode.NOT_FOUND);
    }
}
