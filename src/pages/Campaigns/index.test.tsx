import { ActivityIndicator } from 'react-native';
import { act, fireEvent, waitFor } from '@testing-library/react-native';

import Campaigns from '.';
import { renderWithSWR } from '../../testUtils';

import { getMyCampaigns } from '../../services/campaign/campaign.service';

import type { Campaign } from '../../@types/models';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
  useRoute: () => ({ params: { id: 42 } }),
}));

jest.mock('../../services/campaign/campaign.service', () => ({
  getMyCampaigns: jest.fn(),
}));

const mockedGetMyCampaigns = getMyCampaigns as jest.Mock;

const campaign: Campaign = {
  id: 1,
  title: 'Flu Campaign',
  description: 'Get your flu shot',
  image: null,
  places: [
    {
      id: 1,
      name: 'Clinic A',
      applied: 2,
      amount: 6,
      latitude: 12,
      longitude: 12,
    },
  ],
};

describe('Campaigns', () => {
  beforeEach(() => {
    mockedGetMyCampaigns.mockReset();
    mockNavigate.mockReset();
  });

  it('shows a loading indicator while fetching', async () => {
    let resolveCampaigns: ((value: Campaign[]) => void) | undefined;
    mockedGetMyCampaigns.mockImplementation(
      () =>
        new Promise<Campaign[]>((resolve) => {
          resolveCampaigns = resolve;
        }),
    );

    const { UNSAFE_getByType } = renderWithSWR(<Campaigns />);

    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();

    await act(async () => {
      resolveCampaigns?.([]);
    });
  });

  it('renders the campaigns once loaded', async () => {
    mockedGetMyCampaigns.mockResolvedValue([campaign]);

    const { getByText } = renderWithSWR(<Campaigns />);

    await waitFor(() => expect(getByText('Flu Campaign')).toBeTruthy());
    expect(mockedGetMyCampaigns).toHaveBeenCalledWith(42);
  });

  it('navigates to the campaign detail on press', async () => {
    mockedGetMyCampaigns.mockResolvedValue([campaign]);

    const { getByText } = renderWithSWR(<Campaigns />);

    await waitFor(() => expect(getByText('Flu Campaign')).toBeTruthy());

    fireEvent.press(getByText('Flu Campaign'));

    expect(mockNavigate).toHaveBeenCalledWith('CampaignDetail', campaign);
  });
});
