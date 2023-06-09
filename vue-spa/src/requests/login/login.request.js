import axios from 'axios';
import {
  LOGIN_URL,
  DEFAULT_ERROR_MESSAGE,
  DEFAULT_AXIOS_CONFIG,
} from '@/constants';

const { VUE_APP_SERVER_URL: SERVER_URL } = process.env;
const { VUE_APP_SERVER_PORT: SERVER_PORT } = process.env;

/**
 * Request during user login. If successful also returns user object
 *
 * @param {object} payload
 * @returns {Promise<*|{message: string, status: string, user?: object}>}
 */
export default async function loginRequest(payload) {
  const url = `${SERVER_URL}:${SERVER_PORT}${LOGIN_URL}`;

  try {
    const resp = await axios.post(url, payload, DEFAULT_AXIOS_CONFIG);
    return resp.data;
  } catch (err) {
    return err?.response?.data ? err.response.data : DEFAULT_ERROR_MESSAGE;
  }
}
