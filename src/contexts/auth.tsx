import { createContext, useState, useContext, useEffect } from 'react';
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
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

  async function login(email: string, password: string) {
    const accessToken = await authLogin(email, password);
    setToken(accessToken);

    httpClient.defaults.headers.Authorization = `Bearer ${accessToken}`;

    await AsyncStorage.setItem('@BacuriLabs:token', accessToken);
  }

  async function logout() {
    setToken(null);

    await AsyncStorage.removeItem('@BacuriLabs:token');
  }

  return (
    <AuthContext.Provider value={{ signed: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}