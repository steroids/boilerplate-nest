import {NestFactory, Reflector} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ConfigService} from '@nestjs/config';
import {VersioningType} from '@nestjs/common';
import {CreateDtoPipe} from '@steroidsjs/nest/src/infrastructure/pipes/CreateDtoPipe';
import './envInit';
import {AppModule} from './AppModule';
import {JwtAuthGuard} from './auth/infrastructure/guards/JwtAuthGuard';
import {ISessionService} from './auth/domain/interfaces/ISessionService';
import {AuthService} from './auth/domain/services/AuthService';
import {ValidationExceptionFilter} from '@steroidsjs/nest/src/infrastructure/filters/ValidationExceptionFilter';
import {UserExceptionFilter} from '@steroidsjs/nest/src/infrastructure/filters/UserExceptionFilter';
import {SentryExceptionFilter} from './SentryExceptionFilter';
import {SchemaSerializer} from './SchemaSerializer';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    // Swagger config
    const swaggerConfig = new DocumentBuilder()
        .setTitle(configService.get('title') || 'Application')
        .setDescription('Документация REST API')
        .setVersion(configService.get('version') || '1.0')
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/api/docs', app, document);

    // Versioning
    app.setGlobalPrefix('/api/v1');
    app.enableVersioning({
        type: VersioningType.URI,
    });

    // Cors
    const origin = [];
    (configService.get('cors.allowDomains') || []).forEach(domain => {
        if (domain.indexOf('://') !== -1) {
            origin.push(domain);
        } else {
            origin.push('https://' + domain);
            origin.push('http://' + domain);
        }
    });
    app.enableCors({
        credentials: true,
        origin,
        methods: (configService.get('cors.allowMethods') || [
            'POST',
            'PUT',
            'GET',
            'OPTIONS',
            'DELETE',
        ]),
        allowedHeaders: configService.get('cors.allowHeaders') || [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'Authorization',
            'X-CSRF-Token',

            // For file PUT upload
            'If-None-Match',
            'If-Modified-Since',
            'Cache-Control',
            'X-Requested-With',
            'Content-Disposition',
            'Content-Range',
        ],
    });

    // Validation
    app.useGlobalPipes(new CreateDtoPipe());
    app.useGlobalFilters(new ValidationExceptionFilter());
    app.useGlobalFilters(new UserExceptionFilter());

    if (process.env.APP_SENTRY_DSN) {
        app.useGlobalFilters(new SentryExceptionFilter());
    }

    app.useGlobalInterceptors(
        new SchemaSerializer(app.get(Reflector)),
    );

    // Guards
    app.useGlobalGuards(new JwtAuthGuard(app.get(ISessionService), app.get(AuthService)));

    // Start application
    const port = configService.get('port');
    await app.listen(
        port,
        () => console.log(`Server started http://localhost:${port}`), // eslint-disable-line no-console
    );
}

bootstrap();
