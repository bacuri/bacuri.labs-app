import httpClient from '../../lib/httpClient';
import { getMyCampaigns } from './campaign.service';

import type { Campaign } from '../../@types/models';

jest.mock('../../lib/httpClient', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

const mockGet = httpClient.get as jest.Mock;

describe('campaign.service', () => {
  beforeEach(() => {
    mockGet.mockReset();
  });

  it('getMyCampaigns fetches the campaigns for a profile and unwraps content', async () => {
    const content = [{ id: 1, title: 'Campaign 1' }] as Campaign[];
    mockGet.mockResolvedValue({ data: { content } });

    const result = await getMyCampaigns(42);

    expect(mockGet).toHaveBeenCalledWith('/campaign/my-campaigns?profileId=42');
    expect(result).toEqual(content);
  });
});
