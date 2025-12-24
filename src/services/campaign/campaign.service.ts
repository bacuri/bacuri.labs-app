import httpClient from '../lib/httpClient';

export async function getMyCampaigns(profileId) {
  const response = await httpClient.get(
    `/campaign/my-campaigns?profileId=${profileId}`,
  );
  return response.data.content;
}
