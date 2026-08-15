import { encode } from 'base-64';

import httpClient from '../../lib/httpClient';
import { login, register } from './auth.service';

jest.mock('../../lib/httpClient', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

const mockPost = httpClient.post as jest.Mock;

describe('auth.service', () => {
  beforeEach(() => {
    mockPost.mockReset();
  });

  describe('login', () => {
    it('posts credentials to /oauth/token with Basic authorization and returns the access token', async () => {
      mockPost.mockResolvedValue({ data: { access_token: 'token-123' } });

      const token = await login('user@example.com', 'secret123');

      expect(mockPost).toHaveBeenCalledWith(
        '/oauth/token',
        {
          grant_type: 'password',
          username: 'user@example.com',
          password: 'secret123',
        },
        {
          headers: {
            Authorization: `Basic ${encode('test-client:test-secret')}`,
          },
        },
      );
      expect(token).toBe('token-123');
    });
  });

  describe('register', () => {
    it('posts user data to /register and returns the response body', async () => {
      mockPost.mockResolvedValue({ data: { id: 1 } });
      const userData = { platform: 'APP', role: 'DEFAULT' };

      const result = await register(userData);

      expect(mockPost).toHaveBeenCalledWith('/register', userData);
      expect(result).toEqual({ id: 1 });
    });
  });
});
