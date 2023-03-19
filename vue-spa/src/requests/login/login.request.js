import axios from 'axios';
import { LOGIN_URL } from '@/constants';

const { VUE_APP_SERVER_URL: SERVER_URL } = process.env;
const { VUE_APP_SERVER_PORT: SERVER_PORT } = process.env;

export default async function loginRequest(payload) {
  const url = `${SERVER_URL}:${SERVER_PORT}${LOGIN_URL}`;
  console.log(url);
  try {
    return await axios.post(url, payload, {
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    return err;
  }
}
