import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto'; // eslint-disable-line camelcase
import { SWRConfig } from 'swr';
import { colors } from './src/styles';
import { AuthProvider } from './src/contexts/auth';
import Routes from './src/routes';
import { setupAxiosMocks } from './src/mocks/axiosMock';
import './src/i18n';
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
    // eslint-disable-next-line camelcase
    Roboto_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SWRConfig value={{ fetcher }}>
      <NavigationContainer theme={MyTheme}>
        <StatusBar />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </SWRConfig>
  );
}
