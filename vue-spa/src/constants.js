export const APP_NAME = 'super-chat-spa';

export const LOGIN_URL = '/user/login';
export const REGISTER_URL = '/user/register';

export const DEFAULT_ERROR_MESSAGE = {
  status: 'error',
  message: 'something went wrong',
};

export const DEFAULT_AXIOS_CONFIG = {
  mode: 'no-cors',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
};
