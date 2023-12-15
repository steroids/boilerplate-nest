
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

Пример создание пользователя и базы данных для проекта

```shell
psql postgres -c "CREATE USER \"boilerplatenest12345_admin\" WITH ENCRYPTED PASSWORD '123';"
psql postgres -c "CREATE DATABASE \"boilerplatenest12345\";"
psql postgres -c "GRANT ALL PRIVILEGES ON DATABASE \"boilerplatenest12345\" TO \"boilerplatenest12345_admin\";"
```

### 3. Настройка окружения через файл с переменными окружения `.env`

1. Скопировать файл `.env.sample` в `.env`
2. Исправить параметры по-умолчанию в файле `.env`
3. Сгенерировать уникальные строки и установить их для `AUTH_JWT_ACCESS_SECRET_KEY` и `AUTH_JWT_REFRESH_SECRET_KEY`

### 4. Запуск миграций БД

1. Создать миграции
```shell
yarn cli migrate:generate
```

2. Применить миграции
```shell
yarn cli migrate
```

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

## Healthcheck

Если приложение работает, то обращение к адресу `/api/docs` выдаст Swagger-документацию приложения

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

#### Вариант 2

1. Запустить команду для добавления конфига проекта в PM2
```shell
pm2 --name=boilerplatenest12345-nest-backend --cwd=/var/www/boilerplatenest12345 --log=/var/www/boilerplatenest12345/files/nest-backend-out.log start dist/main.js
```

2. Запустить `pm2 save` для сохранения изменений в PM2
