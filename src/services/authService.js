import { encode } from 'base-64';
import getEnvVars from '../../environment';
import httpClient from '../lib/httpClient';

const { clientId, secret } = getEnvVars();

export async function login(email, password) {
  const data = {
    grant_type: 'password',
    username: email,
    password,
  };

  const clientToken = encode(`${clientId}:${secret}`);

  const response = await httpClient.post('/oauth/token', data, {
    headers: {
      Authorization: `Basic ${clientToken}`,
    },
  });

  return response.data.access_token;
}

export async function register(userData) {
  const response = await httpClient.post('/register', userData);
  return response.data;
}
