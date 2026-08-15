import { fireEvent, render } from '@testing-library/react-native';

import Dependent from '.';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate, setOptions: jest.fn() }),
  useRoute: () => ({ params: { id: 42, name: 'John Doe' } }),
}));

describe('Dependent', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it('renders the welcome header and the three action cards', () => {
    const { getByText } = render(<Dependent />);

    expect(getByText('dependent.welcomeTitle')).toBeTruthy();
    expect(getByText('dependent.applyVaccineTitle')).toBeTruthy();
    expect(getByText('dependent.myVaccinesTitle')).toBeTruthy();
    expect(getByText('dependent.campaignsTitle')).toBeTruthy();
  });

  it('navigates to ApplyVaccine with the profile id', () => {
    const { getByText } = render(<Dependent />);

    fireEvent.press(getByText('dependent.applyVaccineTitle'));

    expect(mockNavigate).toHaveBeenCalledWith('ApplyVaccine', { id: 42 });
  });

  it('navigates to MyVaccines with the profile id', () => {
    const { getByText } = render(<Dependent />);

    fireEvent.press(getByText('dependent.myVaccinesTitle'));

    expect(mockNavigate).toHaveBeenCalledWith('MyVaccines', { id: 42 });
  });

  it('navigates to Campaigns with the profile id', () => {
    const { getByText } = render(<Dependent />);

    fireEvent.press(getByText('dependent.campaignsTitle'));

    expect(mockNavigate).toHaveBeenCalledWith('Campaigns', { id: 42 });
  });
});
