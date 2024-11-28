import {ExceptionFilter, Catch, ArgumentsHost, HttpStatus} from '@nestjs/common';
import {Response} from 'express';
import {ValidationError} from 'class-validator';
import {ValidationException} from '@steroidsjs/nest/usecases/exceptions/ValidationException';
import {IErrorsCompositeObject} from '@steroidsjs/nest/usecases/interfaces/IErrorsCompositeObject';

// @todo переделать на наследование существующего ValidationExceptionFilter
@Catch(ValidationException)
export class ValidationExceptionFilterCustom implements ExceptionFilter {
    async parseErrors(errors: IErrorsCompositeObject | ValidationError[], contextLanguage: string): Promise<IErrorsCompositeObject> {
        if (!Array.isArray(errors)) {
            return errors;
        }

        return errors.reduce(
            async (result: any, error: ValidationError): Promise<IErrorsCompositeObject> => {
                if (error.children && error.children.length > 0) {
                    result[error.property] = this.parseErrors(error.children, contextLanguage);
                    return result;
                }

                if (!error.constraints) {
                    return result;
                }

                result[error.property] = Object.values(error.constraints);

                return result;
            },
            {},
        );
    }

    async catch(exception: ValidationException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const errors = await this.parseErrors(exception.errors, ctx.getRequest().i18nLang);

        response
            .status(HttpStatus.OK)
            .json({
                statusCode: HttpStatus.BAD_REQUEST,
                errors,
            });
    }
}
