import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

const Stack = createStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: '#22292F',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

function SignOutStack() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerTitle: t('routes.signUp') }}
      />
    </Stack.Navigator>
  );
}

export default SignOutStack;
