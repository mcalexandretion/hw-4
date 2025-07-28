Этот проект представляет собой веб-приложение для управления пользователями с авторизацией

Фронтенд реализован с использованием React, Redux Toolkit, TypeScript и Feature-Sliced Design, а бэкенд — на NestJS с использованием JWT для авторизации. Приложение позволяет авторизованным пользователям просматривать, создавать, редактировать и удалять профили пользователей.  
## Описание проекта
Приложение состоит из двух частей:

* **Фронтенд**: SPA (Single Page Application) на React, обеспечивающее интерфейс для авторизации, управления пользователями и навигации.
* **Бэкенд**: REST API на NestJS, предоставляющее эндпоинты для авторизации (/api/v1/auth) и управления пользователями (/api/v1/users).

Основные функции:

- Авторизация и выход из системы (логин/логаут).
- Проверка статуса авторизации при загрузке приложения.
- Просмотр списка пользователей, создание, редактирование и удаление профилей.
- Отображение пользовательских ошибок (например, "Неверный email или пароль").

## Структура проекта
Фронтенд (frontend/src/)
Организован по принципам Feature-Sliced Design для модульности и масштабируемости:

* app/:
  * App.tsx: Главный компонент с маршрутизацией и проверкой авторизации.
  * store/: Redux store и слайсы.
    * index.ts: Конфигурация Redux store.
    * slices/authSlice.ts: Управление состоянием авторизации (логин, логаут, проверка статуса).
    * slices/usersSlice.ts: Управление списком пользователей (CRUD операции).
* entities/:
  * user/:
    * index.ts: Экспорт сущности пользователя.
    * model/types.ts: TypeScript-типы для пользователя (например, IUser).
* features/:
  * auth/:
    * model/:
      * api.ts: API-запросы для авторизации (логин, логаут, проверка статуса).
      * types.ts: Типы для данных авторизации (например, LoginForm).
  * user/:
    * model/:
      * api.ts: API-запросы для управления пользователями (CRUD).
      * types.ts: Типы для API-запросов пользователей (например, UserCreateDto).
* pages/:
  * Home/:
      * ui/Home.tsx: Главная страница для авторизованных пользователей.
      * ui/Home.module.css: Стили для главной страницы.
  * Login/:
      * ui/Login.tsx: Страница авторизации с формой и обработкой ошибок.
      * ui/Login.module.css: Стили для формы логина.
  * UserCreate/:
      * ui/UserCreate.tsx: Страница создания пользователя.
      * ui/UserCreate.module.css: Стили для формы создания.
  * UserEdit/:
      * ui/UserEdit.tsx: Страница редактирования пользователя.
      * ui/UserEdit.module.css: Стили для формы редактирования.
* shared/:
  * api/:
      * instance.ts: Конфигурация HTTP-клиента (например, Axios) для API-запросов.
  * ui/:
      * Button/: Компонент кнопки (Button.tsx, Button.module.css).
      * Header/: Компонент шапки (Header.ts, Header.module.css).
      * Input/: Компонент поля ввода (Input.tsx, Input.module.css).
      * Layout/: Компонент макета (Layout.tsx, Layout.module.css).
      * Navigation/: Компонент навигации (Navigation.ts, Navigation.module.css).
      * Select/: Компонент выпадающего списка (Select.ts, Select.module.css).
      * types/:
* index.ts: Глобальные TypeScript-типы (например, RootState, AppDispatch).

## Технологии
Фронтенд
* **React**: Библиотека для создания UI.
* **Redux Toolkit**: Управление состоянием (авторизация, пользователи).
* **React Router**: Навигация и защищённые маршруты.
* **React Hook Form**: Управление формами.
* **TypeScript**: Статическая типизация.
* **Vite**: Сборщик и dev-сервер с прокси для обхода CORS.
* **Feature-Sliced Design**: Архитектура для масштабируемости.
* **CSS Modules**: Стилизация компонентов.

## Установка и запуск
1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd hw-4
```
2. Фронтенд:
```bash
cd frontend
npm install
npm run dev
```
Приложение будет доступно на` http://localhost:5173`.
Vite настроен с прокси для `/api/v1` на `http://localhost:4000`.  
3. Бэкенд:
```bash
cd backend
npm install
npm start
```
API будет доступно на `http://localhost:4000`.
Swagger-документация: `http://localhost:4000/api`.
