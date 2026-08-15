import { fireEvent, render, waitFor } from '@testing-library/react-native';

import Login from '.';

const mockLogin = jest.fn();
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

jest.mock('../../contexts/auth', () => ({
  useAuth: () => ({ login: mockLogin, signed: false }),
}));

describe('Login', () => {
  beforeEach(() => {
    mockLogin.mockReset();
    mockNavigate.mockReset();
  });

  it('renders the email, password and submit button', () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    expect(getByPlaceholderText('login.emailPlaceholder')).toBeTruthy();
    expect(getByPlaceholderText('login.passwordPlaceholder')).toBeTruthy();
    expect(getByText('login.submit')).toBeTruthy();
  });

  it('does not submit while the form is invalid', async () => {
    const { getByText } = render(<Login />);

    fireEvent.press(getByText('login.submit'));

    await waitFor(() => expect(mockLogin).not.toHaveBeenCalled());
  });

  it('shows a validation error for an invalid email after blur', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<Login />);

    const emailInput = getByPlaceholderText('login.emailPlaceholder');

    fireEvent.changeText(emailInput, 'not-an-email');
    fireEvent(emailInput, 'blur');

    await waitFor(() =>
      expect(getByText('validation.emailInvalid')).toBeTruthy(),
    );
    expect(queryByText('validation.emailRequired')).toBeNull();
  });

  it('shows a validation error for a short password after blur', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    const passwordInput = getByPlaceholderText('login.passwordPlaceholder');

    fireEvent.changeText(passwordInput, '123');
    fireEvent(passwordInput, 'blur');

    await waitFor(() =>
      expect(getByText('validation.passwordMin')).toBeTruthy(),
    );
  });

  it('submits the credentials on a valid form', async () => {
    mockLogin.mockResolvedValue(undefined);

    const { getByPlaceholderText, getByText } = render(<Login />);

    fireEvent.changeText(
      getByPlaceholderText('login.emailPlaceholder'),
      'user@example.com',
    );
    fireEvent.changeText(
      getByPlaceholderText('login.passwordPlaceholder'),
      'secret123',
    );

    fireEvent.press(getByText('login.submit'));

    await waitFor(() =>
      expect(mockLogin).toHaveBeenCalledWith('user@example.com', 'secret123'),
    );
  });

  it('submits the credentials when the password field is submitted', async () => {
    mockLogin.mockResolvedValue(undefined);

    const { getByPlaceholderText } = render(<Login />);

    fireEvent.changeText(
      getByPlaceholderText('login.emailPlaceholder'),
      'user@example.com',
    );
    const passwordInput = getByPlaceholderText('login.passwordPlaceholder');
    fireEvent.changeText(passwordInput, 'secret123');

    fireEvent(passwordInput, 'submitEditing');

    await waitFor(() =>
      expect(mockLogin).toHaveBeenCalledWith('user@example.com', 'secret123'),
    );
  });

  it('navigates to the sign up page when the create account link is pressed', () => {
    const { getByText } = render(<Login />);

    fireEvent.press(getByText('login.createAccountNow'));

    expect(mockNavigate).toHaveBeenCalledWith('SignUp');
  });

  it('shows the invalid credentials error when login rejects with invalid_grant', async () => {
    mockLogin.mockRejectedValue({
      response: { data: { error: 'invalid_grant' } },
    });

    const { getByPlaceholderText, getByText } = render(<Login />);

    fireEvent.changeText(
      getByPlaceholderText('login.emailPlaceholder'),
      'user@example.com',
    );
    fireEvent.changeText(
      getByPlaceholderText('login.passwordPlaceholder'),
      'secret123',
    );

    fireEvent.press(getByText('login.submit'));

    await waitFor(() =>
      expect(getByText('validation.invalidCredentials')).toBeTruthy(),
    );
  });
});
