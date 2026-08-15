import httpClient from '../../lib/httpClient';
import type { Campaign } from '../../@types/models';

export async function getMyCampaigns(
  profileId: string | number,
): Promise<Campaign[]> {
  const response = await httpClient.get<{ content: Campaign[] }>(
    `/campaign/my-campaigns?profileId=${profileId}`,
  );
  return response.data.content;
}
