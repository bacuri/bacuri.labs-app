import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { render, waitFor, act, fireEvent } from '@testing-library/react-native';

import httpClient from '../lib/httpClient';
import { login as authLogin } from '../services/auth/auth.service';
import { AuthProvider, useAuth } from './auth';

jest.mock('../lib/httpClient', () => ({
  __esModule: true,
  default: {
    defaults: { headers: {} },
    get: jest.fn(),
    post: jest.fn(),
  },
}));

jest.mock('../services/auth/auth.service', () => ({
  login: jest.fn(),
}));

const mockedAuthLogin = authLogin as jest.Mock;
const mockedGetItem = AsyncStorage.getItem as jest.Mock;
const mockedSetItem = AsyncStorage.setItem as jest.Mock;
const mockedRemoveItem = AsyncStorage.removeItem as jest.Mock;

const headers = httpClient.defaults.headers as Record<string, unknown>;

function Consumer() {
  const { signed, login, logout } = useAuth();

  return (
    <>
      <Text>{signed ? 'signed-in' : 'signed-out'}</Text>
      <Text onPress={() => login('user@example.com', 'secret123')}>
        login-action
      </Text>
      <Text onPress={() => logout()}>logout-action</Text>
    </>
  );
}

function renderAuth() {
  return render(
    <AuthProvider>
      <Consumer />
    </AuthProvider>,
  );
}

describe('AuthProvider', () => {
  beforeEach(() => {
    mockedAuthLogin.mockReset();
    mockedGetItem.mockReset();
    mockedSetItem.mockReset();
    mockedRemoveItem.mockReset();
    delete headers.Authorization;
  });

  it('starts signed out when no token is stored', async () => {
    mockedGetItem.mockResolvedValue(null);

    const { getByText } = renderAuth();

    await waitFor(() => expect(getByText('signed-out')).toBeTruthy());
  });

  it('restores the stored token and sets the Authorization header on mount', async () => {
    mockedGetItem.mockResolvedValue('stored-token');

    const { getByText } = renderAuth();

    await waitFor(() => expect(getByText('signed-in')).toBeTruthy());
    expect(headers.Authorization).toBe('Bearer stored-token');
  });

  it('logs in by persisting the token and setting the Authorization header', async () => {
    mockedAuthLogin.mockResolvedValue('new-token');
    mockedGetItem.mockResolvedValue(null);

    const { getByText } = renderAuth();
    await waitFor(() => expect(getByText('signed-out')).toBeTruthy());

    await act(async () => {
      fireEvent.press(getByText('login-action'));
    });

    expect(mockedAuthLogin).toHaveBeenCalledWith(
      'user@example.com',
      'secret123',
    );
    expect(mockedSetItem).toHaveBeenCalledWith(
      '@BacuriLabs:token',
      'new-token',
    );
    expect(headers.Authorization).toBe('Bearer new-token');
    expect(getByText('signed-in')).toBeTruthy();
  });

  it('logs out by removing the stored token', async () => {
    mockedAuthLogin.mockResolvedValue('new-token');
    mockedGetItem.mockResolvedValue(null);

    const { getByText } = renderAuth();
    await waitFor(() => expect(getByText('signed-out')).toBeTruthy());

    await act(async () => {
      fireEvent.press(getByText('login-action'));
    });
    await act(async () => {
      fireEvent.press(getByText('logout-action'));
    });

    expect(mockedRemoveItem).toHaveBeenCalledWith('@BacuriLabs:token');
    expect(getByText('signed-out')).toBeTruthy();
  });
});
