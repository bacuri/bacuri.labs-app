import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { AppLoading } from 'expo';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { colors } from './src/styles';

import { AuthProvider } from './src/contexts/auth';

import Routes from './src/routes';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
