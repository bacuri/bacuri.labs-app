import httpClient from '../lib/httpClient';

export async function getVaccineTimeline(profileId) {
  const response = await httpClient.get(
    `/vaccine/timeline?profileId=${profileId}`,
  );
  return response.data.content;
}

export async function applyVaccine(profileId, qrData) {
  const response = await httpClient.post(
    `/vaccine/apply?profileId=${profileId}&${qrData}`,
    qrData,
  );
  return response.data;
}
