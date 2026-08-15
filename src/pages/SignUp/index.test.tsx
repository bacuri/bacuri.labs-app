import { fireEvent, render, waitFor } from '@testing-library/react-native';

import SignUp from '.';

import { register } from '../../services/auth/auth.service';

const mockLogin = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: mockGoBack, navigate: jest.fn() }),
}));

jest.mock('../../contexts/auth', () => ({
  useAuth: () => ({ login: mockLogin, signed: false }),
}));

jest.mock('../../services/auth/auth.service', () => ({
  register: jest.fn(),
}));

const registerMock = register as jest.Mock;

function fillSignUpForm(getByPlaceholderText: (text: string) => any) {
  fireEvent.changeText(
    getByPlaceholderText('signup.namePlaceholder'),
    'John Doe',
  );
  fireEvent.changeText(
    getByPlaceholderText('signup.emailPlaceholder'),
    'user@example.com',
  );
  fireEvent.changeText(
    getByPlaceholderText('signup.birthDatePlaceholder'),
    '15/01/1990',
  );
  fireEvent.changeText(
    getByPlaceholderText('signup.cpfPlaceholder'),
    '12345678901',
  );
  fireEvent.changeText(
    getByPlaceholderText('signup.passwordPlaceholder'),
    'secret123',
  );
  fireEvent.changeText(
    getByPlaceholderText('signup.confirmPasswordPlaceholder'),
    'secret123',
  );
}

describe('SignUp', () => {
  beforeEach(() => {
    mockLogin.mockReset();
    mockGoBack.mockReset();
    registerMock.mockReset();
  });

  it('renders all the form fields', () => {
    const { getByPlaceholderText } = render(<SignUp />);

    expect(getByPlaceholderText('signup.namePlaceholder')).toBeTruthy();
    expect(getByPlaceholderText('signup.emailPlaceholder')).toBeTruthy();
    expect(getByPlaceholderText('signup.birthDatePlaceholder')).toBeTruthy();
    expect(getByPlaceholderText('signup.cpfPlaceholder')).toBeTruthy();
    expect(getByPlaceholderText('signup.passwordPlaceholder')).toBeTruthy();
    expect(
      getByPlaceholderText('signup.confirmPasswordPlaceholder'),
    ).toBeTruthy();
  });

  it('shows a validation error when the passwords do not match', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    fireEvent.changeText(
      getByPlaceholderText('signup.passwordPlaceholder'),
      'secret123',
    );
    const confirmInput = getByPlaceholderText(
      'signup.confirmPasswordPlaceholder',
    );
    fireEvent.changeText(confirmInput, 'secret124');
    fireEvent(confirmInput, 'blur');

    await waitFor(() =>
      expect(getByText('validation.passwordsMustMatch')).toBeTruthy(),
    );
  });

  it('registers the user and logs in with the built payload', async () => {
    registerMock.mockResolvedValue({ id: 1 });
    mockLogin.mockResolvedValue(undefined);

    const { getByPlaceholderText, getByText } = render(<SignUp />);

    fillSignUpForm(getByPlaceholderText);
    fireEvent.press(getByText('signup.createAccount'));

    await waitFor(() => expect(registerMock).toHaveBeenCalled());

    expect(registerMock).toHaveBeenCalledWith({
      platform: 'APP',
      role: 'DEFAULT',
      user: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'user@example.com',
        dateOfBirth: '1990-01-15T00:00:00.000Z',
        cic: '12345678901',
        gender: 'MALE',
        password: 'secret123',
      },
    });
    expect(mockLogin).toHaveBeenCalledWith('user@example.com', 'secret123');
  });

  it('shows a general error when registration fails', async () => {
    registerMock.mockRejectedValue(new Error('registration failed'));

    const { getByPlaceholderText, getByText } = render(<SignUp />);

    fillSignUpForm(getByPlaceholderText);
    fireEvent.press(getByText('signup.createAccount'));

    await waitFor(() => expect(getByText('registration failed')).toBeTruthy());
    expect(mockLogin).not.toHaveBeenCalled();
  });
});
