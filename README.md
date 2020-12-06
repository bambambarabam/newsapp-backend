## Проект: NewsExplorer / REST API
---
## `Домен`
[https://newsapp.me](https://newsapp.me)

## `API`

[api.newsapp.me](https://api.newsapp.me)

### `Обзор`

Проект для поиска новостей по ключевым словам. Используется сторонний сервис по поиску новостей [NewsAPI](https://newsapi.org/) и собственный API для аутентификации пользователей и сохранения статей.

## `Технологии`

* Node.js
* Express
* MongoDB
* Celebrate middleware
* Winston logger

## `Директории`

* `/controllers` — обработчики запросов  
* `/models` — структура данных 
* `/routes` — папка с файлами роутера  
* `/middlewares` — мидлвары
* `/ errors` — модуль ошибок

## `Запуск проекта`

1. Клонировать репозиторий
2. Установить зависимости `npm install`
3. Запустить сервер `npm run start`   
4. Открыть в браузере localhost:3000
