import { validate } from 'class-validator';
import { GenericClassDTO } from 'src/domain/interface/validator.interface';

export class PipeDTOValidator {
    public async validate<T>(
        value: Record<any, any>,
        dto: GenericClassDTO<T>,
    ): Promise<T> {
        try {
            if (typeof value === 'object') {
                const keys = Object.keys(value);
                const dtoInstance = new dto();
                keys.forEach((key) => {
                    dtoInstance[key] = value[key];
                });
                await validate(dtoInstance as object).then((errors) => {
                    if (errors.length > 0) {
                        throw new Error(
                            `invalid property "${errors[0].property}"`,
                        );
                    }
                });
                return dtoInstance;
            }

            throw new Error('invalid Object.');
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
