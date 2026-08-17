import { render } from '@testing-library/react-native';

import SignInStack from './SignInStack';

jest.mock('@react-navigation/native-stack', () => {
  const React = require('react');
  const { View } = require('react-native');

  const Navigator = ({ children }: { children: React.ReactNode }) =>
    React.createElement(View, null, children);

  const Screen = ({ name }: { name: string }) =>
    React.createElement(View, { testID: `screen-${name}` });

  return {
    __esModule: true,
    createNativeStackNavigator: () => ({ Navigator, Screen }),
  };
});

describe('SignInStack', () => {
  it('registers all the sign-in screens with translated headers', () => {
    const { getByTestId } = render(<SignInStack />);

    expect(getByTestId('screen-ProfileList')).toBeTruthy();
    expect(getByTestId('screen-Dependent')).toBeTruthy();
    expect(getByTestId('screen-MyVaccines')).toBeTruthy();
    expect(getByTestId('screen-AddDependent')).toBeTruthy();
    expect(getByTestId('screen-ApplyVaccine')).toBeTruthy();
    expect(getByTestId('screen-Campaigns')).toBeTruthy();
    expect(getByTestId('screen-CampaignDetail')).toBeTruthy();
    expect(getByTestId('screen-CampaignMap')).toBeTruthy();
  });
});
