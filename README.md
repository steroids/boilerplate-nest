
# Boilerplate-Nest-12345

## Развертывание нового приложения на основе boilerplate

### 1. Скопировать в отдельную папку всё содержимое, кроме папки .git
### 2. Заменить временные строки

Во всем проекте, включая этот файл, замени с учетом регистра на имя проекта:

1. Для человеко-понятного названия: `Boilerplate-Nest-12345`
2. Для короткого названия, для ссылок: `boilerplatenest12345`

### 3. Добавить проект в новый репозиторий

### 4. Удалить раздел "Развертывание нового приложения на основе boilerplate" из этого README.md

## Install

### 1. Install dependencies

```shell
yarn
```

### 2. Setup database

Sample install script

```shell
psql postgres -c "CREATE USER \"boilerplatenest12345_admin\" WITH ENCRYPTED PASSWORD '123';"
psql postgres -c "CREATE DATABASE \"boilerplatenest12345\";"
psql postgres -c "GRANT ALL PRIVILEGES ON DATABASE \"boilerplatenest12345\" TO \"boilerplatenest12345_admin\";"
```

### 3. Configure local workplace via `.env`

1. Correct default parameters if needed
2. Generate unique string for `AUTH_JWT_SECRET_KEY`

### 4. Apply migrations

```shell
yarn cli migrate
```

## Start

### Development mode

```shell
yarn start:dev
```
or
```shell
yarn start:debug
```

### Production mode

1. Build

```shell
yarn build
```
2. Start

```shell
yarn start:prod
```

## CI/CD

### Настройка выгрузки Gitlab

1. Настроить на сервере базу данных
2. Создать папку проекта, в ней папку config
3. В этой папке заполнить файл `.env` нужными значениями переменных
4. Скопировать файл `.gitlab-ci.sample.yml` в `.gitlab-ci.yml`
5. Файл `.gitlab-ci.yml` проверить на корректность, закомментировать перезапуск процесса PM2
6. Запустить выгрузку
7. Установить процесс в PM2 (см. пункт нижу)
8. В файле `.gitlab-ci.yml` раскомментировать перезапуск процесса PM2

### Установка на сервере в PM2

```shell
pm2 --name=boilerplatenest12345_nest --instances=2 --cwd=/var/www/boilerplatenest12345-nest/www-master --log=../files/node-dev-nest.log start dist/main.js
```