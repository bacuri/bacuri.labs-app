import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SWRConfig } from 'swr';
import { colors } from './src/styles';
import { AuthProvider } from './src/contexts/auth';
import Routes from './src/routes';
import { setupAxiosMocks } from './src/mocks/axiosMock';
import { i18nReady } from './src/i18n';
import httpClient from './src/lib/httpClient';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

if (__DEV__) {
  setupAxiosMocks();
}

SplashScreen.preventAutoHideAsync();

const fetcher = (url: string) => httpClient.get(url).then((res) => res.data);

export default function App() {
  const [loaded, error] = useFonts({
    Roboto_400Regular,
  });
  const [i18nLoaded, setI18nLoaded] = useState(false);

  useEffect(() => {
    i18nReady.then(() => setI18nLoaded(true));
  }, []);

  useEffect(() => {
    if ((loaded || error) && i18nLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error, i18nLoaded]);

  if (!loaded && !error) {
    return null;
  }

  if (!i18nLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SWRConfig value={{ fetcher }}>
        <NavigationContainer theme={MyTheme}>
          <StatusBar />
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </NavigationContainer>
      </SWRConfig>
    </GestureHandlerRootView>
  );
}
