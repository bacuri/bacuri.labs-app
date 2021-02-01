import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { encode } from 'base-64';
import getEnvVars from '../../environment';

import api from '../services/api';

const { clientId, secret } = getEnvVars();

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function loadStorageData() {
      const storagedToken = await AsyncStorage.getItem('@BacuriLabs:token');

      if (storagedToken) {
        setToken(storagedToken);

        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      }
    }

    loadStorageData();
  }, []);

  async function login(email, password) {
    const data = new FormData();
    data.append('grant_type', 'password');
    data.append('username', email);
    data.append('password', password);

    const clientToken = encode(`${clientId}:${secret}`);

    const response = await api.post('/oauth/token', data, {
      headers: {
        Authorization: `Basic ${clientToken}`,
      },
    });

    const { access_token: accessToken } = response.data;
    setToken(accessToken);

    api.defaults.headers.Authorization = `Bearer ${accessToken}`;

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
