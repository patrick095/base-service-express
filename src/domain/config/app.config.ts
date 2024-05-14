import 'dotenv/config';

export class AppConfig {
    public get port(): number {
        return process.env.PORT ? Number(process.env.PORT) : 3000;
    }
}
