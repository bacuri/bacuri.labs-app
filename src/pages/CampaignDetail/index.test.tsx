import { fireEvent, render } from '@testing-library/react-native';

import CampaignDetail from '.';

import type { Campaign } from '../../@types/models';

const mockNavigate = jest.fn();
const mockUseRoute = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
  useRoute: () => mockUseRoute(),
}));

const campaign: Campaign = {
  id: 1,
  title: 'Flu Campaign',
  description: 'Get your flu shot',
  image: null,
  places: [
    {
      id: 1,
      name: 'Clinic A',
      applied: 3,
      amount: 10,
      latitude: 12,
      longitude: 12,
    },
    {
      id: 2,
      name: 'Clinic B',
      applied: 2,
      amount: 5,
      latitude: 13,
      longitude: 13,
    },
  ],
};

describe('CampaignDetail', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    mockUseRoute.mockReset();
    mockUseRoute.mockReturnValue({ params: campaign });
  });

  it('renders the campaign title, description and remaining vaccines', () => {
    const { getByText } = render(<CampaignDetail />);

    expect(getByText('Flu Campaign')).toBeTruthy();
    expect(getByText('Get your flu shot')).toBeTruthy();
    expect(getByText('10')).toBeTruthy();
    expect(getByText('campaignDetail.remainingVaccines')).toBeTruthy();
  });

  it('navigates to the campaign map with the places', () => {
    const { getByText } = render(<CampaignDetail />);

    fireEvent.press(getByText('campaignDetail.viewAvailablePlaces'));

    expect(mockNavigate).toHaveBeenCalledWith('CampaignMap', {
      places: campaign.places,
    });
  });
});
