import { IsNotEmpty, IsString } from 'class-validator';
import { SendMessageForSocketInterface } from '../interface/socket.interface';

export class SendMessageForSocketDTO implements SendMessageForSocketInterface {
    @IsNotEmpty()
    @IsString()
    message: string;

    @IsNotEmpty()
    @IsString()
    event: string;
}
