const CREATED_CODE = 201;
const BAD_REQUEST_CODE = 400;
const UNAUTHORIZED_CODE = 401;
const FORBIDDEN_CODE = 403;
const NOT_FOUND_CODE = 404;
const CONFLICT_CODE = 409;
const INTERNAL_SERVER_ERROR_CODE = 500;

const idErrorMessage = 'Пользователь по указанному id не найден';
const emailErrorMessage = 'Пользователь с таким email уже существует';
const validationErrorMessage = 'Переданы некорректные данные';
const credentialsErrorMessage = 'Неправильные почта или пароль';
const authErrorMessage = 'Необходима авторизация';
const notFoundErrorMessage = 'Не найдено';
const serverErrorMessage = 'На сервере произошла ошибка';

module.exports = {
  CREATED_CODE,
  BAD_REQUEST_CODE,
  UNAUTHORIZED_CODE,
  FORBIDDEN_CODE,
  NOT_FOUND_CODE,
  CONFLICT_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  idErrorMessage,
  emailErrorMessage,
  validationErrorMessage,
  credentialsErrorMessage,
  authErrorMessage,
  notFoundErrorMessage,
  serverErrorMessage,
};
