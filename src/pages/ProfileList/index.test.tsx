import { ActivityIndicator } from 'react-native';
import { act, fireEvent, waitFor } from '@testing-library/react-native';

import ProfileList, { createRows } from '.';
import { renderWithSWR } from '../../testUtils';

import { getUser } from '../../services/user/user.service';
import type { UserResponse } from '../../services/user/user.service';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
  useIsFocused: () => true,
}));

jest.mock('../../services/user/user.service', () => ({
  getUser: jest.fn(),
}));

jest.mock('../../contexts/auth', () => ({
  useAuth: () => ({ logout: jest.fn(), signed: true }),
}));

const mockedGetUser = getUser as jest.Mock;

describe('createRows', () => {
  it('keeps a full last row as-is', () => {
    const rows = createRows([{ id: 1 }, { id: 2 }, { addButton: true }], 3);

    expect(rows).toEqual([{ id: 1 }, { id: 2 }, { addButton: true }]);
  });

  it('pads the last row with empty placeholders', () => {
    const rows = createRows([{ id: 1 }, { addButton: true }], 3);

    expect(rows).toEqual([
      { id: 1 },
      { addButton: true },
      { id: 'empty-2', name: 'empty-2', empty: true },
    ]);
  });

  it('fills a grid that only contains the add button', () => {
    const rows = createRows([{ addButton: true }], 3);

    expect(rows).toHaveLength(3);
    expect(rows).toEqual([
      { addButton: true },
      { id: 'empty-1', name: 'empty-1', empty: true },
      { id: 'empty-2', name: 'empty-2', empty: true },
    ]);
  });
});

describe('ProfileList', () => {
  beforeEach(() => {
    mockedGetUser.mockReset();
    mockNavigate.mockReset();
  });

  it('shows a loading indicator while fetching', async () => {
    let resolveUser: ((value: UserResponse) => void) | undefined;
    mockedGetUser.mockImplementation(
      () =>
        new Promise<UserResponse>((resolve) => {
          resolveUser = resolve;
        }),
    );

    const { UNSAFE_getByType } = renderWithSWR(<ProfileList />);

    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();

    await act(async () => {
      resolveUser?.({ content: { dependentProfiles: [] } });
    });
  });

  it('renders the dependent profiles once loaded', async () => {
    mockedGetUser.mockResolvedValue({
      content: {
        dependentProfiles: [{ id: 1, firstName: 'John', lastName: 'Doe' }],
      },
    });

    const { getByText } = renderWithSWR(<ProfileList />);

    await waitFor(() => expect(getByText('John Doe')).toBeTruthy());
  });

  it('shows an error page and reloads on retry', async () => {
    mockedGetUser.mockRejectedValue(new Error('network error'));

    const { getByText } = renderWithSWR(<ProfileList />);

    await waitFor(() =>
      expect(getByText('profileList.reloadButton')).toBeTruthy(),
    );

    mockedGetUser.mockResolvedValue({
      content: {
        dependentProfiles: [{ id: 1, firstName: 'John', lastName: 'Doe' }],
      },
    });

    fireEvent.press(getByText('profileList.reloadButton'));

    await waitFor(() => expect(getByText('John Doe')).toBeTruthy());
  });

  it('navigates to the dependent page when a profile card is pressed', async () => {
    mockedGetUser.mockResolvedValue({
      content: {
        dependentProfiles: [{ id: 1, firstName: 'John', lastName: 'Doe' }],
      },
    });

    const { getByText } = renderWithSWR(<ProfileList />);

    await waitFor(() => expect(getByText('John Doe')).toBeTruthy());

    fireEvent.press(getByText('John Doe'));

    expect(mockNavigate).toHaveBeenCalledWith('Dependent', {
      id: 1,
      name: 'John Doe',
    });
  });

  it('navigates to the add dependent page when the add card is pressed', async () => {
    mockedGetUser.mockResolvedValue({
      content: {
        dependentProfiles: [],
      },
    });

    const { getByText } = renderWithSWR(<ProfileList />);

    await waitFor(() =>
      expect(getByText('profileList.selectProfile')).toBeTruthy(),
    );

    fireEvent.press(getByText('FontAwesome5'));

    expect(mockNavigate).toHaveBeenCalledWith('AddDependent');
  });
});
