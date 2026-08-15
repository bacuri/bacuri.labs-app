import httpClient from '../../lib/httpClient'
import type { VaccineTimelineItem } from '../../@types/models'

export async function getVaccineTimeline(
  profileId: string | number,
): Promise<VaccineTimelineItem[]> {
  const response = await httpClient.get<{ content: VaccineTimelineItem[] }>(
    `/vaccine/timeline?profileId=${profileId}`,
  )
  return response.data.content
}

export async function applyVaccine(profileId: string | number, qrData: any): Promise<unknown> {
  const response = await httpClient.post(
    `/vaccine/apply?profileId=${profileId}&${qrData}`,
    qrData,
  )
  return response.data
}