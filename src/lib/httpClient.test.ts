import api from './httpClient';

describe('httpClient', () => {
  it('creates an axios instance with the environment api url', () => {
    expect(api.defaults.baseURL).toBe('http://localhost:3000');
  });
});
