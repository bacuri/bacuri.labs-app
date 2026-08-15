import { render } from '@testing-library/react-native';

import Routes from '.';

const mockSigned = { current: false };

jest.mock('../contexts/auth', () => ({
  useAuth: () => ({ signed: mockSigned.current }),
}));

jest.mock('./SignOutStack', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return function MockSignOutStack() {
    return React.createElement(Text, null, 'SignOutStack');
  };
});

jest.mock('./SignInStack', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return function MockSignInStack() {
    return React.createElement(Text, null, 'SignInStack');
  };
});

describe('Routes', () => {
  it('renders the sign-out stack when the user is signed out', () => {
    mockSigned.current = false;

    const { getByText } = render(<Routes />);

    expect(getByText('SignOutStack')).toBeTruthy();
  });

  it('renders the sign-in stack when the user is signed in', () => {
    mockSigned.current = true;

    const { getByText } = render(<Routes />);

    expect(getByText('SignInStack')).toBeTruthy();
  });
});
