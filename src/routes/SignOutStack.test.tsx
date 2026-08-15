import { render } from '@testing-library/react-native';

import SignOutStack from './SignOutStack';

jest.mock('@react-navigation/stack', () => {
  const React = require('react');
  const { View } = require('react-native');

  const Navigator = ({ children }: { children: React.ReactNode }) =>
    React.createElement(View, null, children);

  const Screen = ({ name }: { name: string }) =>
    React.createElement(View, { testID: `screen-${name}` });

  return {
    __esModule: true,
    createStackNavigator: () => ({ Navigator, Screen }),
  };
});

describe('SignOutStack', () => {
  it('registers the login and sign-up screens', () => {
    const { getByTestId } = render(<SignOutStack />);

    expect(getByTestId('screen-Login')).toBeTruthy();
    expect(getByTestId('screen-SignUp')).toBeTruthy();
  });
});
