const CREATED_CODE = 201;
const BAD_REQUEST_CODE = 400;
const UNAUTHORIZED_CODE = 401;
const FORBIDDEN_CODE = 403;
const NOT_FOUND_CODE = 404;
const CONFLICT_CODE = 409;
const INTERNAL_SERVER_ERROR_CODE = 500;

const ID_ERR_MESSAGE = 'Пользователь по указанному id не найден';
const EMAIL_ERR_MESSAGE = 'Пользователь с таким email уже существует';
const VALIDATION_ERR_MESSAGE = 'Переданы некорректные данные';
const CREDENTIALS_ERR_MESSAGE = 'Неправильные почта или пароль';
const FORBIDDEN_ERR_MESSAGE = 'Доступ к запрошенному ресурсу запрещён';
const AUTH_ERR_MESSAGE = 'Необходима авторизация';
const NOT_FOUND_ERR_MESSAGE = 'Не найдено';
const SERVER_ERR_MESSAGE = 'На сервере произошла ошибка';
const SUCCESSFUL_EXIT_MESSAGE = 'Пользователь успешно вышел из системы';

const REGEXP = /https?:\/\/(www)?[a-z0-9-]+\.[a-z0-9\S]{2,}/;

module.exports = {
  CREATED_CODE,
  BAD_REQUEST_CODE,
  UNAUTHORIZED_CODE,
  FORBIDDEN_CODE,
  NOT_FOUND_CODE,
  CONFLICT_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  ID_ERR_MESSAGE,
  EMAIL_ERR_MESSAGE,
  VALIDATION_ERR_MESSAGE,
  CREDENTIALS_ERR_MESSAGE,
  FORBIDDEN_ERR_MESSAGE,
  AUTH_ERR_MESSAGE,
  NOT_FOUND_ERR_MESSAGE,
  SERVER_ERR_MESSAGE,
  REGEXP,
  SUCCESSFUL_EXIT_MESSAGE,
};
