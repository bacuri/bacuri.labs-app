import { fireEvent, render, waitFor } from '@testing-library/react-native';

import AddDependent from '.';

import { createDependentProfile } from '../../services/user/user.service';

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: mockGoBack, navigate: mockNavigate }),
}));

jest.mock('../../services/user/user.service', () => ({
  createDependentProfile: jest.fn(),
}));

const createDependentProfileMock = createDependentProfile as jest.Mock;

describe('AddDependent', () => {
  beforeEach(() => {
    mockGoBack.mockReset();
    mockNavigate.mockReset();
    createDependentProfileMock.mockReset();
  });

  it('renders the form fields', () => {
    const { getByPlaceholderText, getByText } = render(<AddDependent />);

    expect(getByPlaceholderText('addDependent.namePlaceholder')).toBeTruthy();
    expect(
      getByPlaceholderText('addDependent.birthDatePlaceholder'),
    ).toBeTruthy();
    expect(getByPlaceholderText('addDependent.cpfPlaceholder')).toBeTruthy();
    expect(getByText('addDependent.createDependent')).toBeTruthy();
  });

  it('creates the dependent profile with the built payload and navigates back', async () => {
    createDependentProfileMock.mockResolvedValue({ id: 9 });

    const { getByPlaceholderText, getByText } = render(<AddDependent />);

    fireEvent.changeText(
      getByPlaceholderText('addDependent.namePlaceholder'),
      'John Doe',
    );
    fireEvent.changeText(
      getByPlaceholderText('addDependent.birthDatePlaceholder'),
      '15/01/1990',
    );
    fireEvent.changeText(
      getByPlaceholderText('addDependent.cpfPlaceholder'),
      '12345678901',
    );

    fireEvent.press(getByText('addDependent.createDependent'));

    await waitFor(() => expect(createDependentProfileMock).toHaveBeenCalled());

    expect(createDependentProfileMock).toHaveBeenCalledWith({
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        cic: '12345678901',
        dateOfBirth: '1990-01-15T00:00:00.000Z',
        gender: 'MALE',
        profile: 'PATIENT',
        image: 'DEFAULT',
      },
    });
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it('shows a general error when the profile creation fails', async () => {
    createDependentProfileMock.mockRejectedValue(
      new Error('profile creation failed'),
    );

    const { getByPlaceholderText, getByText } = render(<AddDependent />);

    fireEvent.changeText(
      getByPlaceholderText('addDependent.namePlaceholder'),
      'John Doe',
    );
    fireEvent.changeText(
      getByPlaceholderText('addDependent.birthDatePlaceholder'),
      '15/01/1990',
    );
    fireEvent.changeText(
      getByPlaceholderText('addDependent.cpfPlaceholder'),
      '12345678901',
    );

    fireEvent.press(getByText('addDependent.createDependent'));

    await waitFor(() =>
      expect(getByText('profile creation failed')).toBeTruthy(),
    );
    expect(mockGoBack).not.toHaveBeenCalled();
  });
});
