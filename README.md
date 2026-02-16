
# Boilerplate-Nest-12345

## Развертывание нового приложения на основе boilerplate

### 1. Скопировать в отдельную папку всё содержимое, кроме папки .git
### 2. Заменить временные строки

Во всем проекте, включая этот файл, заменить (с учетом регистра):

1. Строку `Boilerplate-Nest-12345` на название проекта в человеко-читаемом виде
2. Строку `boilerplatenest12345` на название проекта в gitlab - для путей в файловой системе, для ссылок и пр.

### 3. Добавить проект в новый репозиторий

### 4. Удалить раздел "Развертывание нового приложения на основе boilerplate" из этого README.md

## Установка и настройка

### 1. Установка зависимостей

```shell
yarn
```

### 2. Настройка базы данных

Пример создания пользователя и базы данных для проекта

1. Создание пользователя и БД
```shell
su postgres -c "createuser -h postgres boilerplatenest12345_admin && createdb -h postgres boilerplatenest12345"
```

2. Установка пароля и выдача прав
```shell
psql -U postgres -h postgres -c "alter user \"boilerplatenest12345_admin\" with encrypted password '123'; grant all privileges on database \"boilerplatenest12345\" to \"boilerplatenest12345_admin\";"
```

### 3. Настройка окружения через файл с переменными окружения `.env`

1. Скопировать файл `.env.sample` в `.env`
2. Исправить параметры по-умолчанию в файле `.env`
3. Сгенерировать уникальные строки и установить их для `AUTH_JWT_ACCESS_SECRET_KEY` и `AUTH_JWT_REFRESH_SECRET_KEY`

### 4. Добавить допустимые для CORS домены

В `src/main.ts` для конфигурации `IRestAppModuleConfig` в массив `cors.allowDomains` добавить домены, которые будут
иметь возможность совершать cross-origin запросы. Обычно это нужно для разработки, и указываются там домены
frontend, frontend-admin и других сервисов.

### 5. Запуск миграций БД

1. Создать миграции
```shell
yarn cli migrate:generate
```

2. Применить миграции
```shell
yarn cli migrate
```

### Ограничение доступа к файлам
Пример конфигурации nginx
```
location /files/ {
    auth_request /internal/files/auth;
    alias /var/www/files/;
}

location /internal/files/auth {
    internal;
    proxy_pass http://host.docker.internal:9669/internal/file/check-access;
    proxy_set_header X-Original-URI $request_uri;
    proxy_set_header Authorization $http_authorization;
    proxy_set_header Cookie $http_cookie;
}
```
`auth_request` говорит nginx-у сделать подзапрос по указанному пути для проверки, можно ли обработать исходный запрос.
В зависимости от кода ответа подзапроса:
- 2xx - доступ разрешен
- 401 или 403 - доступ запрещен с соответствующим кодом
- остальные коды - считаются ошибкой, вернется 500

Сделать сервис, реализующий `IFileAccessChecker` для проверки доступа и добавить его в модуль
```
{
    provide: FILE_ACCESS_CHECKER,
    useClass: FileAccessCheckerService,
},
```
По умолчанию используется `AllowAllFileAccessChecker` который всегда разрешает доступ

## Запуск приложения

### Режим разработки

```shell
yarn start:dev
```
или
```shell
yarn start:debug
```

### Режим production

1. Сборка

```shell
yarn build
```
2. Запуск

```shell
yarn start:prod
```

## Тестирование

В проект уже включен фреймворк для тестирования jest. Для запуска тестов используется команда:
```shell
npx run test
```

Также в проекте в файле AGENTS.md описаны правила создания тестов для ИИ-агентов. А, значит, можно использовать их
для создания тестов, максимально соответствующих принятым в проекте стандартам.

## Healthcheck

Эндпоинт для проверки работоспособности: `GET /api/v1/health` (указан в Swagger'е)

## Метрики

Приложение может отдавать [стандартные метрики NodeJS](https://github.com/siimon/prom-client?tab=readme-ov-file#default-metrics)
в формате Prometheus. Метрики отдаются по адресу `GET /api/v1/metrics`.

В Grafana просматривать метрики можно на [NodeJS Application Dashboard](https://grafana.com/grafana/dashboards/11159-nodejs-application-dashboard/)

Доступ к эндпоинту защищен токеном. Для того чтобы включить отдачу метрик, необходимо добавить переменную окружения
`APP_METRICS_TOKEN` с уникальной сгенерированной строкой. В дальнейшем эту же строку нужно использовать при
конфигурации Prometheus для получения метрик с приложения.

Пример конфигурации Prometheus для получения метрик, с учетом того, что Prometheus в Docker, NodeJS приложение
работает на порту 9360 в хост системе, а ключ `APP_METRICS_TOKEN` равен `vXsNqGs3VvGQ5eA8fDfu`:
```yaml
  - job_name: 'nodejs-app'
    metrics_path: '/api/v1/metrics'
    authorization:
        credentials: 'vXsNqGs3VvGQ5eA8fDfu'
    static_configs:
      - targets: ['host.docker.internal:9360']
```

## Выгрузка и запуск на сервере

### Настройка выгрузки на dev 

1. Настроить на сервере базу данных
2. Создать папку проекта, в ней папку config
3. В этой папке заполнить файл `.env` нужными значениями переменных
4. Переименовать файл `.gitlab-ci.sample.yml` в `.gitlab-ci.yml`
5. Файл `.gitlab-ci.yml` проверить на корректность, закомментировать перезапуск процесса PM2
6. Запустить выгрузку
7. Установить процесс в PM2 (см. пункт нижу)
8. В файле `.gitlab-ci.yml` раскомментировать перезапуск процесса PM2

### Настройка выгрузки на prod

1. Раскомментировать относящиеся к prod блоки в `.gitlab-ci.yml`
2. Откорректировать их при необходимости

### Установка на сервере в PM2

#### Вариант 1 (предпочтительный)

1. Скопировать `./ecosystem.config.sample.js` в файл `ecosystem.config.js` папку config на сервере
2. Отредактировать при необходимости
3. Запустить `pm2 start ecosystem.config.js` для добавления конфига проекта в PM2
4. Запустить `pm2 save` для сохранения изменений в PM2

В случае если `ecosystem.config.js` уже существует, нужно конфигурацию текущего приложения добавить в этот существующий файл, в массив `module.exports.apps`.

#### Вариант 2

1. Запустить команду для добавления конфига проекта в PM2
```shell
pm2 --name=boilerplatenest12345-nest-backend --cwd=/var/www/boilerplatenest12345 --log=/var/www/boilerplatenest12345/files/nest-backend-out.log start dist/main.js
```

2. Запустить `pm2 save` для сохранения изменений в PM2

## Запуск в Docker

Имеющийся в корне `docker-compose.yml` позволяет запустить в docker-контейнерах приложение и БД, а также
выполнять команды по генерации миграций, применению миграций и пр.

### Установка nodejs-библиотек
```shell
docker compose run --rm --no-deps node-app yarn
```

### Запуск в режиме разработчика (watch mode)
```shell
docker compose --profile dev-mode up
```

### Генерация миграций
```shell
docker compose run --rm node-app npm run migrate:generate
```

### Применение миграций
```shell
docker compose run --rm node-app npm run migrate
```

### Сборка прод-версии
```shell
docker compose run --rm --no-deps node-app npm run build
```

### Запуск собранной прод-версии
```shell
docker compose up
```
