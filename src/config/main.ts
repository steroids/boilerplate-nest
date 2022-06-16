import {join} from 'path';

export default () => ({
    name: 'boilerplatenest12345',
    title: 'Boilerplate-Nest-12345',
    version: '1.0',
    port: parseInt(process.env.PORT, 10),
    database: {
        type: 'postgres',
        host: process.env.TYPEORM_HOST,
        port: parseInt(process.env.TYPEORM_PORT, 10),
        database: process.env.TYPEORM_DATABASE,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        entities: [
            join(__dirname, '../**/domain/models/*Model{.ts,.js}'),
            join(__dirname, '../**/infrastructure/tables/*Table{.ts,.js}'),
        ],
        migrations: [
            join(__dirname, '../**/infrastructure/migrations/*{.ts,.js}'),
        ],
        migrationsTableName: 'migrations',
        synchronize: false,
        migrationsRun: false,
        logging: ['schema', 'warn', 'error', 'migration'],
    },
    auth: {
        jwtSecretKey: process.env.AUTH_JWT_SECRET_KEY,
        accessTokenExpiresSec: '90d',
        refreshTokenExpiresSec: '90d',
    },
    cors: {
        allowDomains: [
            '127.0.0.1:9350',
        ],
    },
});
