import axios from 'axios';
import {
  REGISTER_URL,
  DEFAULT_ERROR_MESSAGE,
  DEFAULT_AXIOS_CONFIG,
} from '@/constants';

const { VUE_APP_SERVER_URL: SERVER_URL } = process.env;
const { VUE_APP_SERVER_PORT: SERVER_PORT } = process.env;

export default async function RegisterRequest(payload) {
  const url = `${SERVER_URL}:${SERVER_PORT}${REGISTER_URL}`;

  try {
    const resp = await axios.post(url, payload, DEFAULT_AXIOS_CONFIG);
    return resp.data;
  } catch (err) {
    console.log(err);
    return err?.response?.data?.message
      ? err.response.data
      : DEFAULT_ERROR_MESSAGE;
  }
}
