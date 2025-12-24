import httpClient from '../lib/httpClient';

export async function getUser() {
  const response = await httpClient.get('/user');
  return response.data;
}

export async function createDependentProfile(profileData) {
  const response = await httpClient.post('/dependent-profile', profileData);
  return response.data;
}
