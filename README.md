# Авторизация

Проект направлен на реализацию полного цикла авторизации пользователя с использованием JWT и подтверждением аккаунта через почту.

## Содержание
- [Технологии](#технологии)
- [Разработка](#разработка)

## Технологии
Frontend:
- [React](https://react.dev)
- [axios](https://axios-http.com)
- [TypeScript](https://www.typescriptlang.org)
- [MobX](https://mobx.js.org/README.html)
- [react-router-dom](https://reactrouter.com/en/main)
- [styled-components](https://styled-components.com/docs)

  Backend:
- [Express](https://expressjs.com)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [cookie-parser](https://github.com/expressjs/cookie-parser)
- [express-validator](https://github.com/express-validator/express-validator)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [mysql2](https://github.com/sidorares/node-mysql2)
- [nodemailer](https://github.com/nodemailer/nodemailer)
- [nodemon](https://nodemon.io)

## Разработка

### Требования
Для установки и запуска проекта, необходим установленный [Node js](https://nodejs.org/en).

### Установка зависимостей
Перейдите в директорию ```/client```. И установите необходимые зависимости командой:
```
npm i
```
Далее проделайте ту же операцию в директории ```/server```.

### Перед запуском
Перед запуском проекта, создайте файл ```.env``` в корне директории ```/server``` следующего вида:
```
PORT=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
SMTP_SERVICE=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
API_URL=
CLIENT_URL=

#DATABASE
HOST=
DB_USER=
PASSWORD=
DATABASE=
```
Заполните пустые поля вашими данными.

После этого, необходимо создать [MySQL](https://dev.mysql.com/doc/) базу данных и создать две таблицы вручную:
```
CREATE TABLE user (
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      isActivated BOOLEAN DEFAULT FALSE,
      activationLink VARCHAR(255),
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE token (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    refreshToken VARCHAR(255) NOT NULL,
    userId INT NOT NULL UNIQUE
);
```

### Запуск Development сервера
Чтобы запустить сервера (Front и Back) для разработки, в директории ```/server``` выполните следущую команду:
```
npm run dev
```
И в директории ```/client```:
```
npm start
```

## Команда проекта

- [Я](https://telegram.me/dimcheify)