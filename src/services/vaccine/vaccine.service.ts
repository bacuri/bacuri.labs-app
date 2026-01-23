import httpClient from '../../lib/httpClient'

export async function getVaccineTimeline(profileId: string) {
  const response = await httpClient.get(
    `/vaccine/timeline?profileId=${profileId}`,
  )
  return response.data.content
}

export async function applyVaccine(profileId: string, qrData: any) {
  const response = await httpClient.post(
    `/vaccine/apply?profileId=${profileId}&${qrData}`,
    qrData,
  )
  return response.data
}
