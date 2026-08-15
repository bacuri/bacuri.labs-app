import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ReactNode } from 'react';

import httpClient from '../lib/httpClient';
import { login as authLogin } from '../services/auth/auth.service';

interface AuthContextData {
  signed: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function loadStorageData() {
      const storagedToken = await AsyncStorage.getItem('@BacuriLabs:token');

      if (storagedToken) {
        setToken(storagedToken);

        httpClient.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      }
    }

    loadStorageData();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const accessToken = await authLogin(email, password);
    setToken(accessToken);

    httpClient.defaults.headers.Authorization = `Bearer ${accessToken}`;

    await AsyncStorage.setItem('@BacuriLabs:token', accessToken);
  }, []);

  const logout = useCallback(async () => {
    setToken(null);

    await AsyncStorage.removeItem('@BacuriLabs:token');
  }, []);

  const value = useMemo(
    () => ({ signed: !!token, login, logout }),
    [token, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
