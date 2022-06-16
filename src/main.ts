import {NestFactory, Reflector} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ConfigService} from '@nestjs/config';
import {ClassSerializerInterceptor, VersioningType} from '@nestjs/common';
import {CreateDtoPipe} from '@steroidsjs/nest/src/infrastructure/pipes/CreateDtoPipe';
import './envInit';
import {SentryInterceptor} from '@ntegral/nestjs-sentry';
import {Severity} from '@sentry/types';
import {AppModule} from './AppModule';

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

    // Serializer
    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector)),
        new SentryInterceptor({
            level: Severity.Warning,
        }),
    );

    // Start application
    const port = configService.get('port');
    await app.listen(
        port,
        () => console.log(`Server started http://localhost:${port}`), // eslint-disable-line no-console
    );
}

bootstrap();
