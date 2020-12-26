import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileList from '../pages/ProfileList';
import Profile from '../pages/Profile';
import Dependent from '../pages/Dependent';

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

function SignInStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="ProfileList"
        component={ProfileList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerTitle: 'Perfil' }}
      />
      <Stack.Screen
        name="Dependent"
        component={Dependent}
        options={{ headerTitle: 'Adicionar Dependente' }}
      />
    </Stack.Navigator>
  );
}

export default SignInStack;
