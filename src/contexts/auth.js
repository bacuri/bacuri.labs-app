import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import httpClient from '../lib/httpClient';
import { login as authLogin } from '../services/authService';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

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

  async function login(email, password) {
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
